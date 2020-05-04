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

export const createUser = (formValues) => async (dispatch, getState) => {
	console.log(formValues);
	const response = await flaskapi.post('/register', formValues);
	if (response === 'success') {
		dispatch({ type: CREATE_USER, payload: formValues });
	} else if (response === 'failure') {
		// Throw an error about something
		dispatch({ type: 'DUMMY', payload: formValues });
	} else {
		dispatch({ type: 'DUMMY', payload: formValues });
	}
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
