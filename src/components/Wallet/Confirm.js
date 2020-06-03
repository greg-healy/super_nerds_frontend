import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import flaskapi from '../../api/flaskapi';

const Confirm = (props) => {
	const { access_token, nextStep, prevStep, walletState } = props;
	const { amount, mode } = walletState;
	const { bank_name, bank_no } = walletState.bank;
	const [errorMsg, setErrorMsg] = useState('');

	const validate = async () => {
		try {
			const response = await flaskapi.post(
				`/bank/${mode}`,
				{
					amount: amount,
					bank_no: bank_no,
					bank_name: bank_name,
				},
				{
					headers: {
						Authorization: access_token,
					},
				}
			);
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
				<Typography variant='h4'>Confirm</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body1'>
					Are you sure you want to {mode === 'deposit' ? 'deposit' : 'withdraw'}{' '}
					${amount.toFixed(2)} {mode === 'deposit' ? 'to' : 'from'} {bank_name}{' '}
					({bank_no})?
				</Typography>
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

export default Confirm;
