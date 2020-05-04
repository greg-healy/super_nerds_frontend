import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import asyncValidate from './asyncValidate';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const validate = (values) => {
	const errors = {};
	const requiredFields = ['first_name', 'last_name', 'email', 'password'];
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
}) => {
	return (
		<TextField
			variant='outlined'
			helperText={touched && error}
			//error={errorBool}
			{...input}
			{...custom}
			label={label}
		/>
	);
};

const SignUpForm = (props) => {
	const {
		handleSubmit,
		pristine,
		reset,
		submitting,
		classes,
		onSubmit,
	} = props;
	return (
		<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Field
						name='first_name'
						component={renderTextField}
						label='First Name'
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Field
						name='last_name'
						component={renderTextField}
						label='Last Name'
					/>
				</Grid>
				<Grid item xs={12}>
					<Field
						name='email'
						fullWidth
						component={renderTextField}
						label='Email'
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
				<Grid item xs={12} sm={6}>
					<Button
						type='submit'
						fullWidth
						disabled={pristine || submitting}
						variant='contained'
						color='primary'>
						Sign Up
					</Button>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						type='button'
						fullWidth
						variant='contained'
						disabled={pristine || submitting}
						onClick={reset}>
						Clear Values
					</Button>
				</Grid>
				<Grid container justify='flex-end'>
					<Grid item xs={12}>
						<Link to='/login' variant='body2'>
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</form>
	);
};

export default reduxForm({
	form: 'SignUpForm', // a unique identifier for this form
	validate,
	asyncValidate,
})(SignUpForm);
