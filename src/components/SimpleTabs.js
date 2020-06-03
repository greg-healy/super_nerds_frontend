import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
}));

export default function SimpleTabs(props) {
	const { tab1Handler, tab2Handler, tab1Label, tab2Label } = props;
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		if (newValue === 0) tab1Handler();
		else if (newValue === 1) tab2Handler();
	};

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Tabs
					value={value}
					variant='fullWidth'
					onChange={handleChange}
					aria-label='simple tabs example'>
					<Tab label={tab1Label} {...a11yProps(0)} />
					<Tab label={tab2Label} {...a11yProps(1)} />
				</Tabs>
			</AppBar>
		</div>
	);
}
