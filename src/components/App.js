import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import flaskapi from '../api/flaskapi';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import Homepage from './Homepage';

class App extends React.Component {
	state = { currentTime: 0 };

	componentDidMount() {
		flaskapi.get('/time').then((res) => {
			console.log(res);
			this.setState({ currentTime: res.data.time });
		});
	}

	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<NavBar />
					<Route path='/' exact component={Homepage} />
					<Route path='/register' component={SignUp} />
					<Route path='/login' component={SignIn} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;

// Code for testing API by getting time
//<p>The current time is {this.state.currentTime}.</p>
