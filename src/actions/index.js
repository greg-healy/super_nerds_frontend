import flaskapi from '../api/flaskapi';
import history from '../history';
import {
	CREATE_USER,
	SIGN_IN,
	SIGN_OUT,
	FAILED_ATTEMPT,
	FETCH_BALANCE,
	FETCH_BANKS,
	ADD_BANK,
	FETCH_TRANSACTIONS,
} from './types';

/**************************************************
 * Action Creators for User Authentication/Creation
 * createUser
 * signIn
 * signOut
 *************************************************/

export const createUser = (formValues) => async (dispatch) => {
	try {
		const response = await flaskapi.post('/register', formValues);
		console.log(response);
		if (response.status === 201) {
			dispatch({ type: CREATE_USER, payload: response.data });
			history.push('/login');
		} else if (response.status === 409) {
			// Throw an error about something
			dispatch({ type: FAILED_ATTEMPT, payload: response.data });
		}
	} catch {
		console.log('Could not reach the server to create a user.');
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
		history.push('/summary');
	} else {
		dispatch({ type: FAILED_ATTEMPT, payload: response.data });
	}
};

export const signOut = () => {
	history.push('/');
	return { type: SIGN_OUT };
};

export const fetchBalance = () => async (dispatch, getState) => {
	try {
		const response = await flaskapi.get('/user/balance', {
			headers: {
				Authorization: getState().auth.access_token,
			},
		});
		if (response.status === 200) {
			dispatch({ type: FETCH_BALANCE, payload: response.data });
		}
	} catch {
		// TODO : Delete the dispatch below; purely for testing
		//console.log('Could not reach the server to fetch the balance.');
		dispatch({ type: FETCH_BALANCE, payload: { balance: 1000 } });
	}
};

/****************************************
 * Action Creators for Banking/Wallet
 * fetchBanks
 * addBank
 ****************************************/

export const fetchBanks = () => async (dispatch, getState) => {
	try {
		const response = await flaskapi.get('/bank', {
			headers: {
				Authorization: getState().auth.access_token,
			},
		});
		if (response.status === 200) {
			dispatch({ type: FETCH_BANKS, payload: response.data });
			return response.data;
		} else {
			console.log('Did not receive a good response from /bank.');
		}
	} catch {
		//console.log('Could not communicate with the server.');
		dispatch({ type: FETCH_BANKS, payload: { bank_name: '', bank_no: '' } });
	}
};

export const addBank = (formValues) => async (dispatch, getState) => {
	// Request the bank be added to the server's database
	try {
		const response = await flaskapi({
			method: 'post',
			url: '/bank/add',
			headers: {
				Authorization: getState().auth.access_token,
			},
			data: {
				bank_name: formValues.name,
				bank_no: formValues.number,
			},
		});
		// Add the bank to our store->user->bank
		if (response.status === 200) {
			dispatch({
				type: ADD_BANK,
				payload: {
					name: formValues.name,
					number: formValues.number,
				},
			});
			return 1;
		} else {
			console.log(
				'The server received our request to add a bank, but could not process it.'
			);
		}
	} catch {
		console.log('Could not connect to the server to add the bank.');
		// REMOVE : PURELY FOR TESTING.
		dispatch({
			type: ADD_BANK,
			payload: {
				name: formValues.name,
				number: formValues.number,
			},
		});
		return 1;
	}
};

const fetchTransactions = () => async (dispatch, getState) => {
	try {
		const response = flaskapi.get('/activity', {
			headers: {
				Authorization: getState().auth.access_token,
			},
		});
		if (response.status === 200) {
			dispatch({
				type: FETCH_TRANSACTIONS,
				payload: response.data.transactions,
			});
		} else {
			console.log('Failed to retrieve transactions.');
		}
	} catch {
		// TODO : Delete when done testing!!!
		console.log(
			'Server not online to retrieve transactions. Producing dummy data.'
		);
		dispatch({
			type: FETCH_TRANSACTIONS,
			payload: [
				{
					first_name: 'first1',
					last_name: 'last1',
					email: 'email1@email.com',
					amount: '10.00',
				},
				{
					first_name: 'first2',
					last_name: 'last2',
					email: 'email2@email.com',
					amount: '20.00',
				},
				{
					first_name: 'first3',
					last_name: 'last3',
					email: 'email3@email.com',
					amount: '30.00',
				},
			],
		});
	}
};
