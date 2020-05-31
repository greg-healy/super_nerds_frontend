import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
	makeStyles,
	Link,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from '@material-ui/core';
import { fetchActivity } from '../../actions';

const useStyles = makeStyles((theme) => ({
	seeMore: {
		marginTop: theme.spacing(3),
	},
}));

const TransactionList = ({ fetchActivity, transactions, requests }) => {
	const [fetched, setFetched] = useState(false);
	if (!fetched) {
		fetchActivity();
		setFetched(true);
	}

	const classes = useStyles();
	return (
		<React.Fragment>
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				Transaction History
			</Typography>
			<Table size='small'>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell align='right'>Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{transactions.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								{item.first_name} {item.last_name}
							</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell align='right'>{item.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className={classes.seeMore}>
				<Link color='primary' href='#' onClick={(e) => e.preventDefault()}>
					See more transactions
				</Link>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		transactions: state.activity.transactions,
		requests: state.activity.requests,
	};
};

export default connect(mapStateToProps, { fetchActivity })(TransactionList);
