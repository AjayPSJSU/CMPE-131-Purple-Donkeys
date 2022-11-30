import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function MessageHistory(props) {
    let amount = props.amount;
    const [messages, setMessages] = useState([]);
    console.log(messages);

    async function getMessageHistory() {
        const x = await axios.post('http://localhost:5000/api/getMessageHistory', {}, {params: {amount: props.amount, uid: props.uid}});
        let temp = messages;
        for (var i = 0; i < 5; i++) {
            temp.push(x.data.messages[i]);
        }
        await setMessages(temp);
        console.log(messages);
    }

    return(
        
        <div>
            
            <li>
                {
                messages.map((message) => {
                    <ul>message</ul>
                })
                }
            </li>
            
        </div>
    );
}

export default MessageHistory;