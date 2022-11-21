import React, { useState, useEffect } from 'react';
import "./login.css"


//make something that can take input and make state variable to store it
const MessageBoard = ( props ) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    //props.uid
    

    /*
    useEffect(() => {
        async function fetchData() {
            var res = await fetch('http://localhost:5000/api/getMessages');
            res = await res.json();
            setMessages(res);
        }
        fetchData();
        //console.log(messages);
    }, []);
    */

    async function getMessageHistory() {
        
    }
    
    async function sendMessage() {
        
    }

    
    return (
        <h3>
            {console.log("render")}
            <p>yo </p>
            <ul>
                {
                messages.map((message) => <li key={message.key}>{message.message}</li>)
                }
            </ul>

            
            <input placeholder="type message" onChange={async (event)=> await setMessage(event.target.value)} required/>
            <div className="login-btn" onClick={sendMessage}>send</div>
            
                
        </h3>
    )
}

export default MessageBoard;