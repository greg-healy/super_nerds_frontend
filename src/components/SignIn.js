import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import SignInForm from './SignInForm';
import { signIn } from '../actions';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignIn = ({ isSignedIn, failedAttempt, signIn }) => {
	const classes = useStyles();

	const onSubmit = (formValues) => {
		signIn(formValues);
	};

	const renderStatusMessage = (isSignedIn, failedAttempt) => {
		if (isSignedIn) {
			return 'SUCCESS!';
		} else if (failedAttempt) {
			return 'INVALID CREDENTIALS';
		}
		return '';
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				{renderStatusMessage(isSignedIn, failedAttempt)}
				<SignInForm classes={classes} onSubmit={onSubmit} />
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		failedAttempt: state.auth.failedAttempt,
	};
};

export default connect(mapStateToProps, { signIn })(SignIn);
