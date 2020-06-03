import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { renderTextField } from '../FormComponents';
import Typography from '@material-ui/core/Typography';

// 1. User enters name of their bank (cannot be empty)
// 2. User enters the number of their bank (must be 9 digits)
// 3. User clicks submit to start request to /bank/add
// 4. If the response is good, add the bank to store->user->bank state
// 5. If the response is bad, print an error message

const validate = (values) => {
	const errors = {};
	const requiredFields = ['name', 'number'];
	requiredFields.forEach((field) => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});
	if (values.number && !/^[0-9]{9}$/.test(values.number)) {
		errors.number = 'Invalid bank number';
	}
	return errors;
};

const AddBank = (props) => {
	const {
		handleSubmit,
		pristine,
		submitting,
		classes,
		nextStep,
		addBank,
		fetchBanks,
	} = props;

	const onSubmit = (formValues) => {
		(async () => {
			const response = await addBank(formValues);
			if (response) {
				await fetchBanks();
				nextStep();
			}
		})();
	};

	return (
		<>
			<Typography variant='h4'>Add your bank</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Field
							name='name'
							fullWidth
							component={renderTextField}
							label='Bank Name'
							autoFocus
						/>
					</Grid>
					<Grid item xs={12}>
						<Field
							name='number'
							fullWidth
							component={renderTextField}
							label='Bank Number (9 digits)'
						/>
					</Grid>
					<Grid item xs={12}>
						<Button
							type='submit'
							fullWidth
							disabled={pristine || submitting}
							variant='contained'
							color='primary'>
							Submit
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	);
};

export default reduxForm({
	form: 'AddBankForm', // a unique identifier for this form
	validate,
})(AddBank);
