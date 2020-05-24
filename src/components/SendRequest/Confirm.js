import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const SendConfirm = ({ prevStep, nextStep, formValues }) => {
	const { recip, amount, mode } = formValues;

	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4'>Confirm</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant='body1'>
					Are you sure you want to {mode} ${amount.toFixed(2)} to {recip}?
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Grid container direction='row' spacing={3}>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => prevStep()}>
							Back
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => nextStep()}>
							Send
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SendConfirm;
