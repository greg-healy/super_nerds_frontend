import React from 'react';
import Button from '@material-ui/core/Button';

const SendConfirm = ({ prevStep, nextStep }) => {
	return (
		<div>
			<h1>Confirm</h1>
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
