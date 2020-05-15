import {
	CREATE_USER,
	SIGN_IN,
	SIGN_OUT,
	FAILED_ATTEMPT,
} from '../actions/types';

const INITIAL_STATE = {
	failedAttempt: false,
	errorMessage: '',
	isSignedIn: false,
	access_token: '',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_USER:
			return {
				...state,
				failedAttempt: false,
				errorMessage: '',
			};

		case SIGN_IN:
			return {
				...state,
				isSignedIn: true,
				failedAttempt: false,
				errorMessage: '',
				access_token: action.payload.access_token,
			};

		case SIGN_OUT:
			return {
				...state,
				failedAttempt: false,
				isSignedIn: false,
				access_token: '',
				errorMessage: '',
			};

		case FAILED_ATTEMPT:
			return {
				...state,
				failedAttempt: true,
				errorMessage: action.payload.msg,
			};

		default:
			return state;
	}
};
