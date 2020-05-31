import {
	FETCH_BALANCE,
	SIGN_IN,
	FETCH_BANKS,
	ADD_BANK,
	FETCH_REQUESTS,
} from '../actions/types';

const INITIAL_STATE = {
	first_name: '',
	last_name: '',
	email: '',
	balance: -1.0,
	banks: [],
	requests: {
		sent: [],
		received: [],
	},
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_BALANCE:
			return { ...state, balance: action.payload.balance };

		// TODO : This should be removed when we verify that the
		// backend is using JWT to decode access tokens
		case SIGN_IN:
			return { ...state, email: action.email };

		case FETCH_BANKS: {
			if (action.payload.banks) {
				return {
					...state,
					banks: action.payload.banks,
				};
			} else {
				return { ...state };
			}
		}

		case ADD_BANK:
			return {
				...state,
				banks: [
					...state.banks,
					{ name: action.payload.name, number: action.payload.number },
				],
			};

		case FETCH_REQUESTS:
			return {
				...state,
				requests: {
					sent: action.payload.sent_requests,
					received: action.payload.recv_requests,
				},
			};

		default:
			return { ...state };
	}
};
