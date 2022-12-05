const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const { ObjectID } = require('bson');
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
client.db("ChatBot").collection("UserMessageHistory").createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 });
/*
need user details
Database will have 2 collections
-Users will have documentID, that will be random
-Messages will have DocumentID that will be the users DocumentID in the Users Collection
-Messages will store the last say 100 messages given to and from the user




for the bot
certain keywords, such as "or", will dictate a response such as "hmm idk"
"favorite" - depending on what is after, like food or sport, dictate certain outcomes

otherwise, run it through the fuzzy search, set the search key as the type of message it is, and then return the value
hashmap<type of message, response>
*/

app.use(cors({
    origin: true,
    maxAge: 86400
}));


/*
this is the actual version that works with mongodb
*/
app.post('/api/getMessageHistory', urlencodedParser, async (req, res) => {
    let messageHistory = await client.db("ChatBot").collection("UserMessageHistory").findOne({ "_id": new ObjectID(req.query.uid) });
    console.log(req.query.amount);
    let messages = messageHistory.messages;
    let temp = [];
    for (var i = (5 * req.query.amount); i < (5 * req.query.amount) + 5; i++) {
        if (messages[i] == undefined) {
            break;
        }
        temp.push(messages[i]);
    }
    messages = temp;
    console.log(messages);
    res.json(messages);
});

app.post('/api/makeGuest', urlencodedParser, async (req, res) => {
    const newDoc = {
        createdAt: new Date(),
        messages: [],
        likes: [],
        dislikes: []
    }
    const newMessageHistory = await client.db("ChatBot").collection("UserMessageHistory").insertOne(newDoc);
    console.log(newMessageHistory.insertedId);
    res.json(newMessageHistory.insertedId);
});


//this is the version for css testing without mongodb
/*
app.post('/api/getMessageHistory', urlencodedParser, async(req, res) => {
    messages = [];
    for (var i = 0; i < 5; i++) {
        messages.push("You: sample human message Bot: sample bot response");
    }
    console.log(messages);
    res.json(messages);
});
*/
/*
app.post('/api/getPersonality', urlencodedParser, async (req, res) => {
    const personality = {
        likes: ["cheess", "chess", "cars"],
        dislikes: ["carrots", "capitalism"]
    }
    res.json(personality);
});
*/
app.post('/api/getPersonality', urlencodedParser, async (req, res) => {
    let x = await client.db("ChatBot").collection("UserMessageHistory").findOne({"_id": new ObjectID(req.query.uid)});
    console.log(req.query.uid)
    console.log(x);
    const personality = {
        likes: x.likes,
        dislikes: x.dislikes
    }
    console.log(personality);
    res.json(personality);
});


app.post('/api/getBotResponse', urlencodedParser, (req, res) => {
    const childPython = spawn('python3', ['ChatBot.py', req.query.message]);
    let response = "";
    childPython.stdout.on('data', (data) => {
        //console.log(`stdout: ${data}`);
        response = `${data}`;
        //console.log(response);
    });

    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    childPython.on('close', async (code) => {
        //console.log("response is: " + response);
        const interaction = {
            human: req.query.message,
            bot: response
        }
        //console.log(interaction);
        //console.log("uid:" + req.query.uid);
        if (req.query.uid) {

            let messageHistory = await client.db("ChatBot").collection("UserMessageHistory").updateOne(
                { "_id": new ObjectID(req.query.uid) },
                { $push: { messages: interaction } }
            );
        }
        let out = {
            response: response,
            like: false
        };
        if (response.includes("like")) {
            out = {
                response: response,
                like: true
            };

            let temp = response.split(" ");
            var i = 0;
            for (i = 0; i < temp.length; i++) {
                if (temp[i] == "like") {
                    break;
                }
            }
            let subject = "";
            for (i = i + 1; i < temp.length; i++) {
                subject += temp[i] + " ";
            }
            if (response.includes("don't")) {
                temp = client.db("ChatBot").collection("UserMessageHistory").updateOne(
                    { "_id": new ObjectID(req.query.uid) },
                    { $push: { dislikes: subject } }
                );
            }
            else {
                temp = client.db("ChatBot").collection("UserMessageHistory").updateOne(
                    { "_id": new ObjectID(req.query.uid) },
                    { $push: { likes: subject } }
                );
            }
        }
        //console.log(messageHistory.acknowledged);
        res.json(out);
        //console.log(`exit with code: ${code}`);
    });


    return;
});

app.get('/api/getMessageHistory', urlencodedParser, async (req, res) => {
    let messageHistory = await client.db("ChatBot").collection(UserMessageHistory).findOne({ "_id": req.uid });
    res.json(messageHistory);
});


app.post(`/api/handleLogin`, urlencodedParser, async (req, res) => {
    console.log(req.query);
    const user = await client.db("ChatBot").collection("users").findOne({ "email": req.query.email });
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

app.post(`/api/handleSignUp`, urlencodedParser, async (req, res) => {
    const password = hash(req.query.password);
    console.log("password: " + password);
    const newUser = {
        email: req.query.email,
        password: password
    }
    const newId = await client.db("ChatBot").collection("users").insertOne(newUser);
    console.log("success making user with userID: " + newId.insertedId);

    const newDoc = {
        _id: ObjectID(newId.insertedId),
        messages: [],
        like: [],
        dislikes: []
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
    for (x = 0; x < string.length; x++) {
        ch = string.charCodeAt(x);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
}
