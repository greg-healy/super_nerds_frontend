import { SIGN_IN, SIGN_OUT, FAILED_ATTEMPT } from '../actions/types';

const INITIAL_STATE = {
	failedAttempt: false,
	isSignedIn: null,
	auth_token: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
				auth_token: action.payload.auth_token,
			};

		case SIGN_OUT:
			return {
				...state,
				failedAttempt: false,
				isSignedIn: false,
				auth_token: '',
			};

		case FAILED_ATTEMPT:
			return {
				...state,
				failedAttempt: true,
			};

		default:
			return state;
	}
};
