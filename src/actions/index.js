import flaskapi from '../api/flaskapi';
import {
	CREATE_USER,
	SIGN_IN,
	SIGN_OUT,
	FETCH_USER,
	FETCH_USERS,
	FETCH_TRANSACTIONS,
	CREATE_TRANSACTION,
	WITHDRAW,
} from './types';

export const createUser = (first_name, last_name, email, password) => {
	return {
		type: CREATE_USER,
		payload: { first_name, last_name, email, password },
	};
};

export const signIn = (email, password) => {
	//async request to flaskapi
	return {
		type: SIGN_IN,
		payload: { email, password, auth_token: 'token from api' },
	};
};

export const signOut = () => {
	return { type: SIGN_OUT };
};
