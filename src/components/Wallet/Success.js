import React from 'react';

import Typography from '@material-ui/core/Typography';

import history from '../../history';

const Success = (props) => {
	const { setStep, fetchBalance } = props;

	setTimeout(() => {
		(async () => {
			await fetchBalance();
			history.push('/summary');
			setStep(0);
		})();
	}, 3000);

	return (
		<div>
			<Typography variant='h3'>Success!</Typography>
			<Typography variant='body1'>
				You will now be returned to the summary page!
			</Typography>
		</div>
	);
};

export default Success;
