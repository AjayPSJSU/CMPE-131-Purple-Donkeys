import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState} from 'react';
import "./login.css"
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

function SignUp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedUp, setSignedUp] = useState(false);

    async function signUp() {   
        console.log("signup");
        const x = await axios.post('http://localhost:5000/api/handleSignUp', {}, {params: {email, password}});
        console.log(x.data);
        await props.setUid(x.data.user);
        await setSignedUp(true);
    }

    

    return (
        <div className="background">
            <div className="cover">
                <h1>Register</h1>
                
                <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
                <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/>

                <div className="guest-btn" onClick={signUp}>Sign Up</div>
                <div className="guest-btn"><Link to="/login">Cancel</Link></div>

                {
                    signedUp ? (
                        <Navigate to="/messageboard"/>
                    ) : (
                        <p></p>
                    )
                }
            </div>
        </div>
    );
}




export default SignUp;
