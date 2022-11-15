import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState} from 'react';
import "./login.css"


// class Login extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			email: '',
// 			password: '',
// 		};
// 	}
// }

const Login = (props) => {
    const [popupStyle, showPopup] = useState("hide");
    const [guestStyle, showGuestPopup] = useState("hide"); /* for testing purposes, you would replace this with a redirct to the chatbot  */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    
    
    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
    }

    const guest = () => {
        showGuestPopup("guest-popup");
        setTimeout(() => showGuestPopup("hide"), 3000);
    }


    /*Code added 10/29/2022*/
    const changeEmail = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }
    
    /*Code added 10/29/2022*/
    const changePassword = (event) => {
        console.log(event.target.value);
        setPassword(event.target.value);
    }

    return (
        <div className="background">
        <div className="cover">
            <h1>Login</h1>


            <div className={popupStyle}>
            <h3>Login Failed: Username or password incorrect</h3>
            </div>

            <div className={guestStyle}>
            <h3>You are a Guest! Redirecting to main page...</h3>
            </div>

            <div htmlFor="Email">Email:</div>
            <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} reuired/>
            
            <div className="login-btn" onClick={popup}>Login</div>
            <div className="guest-btn" onClick={guest}>Continue As Guest </div>
            
            

            
    
        </div>
        </div>
        
        
    )
}


export default Login;
