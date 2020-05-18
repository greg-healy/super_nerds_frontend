import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Balance from './Balance';
import Wallet from './Wallet';
import SendForm from './SendForm';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
	},
}));

const Summary = (props) => {
	const classes = useStyles();

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
					<SendForm></SendForm>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
					<Wallet></Wallet>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={12}>
				<Paper className={classes.paper}>
					<Balance></Balance>
					<br />
					Transactions
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Summary;
