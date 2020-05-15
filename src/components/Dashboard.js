import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Balance from './Balance';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'left',
	},
}));

const Dashboard = (props) => {
	const classes = useStyles();

	return (
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.paper}>Transactions</Paper>
				</Grid>
				<Grid item xs={12} sm={4} container>
					<Grid item xs container direction='column' spacing={2}>
						<Grid item xs>
							<Paper className={classes.paper}>Transfer to User</Paper>
						</Grid>
						<Grid item xs>
							<Paper className={classes.paper}>Transfer from Bank</Paper>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Paper className={classes.paper}>
						<Balance></Balance>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Dashboard;
