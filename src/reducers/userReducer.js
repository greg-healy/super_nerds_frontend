import { FETCH_BALANCE, SIGN_IN } from '../actions/types';

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

		default:
			return { ...state };
	}
};
