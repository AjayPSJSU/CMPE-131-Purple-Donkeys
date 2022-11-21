import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import MessageBoard from './pages/MessageBoard';
import React, {useState} from 'react';

//figure out how to change loggedIn state using login component
function App() {
  //const [loggedIn, setLoggedIn] = useState(true);
  const [loginStatus, setLoginStatus] = useState("");  //false means not logged in true means logged in
  console.log("login status: " + loginStatus);
  let render = <Login setLoginStatus = {setLoginStatus}/>
  if (loginStatus) {
    render = <MessageBoard uid = {loginStatus}/>   //set parameters with uid, since another document will be made in the messages collection with the same id
  }
  
  return (
    <div className="App">
        {/*<MessageBoard loggedIn = {loggedIn}/>*/}
        {render}
    </div>
  );
}

export default App;
