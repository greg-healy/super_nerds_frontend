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
	const response = await flaskapi.post('/register', formValues);
	console.log(response);
	if (response.status === 201) {
		dispatch({ type: CREATE_USER, payload: response.data });
		history.push('/login');
	} else if (response.status === 409) {
		// Throw an error about something
		dispatch({ type: FAILED_ATTEMPT, payload: response.data });
	} else {
		// TODO : Handle other errors
		dispatch({ type: 'DUMMY', payload: formValues });
	}
};

export const signIn = (formValues) => async (dispatch) => {
	//async request to flaskapi
	const response = await flaskapi.post('/login', formValues);
	console.log(response);
	if (response.status === 200) {
		dispatch({ type: SIGN_IN, payload: response.data });
		history.push('/dashboard');
	} else {
		dispatch({ type: FAILED_ATTEMPT, payload: response.data });
	}
};

export const signOut = () => {
	history.push('/');
	return { type: SIGN_OUT };
};
