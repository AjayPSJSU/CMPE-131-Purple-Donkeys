const express = require('express');
const app = express();
const cors = require('cors');
 
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

app.post(`/api/handleLogin`, (req, res) => {
    //handle Login
   
    res.json("test");
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));