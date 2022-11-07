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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    
    
    const popup = () => {
        showPopup("login-popup");
        setTimeout(() => showPopup("hide"), 3000);
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
            <label htmlFor="Email">Email:</label>
            <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)} required/>
            
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder="Password" onChange={(event)=> setPassword(event.target.value)} reuired/>
            
            <div className="login-btn" onClick={popup}>Login</div>
            
            
            <div className={popupStyle}>
            <h3>Login Failed</h3>
            <p>Username or password incorrect</p>
            </div>
            
    
        </div>
        </div>
        
        
    )
}


export default Login;
