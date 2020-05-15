import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MUILink from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<MUILink color='inherit' href='https://material-ui.com/'>
				Super Nerds
			</MUILink>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
	},
}));

export default function Footer() {
	const classes = useStyles();
	return (
		<footer className={classes.footer}>
			<Copyright />
		</footer>
	);
}
