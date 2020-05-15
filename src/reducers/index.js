import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import transactionReducer from './transactionReducer';
import userReducer from './userReducer';

export default combineReducers({
	auth: authReducer,
	form: formReducer,
	transactions: transactionReducer,
	user: userReducer,
});
