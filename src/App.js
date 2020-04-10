import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
	const [currentTime, setCurrentTime] = useState(0);

	useEffect(() => {
		axios.get('http://cs361-project-backend.herokuapp.com/time')
			.then(res => {
				this.setState({currentTime: res.time})
			})
	  /*fetch('/time').then(res => res.json()).then(data => {
		setCurrentTime(data.time);*/
	  });
	}, []);

  	return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
		<p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;
