import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import MessageBoard from './pages/MessageBoard';
import React, {useState} from 'react';

//figure out how to change loggedIn state using login component
function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  /*
  let render = <Login/>
  if (loggedIn) {
    render = <MessageBoard loggedIn = {loggedIn}/>
  }
  */
  return (
    <div className="App">
        <MessageBoard loggedIn = {loggedIn}/>
    </div>
  );
}

export default App;
