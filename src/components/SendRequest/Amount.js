import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

const SendAmount = (props) => {
	const {
		prevStep,
		nextStep,
		setAmount,
		balance,
		amount,
		mode,
		classes,
	} = props;

	const isValid =
		(mode === 'send' && amount < balance && amount > 0) ||
		(mode === 'request' && amount > 0);

	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4'>How much do you want to {mode}?</Typography>
			</Grid>
			<Grid item xs={12}>
				<CurrencyTextField
					autoFocus
					className={classes.formControl}
					decimalPlaces={2}
					digitGroupSeparator=','
					error={!isValid}
					helperText={
						!isValid &&
						mode === 'send' &&
						'Amount must be less than your balance.'
					}
					label='Amount'
					variant='outlined'
					value={amount}
					currencySymbol='$'
					outputFormat='number'
					minimumValue='0'
					onChange={(event, value) => setAmount(value)}
				/>
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
							disabled={!isValid}
							onClick={() => nextStep()}>
							Next
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SendAmount;
