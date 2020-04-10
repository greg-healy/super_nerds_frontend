import React from 'react';
import flaskapi from '../api/flaskapi';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	state = { currentTime: 0 }

	componentDidMount() {
		flaskapi.get('/time').then(res => {
			console.log(res);
			this.setState({currentTime: res.data.time});
		})
	  }

  	render() {
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
			<p>The current time is {this.state.currentTime}.</p>
		</header>
		</div>
		);
	}
}

export default App;
