import flaskapi from '../api/flaskapi';
import history from '../history';
import {
	CREATE_USER,
	SIGN_IN,
	SIGN_OUT,
	FETCH_USER,
	FETCH_USERS,
	FETCH_TRANSACTIONS,
	CREATE_TRANSACTION,
	WITHDRAW,
	FAILED_ATTEMPT,
} from './types';

export const createUser = (formValues) => async (dispatch) => {
	console.log(formValues);
	const response = await flaskapi.post('/register', formValues);
	if (response === 'success') {
		dispatch({ type: CREATE_USER, payload: formValues });
		history.push('/');
	} else if (response === 'failure') {
		// Throw an error about something
		dispatch({ type: 'DUMMY', payload: formValues });
	} else {
		dispatch({ type: 'DUMMY', payload: formValues });
	}
};

export const signIn = (formValues) => async (dispatch) => {
	//async request to flaskapi
	const response = await flaskapi.post('/login', formValues);
	console.log(response);
	if (response.data == 'Invalid Username') {
		dispatch({ type: FAILED_ATTEMPT });
	} else {
		dispatch({ type: SIGN_IN, payload: response });
	}
};

export const signOut = () => {
	return { type: SIGN_OUT };
};
