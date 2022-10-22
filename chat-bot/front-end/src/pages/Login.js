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
    
    /*
    maybe you already know this, but just to make sure
    the general form for adding state to a component if the componenct is made as a function,
    which is what you did, is as follow

    const [var, changeVar] = useState(initial value u want it to start at)
    so var just the name of the thing, like you have popupStyle
    changeVar is actually a function that you call to change the value of the var

    you wrote a seperate function called popup to call showPopup and a timeout, which is great
    that is a level of detail that most people miss, such as myself, so its good that you did that
    the way I did it is I wrote the function in line. so I could've done the commented out code you see
    
    you can decide whether you want to write those functions inline or not, it doesn't matter. 
    anyways, give it a try with password, so add it to the component's state, and make sure it changes when the user enters something
    overall though good stuff
    */
    const [popupStyle, showPopup] = useState("hide")   
    const [email, setEmail] = useState("")
    
    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    /*
    const changeEmail = (event) => {
        setEmail(event.target.value)
    }
    */

    console.log(email)
    return (
        <div className="background">
        <div className="cover">
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(event)=>setEmail(event.target.value)}/>
            {/*<input type="text" placeholder="Email" onChange={changeEmail}/>*/}
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
