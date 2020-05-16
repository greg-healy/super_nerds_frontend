import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import flaskapi from '../../api/flaskapi';

const SendUserSearch = ({ access_token, nextStep, setRecip }) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const loading = open && options.length === 0;

	useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			const response = await flaskapi.get('/users', {
				headers: { Authorization: access_token },
			});
			console.log(response.data);
			const users = response.data.users;

			if (active) {
				setOptions(Object.keys(users).map((key) => users[key].item[0]));
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<div>
			<Typography variant='h1' gutterBottom>
				Send money
			</Typography>
			<Autocomplete
				id='userSearchBox'
				style={{ width: 300 }}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) => option.name === value.name}
				getOptionLabel={(option) => option.name}
				options={options}
				loading={loading}
				noOptionsText='No matches'
				onInputChange={(event, value, reason) => setRecip(value)}
				renderInput={(params) => (
					<TextField
						{...params}
						label='Email'
						variant='outlined'
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
			<Button variant='contained' color='primary' onClick={() => nextStep()}>
				Next
			</Button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		access_token: state.auth.access_token,
	};
};

export default connect(mapStateToProps, null)(SendUserSearch);
