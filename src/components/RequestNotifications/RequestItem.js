import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography, Button, Grid, makeStyles } from '@material-ui/core';
import { respond } from '../../actions';

// TODO : Check if the amount on the request is greater than the balance of the user
// If it is, disable the Send button
const useStyles = makeStyles((theme) => ({
	reqItem: {
		padding: theme.spacing(1),
		borderTop: 'solid 2px gray',
	},
	reqBody: {
		padding: theme.spacing(1),
	},
	reqButton: {
		marginLeft: theme.spacing(1),
	},
}));

const RequestItem = ({ balance, respond, req }) => {
	const classes = useStyles();
	const [sufficientFunds, setSufficientFunds] = useState(true);
	const [responded, setResponded] = useState(false);

	const { first_name, last_name, email, amount, req_id } = req;

	useEffect(() => {
		if (balance < amount) setSufficientFunds(false);
	});

	return (
		<Grid className={classes.reqItem} container direction='row'>
			<Typography variant='body1' className={classes.reqBody}>
				{first_name} {last_name}
			</Typography>
			<Typography variant='body1' className={classes.reqBody}>
				{email}
			</Typography>
			<Typography variant='body1' className={classes.reqBody}>
				${amount.toFixed(2)}
			</Typography>
			<Button
				className={classes.reqButton}
				variant='contained'
				color='secondary'
				disableElevation
				onClick={() => respond({ req_id: req_id, response: false })}>
				Deny
			</Button>
			<Button
				className={classes.reqButton}
				variant='contained'
				color='primary'
				disableElevation
				disabled={!sufficientFunds}
				onClick={() => respond({ req_id: req.req_id, response: true })}>
				Send
			</Button>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		balance: state.user.balance,
	};
};

export default connect(mapStateToProps, { respond })(RequestItem);
