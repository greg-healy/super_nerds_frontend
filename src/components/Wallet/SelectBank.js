import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const SelectBank = (props) => {
	const { prevStep, nextStep, setBank, walletState, banks, classes } = props;
	const { bank } = walletState;

	const renderBankItems = () => {
		return banks.map((bank, index) => {
			return (
				<MenuItem value={index} key={bank.bank_no}>
					{bank.bank_name} ({bank.bank_no})
				</MenuItem>
			);
		});
	};

	const handleChange = (event) => {
		setBank(banks[event.target.value]);
	};

	let currBankIndex = banks.indexOf(bank);
	if (currBankIndex < 0) currBankIndex = 0;

	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4'>Select your bank</Typography>
			</Grid>
			<Grid item xs={12}>
				<FormControl className={classes.formControl}>
					<InputLabel id='select-bank-label'>Bank</InputLabel>
					<Select
						labelId='select-bank-label'
						id='select-bank'
						value={currBankIndex}
						onChange={handleChange}>
						{renderBankItems()}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<Grid container direction='row' spacing={3}>
					<Grid item xs={6}>
						<Button
							disabled
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
							onClick={() => {
								setBank(banks[currBankIndex]);
								nextStep();
							}}>
							Next
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default SelectBank;
