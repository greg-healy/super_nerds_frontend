import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const SendRequestSelect = (props) => {
	const { setModeSend, setModeRequest } = props;
	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={4}>
			<Grid item xs={12}>
				<Typography variant='h1'>What do you want to do?</Typography>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => setModeSend()}>
					Send Money
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Button
					fullWidth
					variant='contained'
					color='primary'
					onClick={() => setModeRequest()}>
					Request
				</Button>
			</Grid>
		</Grid>
	);
};

export default SendRequestSelect;
