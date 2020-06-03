import { FETCH_ACTIVITY, FETCH_REQUESTS } from '../actions/types';

const INITIAL_STATE = {
	transactions: [],
	requests: {
		sent: [],
		received: [],
	},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_ACTIVITY:
			return { ...state, transactions: action.payload.activity };

		case FETCH_REQUESTS:
			return {
				...state,
				requests: {
					sent: action.payload.sent_requests,
					received: action.payload.recv_requests,
				},
			};

		default:
			return state;
	}
};
