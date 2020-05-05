import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
<<<<<<< HEAD
=======
import Container from '@material-ui/core/Container';
>>>>>>> development
import SignUp from './SignUp';
import SignIn from './SignIn';
import NavBar from './NavBar';
import Footer from './Footer';
import Homepage from './Homepage';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

<<<<<<< HEAD
class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<NavBar />
=======
export default function App() {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: 'flex',
			flexDirection: 'column',
			minHeight: '100vh',
		},
		main: {
			//marginTop: theme.spacing(8),
			//marginBottom: theme.spacing(2),
			//display: 'flex',
			//flexDirection: 'column',
			minHeight: '85vh',
		},
	}));
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<BrowserRouter>
				<NavBar />
				<Container component='main' className={classes.main}>
>>>>>>> development
					<Route path='/' exact component={Homepage} />
					<Route path='/register' component={SignUp} />
					<Route path='/login' component={SignIn} />
				</Container>
				<Footer />
			</BrowserRouter>
		</div>
	);
}
