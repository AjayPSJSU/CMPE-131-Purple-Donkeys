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
            <div >
                <Form horizontal className="LoginForm" id="loginForm">
                    <FormGroup>
                        <FormControl type="email" placeholder="Email Address" onChange = {(event) => this.setState ({email: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <FormControl type="password" placeholder="Password" onChange = {(event) => this.setState ({password: event.target.value})}/>
                    </FormGroup>
                    <FormGroup>
                        <Button >
                            Login
                        </Button>
                        
                    </FormGroup>
                    
                </Form>
            </div>
        );
    }
}

export default Login;