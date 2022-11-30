import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState} from 'react';
import "./login.css"
import axios from 'axios';

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signUp() {   
        console.log("signup");
        const x = await axios.post('http://localhost:5000/api/handleSignUp', {}, {params: {email, password}});
        console.log(x.data);
        props.setLoginStatus(x.data.user);
    }

    return (
        <div className="background">
            <div className="cover">
                <h1>Register</h1>
                
                <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
                <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/>

                <div className="guest-btn" onClick={signUp}>Sign Up</div>
                <div className="guest-btn" onClick={props.setLoginStatus("login")}>Cancel</div>
            </div>
        </div>
    );
}




export default SignUp;
