import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Activity from './Activity';
import Wallet from './Wallet';
import SendRequest from './SendRequest';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
		height: '100%',
	},
}));

const Summary = (props) => {
	const classes = useStyles();

	return (
		<Grid container alignItems='stretch' spacing={2}>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
					<SendRequest></SendRequest>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
					<Wallet></Wallet>
				</Paper>
			</Grid>
			<Grid item xs={12} sm={12}>
				<Paper className={classes.paper}>
					<Activity></Activity>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Summary;
