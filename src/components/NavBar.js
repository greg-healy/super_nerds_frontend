import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		justifyContent: 'flex-start',
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		justifyContent: 'flex-start',
	},
	authButton: {
		marginRight: theme.spacing(2),
		borderColor: '#fff',
		color: '#fff',
	},
	navButton: {
		marginLeft: theme.spacing(2),
		color: '#fff',
	},
}));

const ButtonAppBar = ({ isSignedIn }) => {
	const classes = useStyles();

	const renderRegister = () => {
		return (
			<Link to='/register'>
				<Button
					className={classes.authButton}
					variant='outlined'
					color='inherit'>
					Register
				</Button>
			</Link>
		);
	};

	const navButtons = [
		{ path: '/summary', displayText: 'Summary' },
		{ path: '/activity', displayText: 'Activity' },
		{ path: '/send', displayText: 'Send' },
		{ path: '/wallet', displayText: 'Wallet' },
	];

	const renderNavButton = (path, displayText) => {
		return (
			<Link to={path}>
				<Button className={classes.navButton}>{displayText}</Button>
			</Link>
		);
	};

	const renderNavButtons = (navButtons) => {
		return navButtons.map((navButton) =>
			renderNavButton(navButton.path, navButton.displayText)
		);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Container>
					<Toolbar>
						<Typography variant='h6' className={classes.title}>
							<Link to='/'>
								<Button className={classes.navButton} size='large'>
									OUR APP LOGO
								</Button>
							</Link>
						</Typography>
						{isSignedIn ? renderNavButtons(navButtons) : ''}
						<Link to={isSignedIn ? '/logout' : '/login'}>
							<Button
								className={classes.authButton}
								variant='outlined'
								color='inherit'>
								{isSignedIn ? 'Log Out' : 'Log In'}
							</Button>
						</Link>
						{isSignedIn ? '' : renderRegister()}
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, null)(ButtonAppBar);
