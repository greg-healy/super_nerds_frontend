import flaskapi from '../api/flaskapi';
import history from '../history';
import {
	CREATE_USER,
	FAILED_ATTEMPT,
	SIGN_IN,
	SIGN_OUT,
	FETCH_BALANCE,
	ADD_BANK,
	FETCH_BANKS,
	FETCH_ACTIVITY,
	FETCH_REQUESTS,
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
		if (response.status === 201) {
			dispatch({ type: CREATE_USER, payload: response.data });
			return 1;
		} else if (response.status === 409) {
			// Throw an error about something
			dispatch({ type: FAILED_ATTEMPT, payload: response.data });
			return 0;
		}
	} catch {
		console.log('Could not reach the server to create a user.');
		return 0;
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
			if (response.data.balance === null) response.data.balance = 0;
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
		} else if (response.status === 204) {
			console.log('No banks created for this users yet.');
		} else {
			console.log('Some other error occurred in fetchBanks action.');
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
		if (response.status === 201) {
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
			return 0;
		}
	} catch {
		console.log('Could not connect to the server to add the bank.');
		return 0;
	}
};

export const fetchActivity = () => async (dispatch, getState) => {
	try {
		const response = await flaskapi.get('/activity', {
			headers: {
				Authorization: getState().auth.access_token,
			},
		});
		if (response.status === 200) {
			dispatch({
				type: FETCH_ACTIVITY,
				payload: response.data,
			});
		} else {
			console.log('Failed to retrieve transactions.');
			dispatch({
				type: FETCH_ACTIVITY,
				payload: {
					activity: [
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
				},
			});
		}
	} catch {
		// TODO : Delete when done testing!!!
		console.log(
			'Server not online to retrieve transactions. Producing dummy data.'
		);
		dispatch({
			type: FETCH_ACTIVITY,
			payload: {
				activity: [
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
			},
		});
	}
};

/**************************************
 * Action Creators for Sending/Requeting
 * send
 * request
 * respond
 * getRequests
 *************************************/

export const send = (formValues) => async (dispatch, getState) => {
	try {
		const response = await flaskapi({
			method: 'post',
			url: '/send',
			headers: {
				Authorization: getState().auth.access_token,
			},
			data: {
				email: formValues.recip,
				amount: formValues.amount,
			},
		});

		if (response.status === 200) return 1;
		else return 0;
	} catch {
		console.log('Failed to send money');
		return 0;
	}
};

export const fetchRequests = () => async (dispatch, getState) => {
	try {
		const response = await flaskapi.get('/request/all', {
			headers: {
				Authorization: getState().auth.access_token,
			},
		});
		if (response.status === 200) {
			dispatch({
				type: FETCH_REQUESTS,
				payload: {
					sent_requests: response.data.sent_requests,
					recv_requests: response.data.recv_requests,
				},
			});
			return 1;
		} else {
			console.log('Failed to retrieve requests.');
			dispatch({
				type: FETCH_REQUESTS,
				payload: {
					recv_requests: [
						{
							first_name: 'first3',
							last_name: 'last3',
							email: 'email3@email.com',
							amount: '10.00',
						},
						{
							first_name: 'first4',
							last_name: 'last4',
							email: 'email4@email.com',
							amount: '20.00',
						},
						{
							first_name: 'first5',
							last_name: 'last5',
							email: 'email5@email.com',
							amount: '30.00',
						},
					],
					sent_requests: [
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
				},
			});
			return 0;
		}
	} catch {
		console.log('Error retrieving requests');
		dispatch({
			type: FETCH_REQUESTS,
			payload: {
				recv_requests: [
					{
						first_name: 'first3',
						last_name: 'last3',
						email: 'email3@email.com',
						amount: '10.00',
					},
					{
						first_name: 'first4',
						last_name: 'last4',
						email: 'email4@email.com',
						amount: '20.00',
					},
					{
						first_name: 'first5',
						last_name: 'last5',
						email: 'email5@email.com',
						amount: '30.00',
					},
				],
				sent_requests: [
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
			},
		});
		return 0;
	}
};

export const request = (formValues) => async (dispatch, getState) => {
	try {
		const response = await flaskapi({
			method: 'post',
			url: '/request/new',
			headers: {
				Authorization: getState().auth.access_token,
			},
			data: {
				email: formValues.recip,
				amount: formValues.amount,
			},
		});

		return response.status === 200 ? 1 : 0;
	} catch {
		return 0;
	}
};

export const respond = (formValues) => async (dispatch, getState) => {
	try {
		const response = await flaskapi({
			method: 'post',
			url: '/respond',
			headers: {
				Authorization: getState().auth.access_token,
			},
			data: {
				req_id: formValues.req_id,
				response: formValues.response,
			},
		});
		return response.status === 200 ? 1 : 0;
	} catch {
		console.log('Error responding to request');
		return 0;
	}
};
