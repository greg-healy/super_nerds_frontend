import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const TransactionItem = (props) => {
	const { first_name, last_name, email, amount } = props;

	return (
		<Grid
			container
			direction='row'
			justify='space-between'
			alignItems='center'
			spacing={2}>
			<Grid item xs={4}>
				<Typography variant='body1'>
					{first_name} {last_name}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body1'>{email}</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='body1'>${amount.toFixed(2)}</Typography>
			</Grid>
		</Grid>
	);
};
