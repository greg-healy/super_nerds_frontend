import React from 'react';
import Button from '@material-ui/core/Button';

const SendConfirm = ({ prevStep, nextStep, formValues }) => {
	const { recip, amount } = formValues;

	return (
		<div>
			<h1>Confirm</h1>
			<p>
				Are you sure you want to send ${amount} to ${recip}?
			</p>
			<Button variant='contained' color='primary' onClick={() => prevStep()}>
				Back
			</Button>
			<Button variant='contained' color='primary' onClick={() => nextStep()}>
				Send
			</Button>
		</div>
	);
};

export default SendConfirm;
