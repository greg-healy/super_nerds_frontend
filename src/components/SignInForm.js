import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import asyncValidate from './asyncValidate';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const validate = (values) => {
	const errors = {};
	const requiredFields = ['email', 'password'];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});
	if (
		values.email &&
		!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	) {
		errors.email = 'Invalid email address';
	}
	return errors;
};

const renderTextField = ({
	input,
	label,
	meta: { touched, error },
	...custom
}) => (
	<TextField
		variant='outlined'
		helperText={touched && error}
		//error={touched && error}
		{...input}
		{...custom}
		label={label}
	/>
);

const SignInForm = (props) => {
	const { handleSubmit, pristine, submitting, classes, onSubmit } = props;
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Field
						name='email'
						fullWidth
						component={renderTextField}
						label='Email'
						autoFocus
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						name='password'
						type='password'
						fullWidth
						component={renderTextField}
						label='Password'
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						type='submit'
						fullWidth
						disabled={pristine || submitting}
						variant='contained'
						color='primary'>
						Sign In
					</Button>
				</Grid>
				<Grid container justify='flex-end'>
					<Grid item xs={12}>
						<Link to='/register' variant='body2'>
							Don't have an account? Sign up!
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default reduxForm({
	form: 'SignInForm', // a unique identifier for this form
	validate,
	asyncValidate,
})(SignInForm);
