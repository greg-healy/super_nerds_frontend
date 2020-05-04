import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<NavBar />
					<Route path='/' exact component={Homepage} />
					<Route path='/register' component={SignUp} />
					<Route path='/login' component={SignIn} />
					<Footer />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;

// Code for testing API by getting time
//<p>The current time is {this.state.currentTime}.</p>
