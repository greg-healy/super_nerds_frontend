import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const SendAmount = ({ prevStep, nextStep, setAmount, formValues }) => {
	let value;
	const { recip } = formValues;

	return (
		<div>
			<Typography variant='h1' gutterBottom>
				To {recip}
			</Typography>
			<CurrencyTextField
				autoFocus
				decimalPlaces='2'
				label='Amount'
				variant='outlined'
				value={value}
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

export default SendAmount;
