import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	Avatar,
	CircularProgress,
	Container,
	CssBaseline,
	Typography,
	makeStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import SignUpForm from './SignUpForm';
import { createUser } from '../actions';
import history from '../history';

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
		marginTop: theme.spacing(3),
	},
}));

const SignUp = ({ createUser }) => {
	const classes = useStyles();
	const [submitted, setSubmitted] = useState(false);
	const [success, setSuccess] = useState(false);
	const onSubmit = (formValues) => {
		setSubmitted(true);
		setTimeout(() => {
			(async () => {
				const response = await createUser(formValues);
				if (response) setSuccess(true);
				else setSubmitted(false);
			})();
		}, 3000);
	};

	const renderSignUpForm = () => {
		return <SignUpForm onSubmit={onSubmit} classes={classes} />;
	};
	const renderLoading = () => <CircularProgress />;
	const renderSuccess = () => {
		setTimeout(() => history.push('/login'), 3000);
		return (
			<div>
				<Typography variant='h3'>Success!</Typography>
				<Typography variant='body1'>
					You will now be sent to the login page!
				</Typography>
			</div>
		);
	};
	const renderComponent = () => {
		if (submitted && success) return renderSuccess();
		else if (submitted && !success) return renderLoading();
		else return renderSignUpForm();
	};

	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign up
				</Typography>
				{renderComponent()}
			</div>
		</Container>
	);
};

export default connect(null, { createUser })(SignUp);
