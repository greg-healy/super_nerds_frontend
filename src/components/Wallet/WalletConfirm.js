import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import flaskapi from '../../api/flaskapi';

const WalletConfirm = (props) => {
	const { access_token, nextStep, prevStep, walletState } = props;
	const { amount, mode } = walletState;
	const { name, number } = walletState.bank;
	const [errorMsg, setErrorMsg] = useState('');

	const validate = async () => {
		try {
			const response = await flaskapi.post(`/${mode}`, {
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
		} catch {
			console.log(
				'Server is not up, but going to next anyways. Remove when testing is done.'
			);
			nextStep();
		}
	};

	return (
		<Grid container>
			<Grid item xs={12}>
				<h1>Confirm</h1>
			</Grid>
			<Grid item xs={12}>
				<p>
					Are you sure you want to {mode === 'deposit' ? 'deposit' : 'withdraw'}{' '}
					${amount} {mode === 'deposit' ? 'to' : 'from'} {name} ({number})?
				</p>
			</Grid>
			<Grid item xs={12}>
				<Grid container spacing={4}>
					<Grid item xs={6}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => prevStep()}>
							Back
						</Button>
					</Grid>
					<Grid item xs={6}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => validate()}>
							Confirm
						</Button>
					</Grid>
				</Grid>
			</Grid>
			<br />
			<Typography variant='body1'>{errorMsg}</Typography>
		</Grid>
	);
};

export default WalletConfirm;
