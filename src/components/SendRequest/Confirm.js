import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { send, request } from '../../actions';

const SendConfirm = ({ send, request, prevStep, nextStep, formValues }) => {
	const { recip, amount, mode } = formValues;
	const onSubmit = () => {
		let result = 0;
		(async () => {
			if (mode === 'send') result = await send(formValues);
			else result = await request(formValues);
			if (result) nextStep();
		})();
	};

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
							onClick={() => onSubmit()}>
							{mode}
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default connect(null, { send, request })(SendConfirm);
