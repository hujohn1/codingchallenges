import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import './App.css';

function App() {
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const navigate=useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log('Form submitted');
    alert(`The name you entered is ${name}`);
    navigate('/NotFound');
  }

  const handleNameChange=(event)=>{
    setName(event.target.value);
  }
  const handleEmailChange=(event)=>{
    setEmail(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input type="text" value={name} onChange={handleNameChange}/><br/>
          <input type="email" value={email} onChange={handleEmailChange}/><br/>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
