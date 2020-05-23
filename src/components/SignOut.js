import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

const SignOut = ({ signOut }) => {
	setTimeout(() => {
		signOut();
	}, 1);

	return <div>Signing out...</div>;
};

export default connect(null, { signOut })(SignOut);
