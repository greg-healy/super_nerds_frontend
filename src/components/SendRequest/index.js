import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import SendUserSearch from './UserSearch';
import SendAmount from './Amount';
import SendConfirm from './Confirm';
import SendSuccess from './Success';
import SelectAction from './SelectAction';
import SimpleTabs from '../SimpleTabs';

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	outerContainer: {
		display: 'flex',
		flexDirection: 'column',
	},
	formControl: {
		fullWidth: true,
		display: 'flex',
		wrap: 'nowrap',
	},
}));

const SendForm = (props) => {
	const { balance } = props;
	const [step, setStep] = useState(1);
	const [mode, setMode] = useState('send');
	const [recip, setRecip] = useState('');
	const [amount, setAmount] = useState(0);
	const classes = useStyles();

	const nextStep = () => setStep(step + 1);
	const prevStep = () => setStep(step - 1);
	const setModeSend = () => setMode('send');
	const setModeRequest = () => setMode('request');
	const resetState = () => {
		setStep(1);
		setAmount(0);
		setRecip('');
	};
	const formValues = { recip, amount, mode };

	const switchFunc = () => {
		switch (step) {
			case 0:
				return (
					<SelectAction
						setModeSend={setModeSend}
						setModeRequest={setModeRequest}
					/>
				);

			case 1:
				return (
					<SendUserSearch
						prevStep={prevStep}
						nextStep={nextStep}
						recip={recip}
						setRecip={setRecip}
						formValues={formValues}
						classes={classes}
					/>
				);

			case 2:
				return (
					<SendAmount
						nextStep={nextStep}
						prevStep={prevStep}
						amount={amount}
						setAmount={setAmount}
						formValues={formValues}
						balance={balance}
						mode={mode}
						classes={classes}
					/>
				);

			case 3:
				return (
					<SendConfirm
						nextStep={nextStep}
						prevStep={prevStep}
						formValues={formValues}
					/>
				);

			case 4:
				return <SendSuccess resetState={resetState} formValues={formValues} />;

			default:
		}
	};

	return (
		<div>
			<SimpleTabs
				tab1Label={'Send'}
				tab2Label={'Request'}
				tab1Handler={setModeSend}
				tab2Handler={setModeRequest}
			/>
			{switchFunc()}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		balance: state.user.balance,
	};
};

export default connect(mapStateToProps, null)(SendForm);
