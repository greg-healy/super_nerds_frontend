import { FETCH_TRANSACTIONS, CREATE_TRANSACTION } from '../actions/types';

const INITIAL_STATE = {
	transactions: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_TRANSACTIONS:
			return { ...state, transactions: action.payload.transactions };

		default:
			return state;
	}
};
