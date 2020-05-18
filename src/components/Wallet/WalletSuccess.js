import React from 'react';

import Typography from '@material-ui/core/Typography';

import history from '../../history';

const WalletSuccess = () => {
	setTimeout(() => {
		history.push('/summary');
	}, 5000);

	return (
		<div>
			<Typography variant='h1'>Success!</Typography>
			<Typography variant='body1'>
				You will now be returned to the summary page!
			</Typography>
		</div>
	);
};

export default WalletSuccess;
