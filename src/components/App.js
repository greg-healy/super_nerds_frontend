import React from 'react';
import { Router, Route } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import history from '../history';
import SignUp from './SignUp';
import SignIn from './SignIn';
import SignOut from './SignOut';
import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import Summary from './Summary';
import SendRequest from './SendRequest';
import Wallet from './Wallet';

export default function App() {
	const useStyles = makeStyles((theme) => ({
		main: {
			flexGrow: '1',
			width: '100vw',
		},
		gridrow: {
			width: '100vw',
		},
	}));
	const classes = useStyles();

	// <Container component='main' className={classes.main}></Container>
	//className={classes.root}
	return (
		<>
			<CssBaseline />
			<Router history={history}>
				<Grid
					container
					direction='column'
					spacing={0}
					alignItems='center'
					justify='center'
					style={{ minHeight: '100vh' }}>
					<Grid item xs={12} className={classes.gridrow}>
						<NavBar />
					</Grid>
					<Grid item xs={10} sm={8} className={classes.main}>
						<br />
						<br />
						<Route path='/' exact component={Homepage} />
						<Route path='/register' component={SignUp} />
						<Route path='/login' component={SignIn} />
						<Route path='/logout' component={SignOut} />
						<Route path='/summary' component={Summary} />
						<Route path='/send-request' component={SendRequest} />
						<Route path='/wallet' component={Wallet} />
						<br />
						<br />
					</Grid>
					<Grid item xs={12} className={classes.gridrow}>
						<Footer />
					</Grid>
				</Grid>
			</Router>
		</>
	);
}
