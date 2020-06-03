import { connect } from 'react-redux';
import React, { useState } from 'react';
import Balance from './Balance';
import TransactionList from './TransactionList';
import { fetchActivity } from '../../actions';

const Activity = ({ fetchActivity, transactions }) => {
	const [fetched, setFetched] = useState(false);
	if (!fetched) {
		fetchActivity();
		setFetched(true);
	}

	return (
		<>
			<Balance />
			<TransactionList transactions={transactions} />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		transactions: state.activity.transactions,
		requests: state.activity.requests,
	};
};

export default connect(mapStateToProps, { fetchActivity })(Activity);
