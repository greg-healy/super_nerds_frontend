import { FETCH_ACTIVITY } from '../actions/types';

const INITIAL_STATE = {
	transactions: [],
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ACTIVITY:
			return { ...state, transactions: action.payload.transactions };

		default:
			return state;
	}
};
