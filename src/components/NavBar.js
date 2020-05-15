import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavDrawer from './NavDrawer';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	navButton: {
		marginRight: theme.spacing(2),
		borderColor: '#fff',
		color: '#fff',
	},
}));

const ButtonAppBar = ({ isSignedIn }) => {
	const classes = useStyles();

	const renderRegister = () => {
		return (
			<Link to='/register'>
				<Button
					className={classes.navButton}
					variant='outlined'
					color='inherit'>
					Register
				</Button>
			</Link>
		);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<NavDrawer />
					<Typography variant='h6' className={classes.title}>
						<Link to='/'>
							<Button className={classes.navButton} size='large'>
								OUR APP NAME
							</Button>
						</Link>
					</Typography>
					<Link to={isSignedIn ? '/logout' : '/login'}>
						<Button
							className={classes.navButton}
							variant='outlined'
							color='inherit'>
							{isSignedIn ? 'Log Out' : 'Log In'}
						</Button>
					</Link>
					{isSignedIn ? '' : renderRegister()}
				</Toolbar>
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
