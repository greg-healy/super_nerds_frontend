import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

const SignOut = ({ signOut }) => {
	signOut();
	return <div>Signing out...</div>;
};

export default connect(null, { signOut })(SignOut);
