import React from 'react';
import Button from '@material-ui/core/Button';

const SendAmount = ({ prevStep, nextStep }) => {
	return (
		<div>
			<h1>Send an Amount</h1>
			<Button variant='contained' color='primary' onClick={() => prevStep()}>
				Back
			</Button>
			<Button variant='contained' color='primary' onClick={() => nextStep()}>
				Next
			</Button>
		</div>
	);
};

export default SendAmount;
