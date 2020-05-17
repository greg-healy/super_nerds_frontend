import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const WalletAmount = ({ prevStep, nextStep, setAmount, formValues }) => {
	let value;
	const { name, number } = formValues.bank;
	const { amount } = formValues;

	// TODO : Deposit function that checks if amount user wants to deposit is
	// more than they currently have in their balance

	return (
		<div>
			<Typography variant='h2' gutterBottom>
				{name}
			</Typography>
			<Typography variant='h3' gutterBottom>
				{number}
			</Typography>
			<CurrencyTextField
				autoFocus
				decimalPlaces={2}
				label='Amount'
				variant='outlined'
				value={amount}
				currencySymbol='$'
				outputFormat='number'
				onChange={(event, value) => setAmount(value)}
			/>
			<br />
			<Button variant='contained' color='primary' onClick={() => prevStep()}>
				Back
			</Button>
			<Button variant='contained' color='primary' onClick={() => nextStep()}>
				Next
			</Button>
		</div>
	);
};

export default WalletAmount;
