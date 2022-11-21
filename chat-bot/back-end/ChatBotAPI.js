const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ObjectID} = require('bson');
const { MongoClient } = require('mongodb');

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const app = express();


client.connect();
console.log("connection made to mongo");
/*
need user details
Database will have 2 collections
-Users will have documentID, that will be random
-Messages will have DocumentID that will be the users DocumentID in the Users Collection
-Messages will store the last say 100 messages given to and from the user

*/

app.use(cors({
    origin: true, 
    maxAge: 86400
}));

app.get('/api/getMessages', (req, res) => {
    const message = [
        {   
            key: 1,
            message: 'I like oragnes'    
        },
        {
            key: 2,
            message: 'I hate bananas'    
        },
        {
            key: 3,
            message: 'I am a bear'    
        }
    ];
    res.json(message);
});

app.get('/api/getMessageHistory', urlencodedParser,(req, res) => {
    let messageHistory = await client.db("ChatBot").collection(UserMessageHistory).findOne({"_id": req.uid});
    res.json(message);
});

app.post(`/api/handleLogin`, urlencodedParser, async (req, res) => {
    console.log(req.query);
    const user = await client.db("ChatBot").collection("users").findOne({"email": req.query.email});
    console.log("user: " + user);

    if (!user) {
        res.json("");
        return;
    }
    if (hash(req.query.password) != user.password) {
        res.json("");
        return;
    }
    
    res.json(user._id);
});

app.post(`/api/handleSignUp`, async (req, res) => {
    //await client.connect();   //move later to global state
    const password = hash("kumhard");  //req.body.password
    console.log("password: " + password);
    const newUser = {
        email: "sirella@gmail.com",    //req.body.username
        password: password
    }
    const newId = await client.db("ChatBot").collection("users").insertOne(newUser);
    console.log("success making user with userID: " + newId.insertedId);

    var arr = [];
    const newDoc = {
        _id: ObjectID(newId.insertedId),
        messages: arr
    }
    const newMessageHistory = await client.db("ChatBot").collection("UserMessageHistory").insertOne(newDoc);
    const package = {
        user: newId.insertedId,
        messageHistory: newMessageHistory.insertedId
    }
    console.log("success making messageHistory: " + newMessageHistory.insertedId);
    res.json(package);
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

// hash function 
function hash(string) {
var hash = 0;
if (string.length == 0) return hash;
for (x = 0; x <string.length; x++) {
ch = string.charCodeAt(x);
        hash = ((hash <<5) - hash) + ch;
        hash = hash & hash;
    }
return hash;
}
