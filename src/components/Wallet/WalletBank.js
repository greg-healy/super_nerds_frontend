import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const WalletBank = ({ nextStep, setBank, formValues }) => {
	return (
		<div>
			<Typography variant='h1'>Select a bank:</Typography>
			<Typography variant='h2'>{formValues.bank.name}</Typography>
			<Typography variant='h3'>{formValues.bank.number}</Typography>
			<Button variant='contained' color='primary' onClick={() => nextStep()}>
				Next
			</Button>
		</div>
	);
};

export default WalletBank;
