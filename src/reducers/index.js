import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import activityReducer from './activityReducer';
import userReducer from './userReducer';
import { SIGN_OUT } from '../actions/types';

const appReducer = combineReducers({
	auth: authReducer,
	form: formReducer,
	activity: activityReducer,
	user: userReducer,
});

const rootReducer = (state, action) => {
	if (action.type === SIGN_OUT) state = undefined;
	return appReducer(state, action);
};

export default rootReducer;
