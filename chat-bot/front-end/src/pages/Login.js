import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import React, { Component } from 'react';



class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
		};
	}

    render() {
        console.log(this.state);
        return (	
//          <div >
//          <Form horizontal className="LoginForm" id="loginForm">
//          <FormGroup>
//          <FormControl type="email" placeholder="Email Address" onChange = {(event) => this.setState ({email: event.target.value})}/>
//          </FormGroup>
//          <FormGroup>
//          <FormControl type="password" placeholder="Password" onChange = {(event) => this.setState ({password: event.target.value})}/>
//          </FormGroup>
//          <FormGroup>
//          <Button >
//          Login
//          </Button>
//          
//          </FormGroup>
//          
//          </Form>
//          </div>
            
            
            <div>
            <meta charSet="UTF-8" />
            <title>Purple Donkey</title>
            <link rel="stylesheet" href="style.css" />
            <div className="background">
            <div className="form-box">
            <div className="button-box">
            <div id="btn">
            </div>
            <button type="button" className="toggle-btn" onclick="login()">Log In</button>
            <button type="button" className="toggle-btn" onclick="register()">Register</button>
            </div>
            
            <form id="login" className="input-group">
            <input type="text" className="input-field" placeholder="User Id" required />
            <input type="text" className="input-field" placeholder="Enter Password" required />
            <input type="checkbox" className="check-box" /><span>Remember Password</span>
            <button type="submit" className="submit-btn">Log In</button>
            </form>
    
            <form id="register" className="input-group">
            <input type="text" className="input-field" placeholder="User Id" required />
            <input type="email" className="input-field" placeholder="Email Id" required />
            <input type="text" className="input-field" placeholder="Enter Password" required />
            <input type="checkbox" className="check-box" /><span>I agree to the terms and conditions</span>
            <button type="submit" className="submit-btn">Register</button>
            </form>
            </div>
            </div>
            </div>
            
//          <script>
//          var x = document.getElementById("login");
//          var y = document.getElementById("register");
//          var z = document.getElementById("btn");
//          
//          function register() {
//              x.style.left = "-400px"
//              y.style.left = "50px"
//              z.style.left = "100px"
//          }
//          
//          function login() {
//              x.style.left = "50px"
//              y.style.left = "450px"
//              z.style.left = "0px"
//          }
//          </script>


        );
    }
}

export default Login;
