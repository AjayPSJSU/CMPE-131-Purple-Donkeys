import React, { useEffect } from 'react';
import "./login.css"
import "./MessageBoard.css";
import image from "./img/bot_image.jpg";
import { useState, useRef } from 'react';
import axios from 'axios';
import MessageHistory from '../modules/MessageHistory';



// new MessageBoard
function MessageBoard(props) {
    const [humanMessage, setHumanMessage] = useState("");
    const [humanMessageDisplay, setHumanMessageDisplay] = useState("");
    const [botMessage, setBotMessage] = useState("");
    const [messageHistoryAmount, setMessageHistoryAmount] = useState(0);
    const [messageHistory, setMessageHistory] = useState([]);
    const [dummy, setDummy] = useState(0);
    
    
   // const input = useRef();

    const date = new Date();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const [time, setTime] = useState(`${hours}:${seconds}`); //using the useState hook to get the data from the local time and set it to the time variable
    const [dateTime, setDateTime] = useState(
        `${days[day]}, ${months[month]} ${year}`
    ); //using the useState hook to get the data from the local date and set it to the dateTime variable

    const checkStatus = (e) => {
        let isActive = true;
        if (dateTime == "Thursday, Nov 17 2022") {
            //if the dateTime is Thursday, 13 Aug 2022, the bot will be inactive
            isActive = false;
        }

        const status = document.querySelector(".status");
        // selecting the status class
        if (isActive === true) {
            //if the bot is active
            status.innerHTML = "Active";
            status.style.color = "green";
        } else {
            status.innerHTML = "Not Active";
            status.style.color = "red";
        }
    };

    async function getBotResponse() {
        setBotMessage("...");
        setHumanMessageDisplay(humanMessage);
        const x = await axios.post('http://localhost:5000/api/getBotResponse', {}, {params: {message: humanMessage, uid: props.uid}});
        setBotMessage(x.data);
    }

    async function getMessageHistory() {
        const x = await axios.post('http://localhost:5000/api/getMessageHistory', {}, {params: {amount: messageHistoryAmount, uid: props.uid}});
        let temp = messageHistory;
        for (var i = 0; i < x.data.length; i++) {
            temp.push(x.data[i]);
        }
        await setMessageHistory(temp);
    }

    async function loseMessages() {
        let temp = messageHistory;
        temp.pop();
        while (temp.length%5!=0) {
            temp.pop();
        }
        await setMessageHistory(temp);
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter') {
            await getBotResponse();
            console.log("pressed");
        }
    }

    async function less() {
        let temp = messageHistoryAmount-1;
        await setMessageHistoryAmount(temp); 
        await loseMessages();
        temp = dummy+1;
        setDummy(temp);
    }

    async function more() {
        let temp = messageHistoryAmount+1
        await setMessageHistoryAmount(temp); 
        await getMessageHistory();
        temp = dummy-1;
        setDummy(temp);
    }
    /*
    function formatMessageHistory(message) {
        var out = "You: " + message.human + "\n" + "Bot: " + message.bot + "\n\n";
        return out;
    }
    */

   

    return (
        <div className="messageBoard" onLoad={checkStatus}>
            <div className="wrapper">
                <div className="content">
                    <div className="header">
                        <div className="img">
                            <img src={image} alt="" />
                        </div>
                        <div className="right">
                            <div className="name">Purple Donkey</div>
                            <div className="status">Active</div>
                        </div>
                    </div>
                    <div className="main">
                        <div className="main_content">
                            <div className="messages">
                                <div className = "bot-message">
                                    <p>{botMessage}</p>
                                </div>
                                <div className="human-message">
                                    <p>{humanMessageDisplay}</p>                               
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="btm">
                            
                            <div className="input">
                            <input type="text" placeholder="Enter Message" onChange={async (event)=>setHumanMessage(event.target.value)} onKeyDown={ async (event) => await handleKeyDown(event)} required/>
                            </div>
                            
                            <div className="btn">
                                <button onClick={async () => await getBotResponse()}>
                                    Send
                                </button>
                            </div>
                            <div className="btn2">
                                <button onClick={getBotResponse}>
                                    Log Out</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p>Message History</p>
                            <ol>
                                {messageHistory.map((message, index) => (<li key={index}>{"You: " + message.human + "    Bot: " + message.bot}</li>))}
                            </ol>
                            <button onClick={async () => await less()}> less </button>
                            <button onClick={async () => await more()}> more </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageBoard;



 // Chatbot and user conversation response
    /*
    const handleInput = () => {
        const botMessage = document.querySelector("#message1");
        const userMessage = document.querySelector("#message2");
        const inputRef = input.current;
        const getHumanMessage = humanMessage.current;
        const getBotMessage = botmessage.current;

        let badwords = ["fuck|bad|stupid|useless|bitch|crazy|nonsense"];
        let words = new RegExp(badwords);
        if (words.test(document.querySelector("#input").value)) {
            // if the input contains bad words
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "Please do not use bad words"; // display the message
                inputRef.value = ""; // clear the input
            }, 2000);
        }


        let heySiri = [
            "hey siri|Hey Siri",
        ];
        let words13 = new RegExp(heySiri);
        if (words13.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "You are talking to the wrong person! 😂";
                inputRef.value = ""; // clear the input
                console.log(getBotMessage.innerText);
            }, 2000);
        }

        let welcome = [
            "Hi|hi|hello|Hello|hey|sup|yo|wassup|whats up|howdy|greetings|good morning|good afternoon|good evening",
        ];

        let words2 = new RegExp(welcome);
        if (words2.test(document.querySelector("#input").value)) {
            const status = document.querySelector(".status");
            // if the input contains welcome words
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                // print the meassage
                getBotMessage.innerText = "Hello! How are you doing today?";
                status.innerText = "Active";
                status.style.color = "green";
                inputRef.value = ""; // clear the input
                console.log(getBotMessage.innerText);
            }, 2000);
        }

        let e = [
            "what are you|who are you",
        ];

        let ex2 = new RegExp(e);
        if (ex2.test(document.querySelector("#input").value)) {
            const status = document.querySelector(".status");
            // if the input contains welcome words
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                // print the meassage
                getBotMessage.innerText = "i am a";
                status.innerText = "Active";
                status.style.color = "green";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let bye = ["bye|Bye|goodbye|see you later|goodnight|See you later|Goodnight|Goodbye"];
        let words3 = new RegExp(bye);
        if (words3.test(document.querySelector("#input").value)) {
            const status = document.querySelector(".status");
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "Bye, have a nice day";
                inputRef.value = ""; // clear the input
            }, 2000);
            setTimeout(() => {
                status.innerText = "Not active";
                status.style.color = "red";
            }, 5000);
        }

        let thanks = [
            "Thanks|thanks|thank you|thank you very much|Thank you very much",
        ];
        let words4 = new RegExp(thanks);
        if (words4.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "You are welcome";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let how = [
            "How are you|how are you doing|how are you doing today|How are you doing today|How are you doing|How are you",
        ];
        let words5 = new RegExp(how);
        if (words5.test(document.querySelector("#input").value)) {
            const status = document.querySelector(".status");
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "I am good!";
                status.innerText = "Active";
                status.style.color = "green";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let good = [
            "That's good|Sound nice|that sounds awesome|that sounds great|Great|great|sounds great|that's sounds good|Nice|nice",
        ];
        let words6 = new RegExp(good);
        if (words6.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "😁";
                inputRef.value = ""; // clear the input
                console.log("good");
            }, 1000);
        }

        let response = [
            "I'm fine|I am fine|I am fine today|I am fine today|i'm fine|i'm great|I'm fine|I'm great|I'm good|i'm good|great|Great",
        ];
        let words7 = new RegExp(response);
        if (words7.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "That is good";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let nameAsk = [
            "What's your name|what's your name|What is your name|what is your name",
        ];
        let words8 = new RegExp(nameAsk);
        if (words8.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "My name is Purple Donkey";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let nameAsk2 = [
            "How should I call you?|How should I call you|how should I call you?|how should I call you",
        ];
        let words12 = new RegExp(nameAsk2);
        if (words12.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "Purple Donkey";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let owner = [
            "Who is the owner|who is the owner|Who is the owner of this bot|who is the owner of this bot|Who made you|who made you|Who is your maker|Who made you|who is your maker|who is your owner|Who is your owner",
        ];
        let words9 = new RegExp(owner);
        if (words9.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "The owner of this bot is Purple Donkey";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let owner2 = [
            "Who are the crews of the Purple Donkey",
        ];
        let words10 = new RegExp(owner2);
        if (words10.test(document.querySelector("#input").value)) {
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText =
                    "Hei, Kevin and Ajay";
                inputRef.value = ""; // clear the input
            }, 2000);
        }

        let ageAsk = [
            "What's your age|what's your age|What is your age|what is your age|How old are you|how old are you",
        ]; //adding the age-question
        let words11 = new RegExp(ageAsk);
        if (words11.test(document.querySelector("#input").value)) {
            // if the input contains some question
            getBotMessage.innerText = "Typing...";
            setTimeout(() => {
                getBotMessage.innerText = "I am 1 year old";
                inputRef.value = ""; // clear the input
            }, 2000);
        }
        getHumanMessage.innerText = inputRef.value; // display the message
    };
    */