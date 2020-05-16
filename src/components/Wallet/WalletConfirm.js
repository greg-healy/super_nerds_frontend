import React from 'react';
import Button from '@material-ui/core/Button';

const WalletConfirm = ({ prevStep, nextStep, formValues }) => {
	const { amount } = formValues;
	const { name, number } = formValues.bank;

	return (
		<div>
			<h1>Confirm</h1>
			<p>
				Are you sure you want to deposit/withdraw ${amount} to/from ${name} ($
				{number})?
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

export default WalletConfirm;
