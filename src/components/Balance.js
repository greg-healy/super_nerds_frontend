import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { fetchBalance } from '../actions';

const Balance = ({ email, balance, fetchBalance }) => {
	useEffect(() => {
		fetchBalance(email);
	});

	return (
		<Grid container direction='column'>
			<Grid item>
				<Typography variant='h2' gutterBottom>
					Balance
				</Typography>
				<Typography variant='body1'>${balance.toFixed(2)}</Typography>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		balance: state.user.balance,
		email: state.user.email,
	};
};

export default connect(mapStateToProps, { fetchBalance })(Balance);
