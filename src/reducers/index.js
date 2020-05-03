import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	transactions: transactionReducer,
});
