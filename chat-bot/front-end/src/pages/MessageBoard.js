import React, { useState, useEffect } from 'react';
import "./login.css"


//make something that can take input and make state variable to store it
const MessageBoard = ( props ) => {
    const [messages, setMessages] = useState([]);
    const login = props.loggedIn;
    


    useEffect(() => {
        async function fetchData() {
            var res = await fetch('http://localhost:5000/api/getMessages');
            res = await res.json();
            setMessages(res);
        }
        fetchData();
        //console.log(messages);
    }, [login]);


    
    return (
        <h3>
            {console.log("render")}
            <p>yo </p>
            <ul>
                {
                messages.map((message) => <li key={message.key}>{message.message}</li>)
                }
            </ul>
            
                
        </h3>
    )
}

export default MessageBoard;