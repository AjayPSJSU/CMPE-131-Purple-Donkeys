import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
// import React, { Component } from 'react';
import React, {useState} from 'react';
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
        <div>
            <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
            <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} required/>

            <div className="guest-btn" onClick={signUp}>Sign Up</div>
        </div>
    );
}




export default SignUp;