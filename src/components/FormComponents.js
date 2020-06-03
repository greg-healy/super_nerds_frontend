import React from 'react';
import TextField from '@material-ui/core/TextField';

export const renderTextField = ({
	input,
	label,
	meta: { touched, error },
	...custom
}) => (
	<TextField
		variant='outlined'
		helperText={touched && error}
		{...input}
		{...custom}
		label={label}
	/>
);
