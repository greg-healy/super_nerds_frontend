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
	FETCH_BALANCE,
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
	const response = await flaskapi.post('/login', formValues);
	// TODO : We are currently also sending email to reducers so that
	// it can be stored in user Store. Ideally we should sent JWT with
	// future requests and remove email from Store
	if (response.status === 200) {
		dispatch({
			type: SIGN_IN,
			payload: response.data,
			email: formValues.email,
		});
		history.push('/dashboard');
	} else {
		dispatch({ type: FAILED_ATTEMPT, payload: response.data });
	}
};

export const signOut = () => {
	history.push('/');
	return { type: SIGN_OUT };
};

export const fetchBalance = (email) => async (dispatch, getState) => {
	console.log(getState().auth);
	const response = await flaskapi.get('/user/balance', {
		headers: {
			Authorization: getState().auth.access_token,
		},
	});
	if (response.status === 200) {
		dispatch({ type: FETCH_BALANCE, payload: response.data });
	}
	// TODO : Handle error fetching balance?
};
