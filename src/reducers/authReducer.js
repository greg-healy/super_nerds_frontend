import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
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
			return { ...state, isSignedIn: false, auth_token: '' };

		default:
			return state;
	}
};
