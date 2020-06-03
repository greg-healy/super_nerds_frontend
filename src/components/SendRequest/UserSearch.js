import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import flaskapi from '../../api/flaskapi';

const SendUserSearch = (props) => {
	const { access_token, prevStep, nextStep, recip, setRecip } = props;
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [users, setUsers] = useState([]);
	const loading = open && options.length === 0;
	let isValid = false;

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await flaskapi.get('/users', {
				headers: { Authorization: access_token },
			});

			setUsers(response.data);
			if (active) setOptions(response.data);
		})();

		return () => {
			active = false;
		};
	}, [loading, access_token]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	if (users) {
		isValid = users.filter((user) => user.email === recip);
	}

	return (
		<Grid
			container
			direction='column'
			alignItems='stretch'
			justify='center'
			spacing={3}>
			<Grid item xs={12}>
				<Typography variant='h4' gutterBottom>
					Find a friend
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Autocomplete
					id='userSearchBox'
					style={{ width: '100%' }}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={() => setOpen(false)}
					getOptionSelected={(option, value) => option.name === value.name}
					getOptionLabel={(option) =>
						`${option.email} (${option.first_name} ${option.last_name})`
					}
					options={options}
					loading={loading}
					noOptionsText='No matches'
					onInputChange={(event, value, reason) =>
						setRecip(value.split(' ')[0])
					}
					renderInput={(params) => (
						<TextField
							{...params}
							label='Email'
							variant='standard'
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<React.Fragment>
										{loading ? (
											<CircularProgress color='inherit' size={20} />
										) : null}
										{params.InputProps.endAdornment}
									</React.Fragment>
								),
							}}
						/>
					)}
				/>
			</Grid>
			<Grid item xs={12}>
				<Grid container direction='row' spacing={3}>
					<Grid item xs={12} sm={6}>
						<Button
							disabled
							fullWidth
							variant='contained'
							color='primary'
							onClick={() => prevStep()}>
							Back
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							fullWidth
							variant='contained'
							color='primary'
							disabled={!isValid}
							onClick={() => nextStep()}>
							Next
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state) => {
	return {
		access_token: state.auth.access_token,
	};
};

export default connect(mapStateToProps, null)(SendUserSearch);
