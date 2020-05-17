import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import flaskapi from '../../api/flaskapi';

const WalletConfirm = (props) => {
	const { type, access_token, nextStep, prevStep, formValues } = props;
	const { amount } = formValues;
	const { name, number } = formValues.bank;
	const [errorMsg, setErrorMsg] = useState('');

	// TODO : Function that sends the request to the server. If it succeeds,
	// go to nextStep. If it fails, print error message
	// Need access_token and type to be passed into this component
	const validate = async () => {
		const response = await flaskapi.post(`/${type}`, {
			headers: {
				Authorization: access_token,
			},
			data: {
				amount: amount,
				bank_no: number,
				bank_name: name,
			},
		});
		console.log(response);
		if (response.status === 200) {
			nextStep();
		} else {
			setErrorMsg('Uh oh. Something went wrong.');
		}
	};

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
			<Button variant='contained' color='primary' onClick={() => validate()}>
				Send
			</Button>
			<br />
			<Typography variant='body1'>{errorMsg}</Typography>
		</div>
	);
};

export default WalletConfirm;
