import React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import history from '../../history';
import { fetchBalance } from '../../actions';

const Success = (props) => {
	const { fetchBalance, resetState } = props;

	setTimeout(() => {
		fetchBalance();
		history.push('/summary');
		resetState();
	}, 5000);

	return (
		<div>
			<Typography variant='h3'>Success!</Typography>
			<Typography variant='body1'>
				You will now be returned to the summary page!
			</Typography>
		</div>
	);
};

export default connect(null, { fetchBalance })(Success);
