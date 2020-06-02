import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	Typography,
	Button,
	Grid,
	CircularProgress,
	makeStyles,
} from '@material-ui/core';
import {
	respond,
	fetchRequests,
	fetchBalance,
	fetchActivity,
} from '../../actions';

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

const RequestItem = ({
	balance,
	respond,
	req,
	fetchRequests,
	fetchBalance,
	fetchActivity,
}) => {
	const classes = useStyles();
	const [sufficientFunds, setSufficientFunds] = useState(true);
	const [responded, setResponded] = useState(false);

	const { first_name, last_name, email, amount, req_id } = req;

	useEffect(() => {
		if (balance < amount) setSufficientFunds(false);
	}, [balance, amount]);

	const onSubmit = (payload) => {
		setResponded(true);
		setTimeout(() => {
			(async () => {
				let result = await respond(payload);
				if (result) {
					fetchRequests();
					fetchBalance();
					fetchActivity();
				} else setResponded(false);
			})();
		}, 3000);
	};

	const renderReqItem = () => {
		return (
			<>
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
					onClick={() => onSubmit({ req_id: req_id, response: false })}>
					Deny
				</Button>
				<Button
					className={classes.reqButton}
					variant='contained'
					color='primary'
					disableElevation
					disabled={!sufficientFunds}
					onClick={() => onSubmit({ req_id: req.req_id, response: true })}>
					Send
				</Button>
			</>
		);
	};

	const renderLoading = () => <CircularProgress />;

	return (
		<Grid
			className={classes.reqItem}
			justify='center'
			container
			direction='row'>
			{responded ? renderLoading() : renderReqItem()}
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		balance: state.user.balance,
	};
};

export default connect(mapStateToProps, {
	respond,
	fetchRequests,
	fetchBalance,
	fetchActivity,
})(RequestItem);
