import React from 'react';
import { Router, Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import history from '../history';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import Dashboard from './Dashboard';

export default function App() {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		},
		main: {
			minHeight: '85vh',
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Router history={history}>
				<NavBar />
				<Container component='main' className={classes.main}>
					<Route path='/' exact component={Homepage} />
					<Route path='/register' component={SignUp} />
					<Route path='/login' component={SignIn} />
					<Route path='/logout' component={SignOut} />
					<Route path='/dashboard' component={Dashboard} />
				</Container>
				<Footer />
			</Router>
		</div>
	);
}
