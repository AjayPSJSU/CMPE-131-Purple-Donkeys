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

const Login = () => {
    
    const [popupStyle, showPopup] = useState("hide")
    
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }
    
    return (
        <div className="background">
        <div className="cover">
            <h1>Login</h1>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            
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
