import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	makeStyles,
	AppBar,
	Container,
	Toolbar,
	Typography,
	Button,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import RequestNotifications from './RequestNotifications';

const useStyles = makeStyles((theme) => ({
	root: {},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'inline-block',
	},
	nav: {
		flexGrow: 1,
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
		{ path: '/send-request', displayText: 'Send & Request' },
		{ path: '/wallet', displayText: 'Wallet' },
	];

	const renderNavButton = (path, displayText) => {
		return (
			<Link to={path} key={displayText}>
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
						<div className={classes.nav}>
							<Typography variant='h6' className={classes.title}>
								<Link to={isSignedIn ? '/summary' : '/'}>
									<Button className={classes.navButton} size='large'>
										OUR APP LOGO
									</Button>
								</Link>
							</Typography>
							{isSignedIn ? renderNavButtons(navButtons) : ''}
						</div>
						<div>
							<RequestNotifications />
							<a
								href='https://github.com/gregoryphealy/super_nerds_frontend'
								style={{ color: 'white' }}>
								<Button color='inherit'>
									<GitHubIcon />
								</Button>
							</a>
							<Link to={isSignedIn ? '/logout' : '/login'}>
								<Button
									className={classes.authButton}
									variant='outlined'
									color='inherit'>
									{isSignedIn ? 'Log Out' : 'Log In'}
								</Button>
							</Link>
							{isSignedIn ? '' : renderRegister()}
						</div>
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
