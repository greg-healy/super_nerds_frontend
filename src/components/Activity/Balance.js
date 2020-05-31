import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { fetchBalance } from '../../actions';

const Balance = ({ email, balance, fetchBalance }) => {
	useEffect(() => {
		fetchBalance(email);
	});

	return (
		<Grid container direction='row' justify='flex-end' alignItems='center'>
			<Grid item>
				<Typography variant='h4'>Balance</Typography>
			</Grid>
			<Grid item>
				<Typography variant='h6'>${balance.toFixed(2)}</Typography>
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
