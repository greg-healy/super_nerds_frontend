import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
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
}));

const ButtonAppBar = ({ isSignedIn }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<NavDrawer />
					<Typography variant='h6' className={classes.title}>
						<Link to='/'>OUR APP NAME</Link>
					</Typography>
					<Link to={isSignedIn ? '/logout' : '/login'}>
						<Button color='inherit'>{isSignedIn ? 'Log Out' : 'Log In'}</Button>
					</Link>
					<Link to='/register'>
						<Button color='inherit'>Register</Button>
					</Link>
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
