import React from 'react';
import { connect } from 'react-redux';
import {
	makeStyles,
	Popover,
	Typography,
	Button,
	Grid,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { fetchRequests } from '../../actions';
import RequestItem from './RequestItem';

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(1),
	},
}));

const RequestNotifications = ({ fetchRequests, requests, isSignedIn }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		fetchRequests();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const renderRequestItems = () => {
		if (requests.received.length === 0) return 'No pending requests';
		return requests.received.map((req) => (
			<Grid item key={req.req_id}>
				<RequestItem req={req} />
			</Grid>
		));
	};

	const renderNotificationsButton = () => {
		return (
			<>
				<Button color='inherit' aria-describedby={id} onClick={handleClick}>
					<NotificationsIcon />
				</Button>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}>
					<Typography className={classes.typography} variant='h5'>
						Notifications
					</Typography>
					<Grid container direction='column' justify='space-between'>
						{renderRequestItems()}
					</Grid>
				</Popover>
			</>
		);
	};

	return <>{isSignedIn ? renderNotificationsButton() : ''}</>;
};

const mapStateToProps = (state) => {
	return {
		requests: state.activity.requests,
		isSignedIn: state.auth.isSignedIn,
	};
};

export default connect(mapStateToProps, { fetchRequests })(
	RequestNotifications
);
