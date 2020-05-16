import { FETCH_BALANCE, SIGN_IN, FETCH_BANK } from '../actions/types';

const INITIAL_STATE = {
	first_name: '',
	last_name: '',
	email: '',
	balance: -1.0,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_BALANCE:
			return { ...state, balance: action.payload.balance };

		// TODO : This should be removed when we verify that the
		// backend is using JWT to decode access tokens
		case SIGN_IN:
			return { ...state, email: action.email };

		case FETCH_BANK:
			return {
				...state,
				bank_no: action.payload.bank_no,
				bank_name: action.payload.bank_name,
			};

		default:
			return { ...state };
	}
};
