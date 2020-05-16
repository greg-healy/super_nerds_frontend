import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WalletBank from './WalletBank';
import WalletAmount from './WalletAmount';
import WalletConfirm from './WalletConfirm';
import WalletSuccess from './WalletSuccess';
import { fetchBank } from '../../actions';

const Wallet = (props) => {
	const [step, setStep] = useState(1);
	const [bank, setBank] = useState({});
	const [amount, setAmount] = useState(0);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const formValues = { bank, amount };

	switch (step) {
		case 1:
			return (
				<WalletBank
					nextStep={nextStep}
					setRecip={setBank}
					formValues={formValues}
				/>
			);

		case 2:
			return (
				<WalletAmount
					nextStep={nextStep}
					prevStep={prevStep}
					setAmount={setAmount}
					formValues={formValues}
				/>
			);

		case 3:
			return (
				<WalletConfirm
					nextStep={nextStep}
					prevStep={prevStep}
					formValues={formValues}
				/>
			);

		case 4:
			return <WalletSuccess formValues={formValues} />;
	}
};

const mapStateToProps = (state) => {
	return {
		bank_no: state.user.bank_no,
		bank_name: state.user.bank_name,
	};
};

export default connect(mapStateToProps, { fetchBank })(Wallet);
