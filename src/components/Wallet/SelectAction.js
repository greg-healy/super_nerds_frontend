import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const SelectAction = (props) => {
	const { setModeDeposit, setModeWithdraw, prevStep } = props;
	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={4}>
			<Grid item xs={12}>
				<Typography variant='h4'>Your wallet</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => setModeWithdraw()}>
					Withdraw
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => setModeDeposit()}>
					Deposit
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Button
					disabled
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => prevStep()}>
					Add a Bank
				</Button>
			</Grid>
		</Grid>
	);
};

export default SelectAction;
