import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import WalletBank from './WalletBank';
import WalletAmount from './WalletAmount';
import WalletConfirm from './WalletConfirm';
import WalletSuccess from './WalletSuccess';
import flaskapi from '../../api/flaskapi';

const Wallet = ({ access_token }) => {
	const [step, setStep] = useState(1);
	const [bank, setBank] = useState({});
	const [amount, setAmount] = useState(0);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	useEffect(() => {
		(async () => {
			const response = await flaskapi.get('/bank', {
				headers: {
					Authorization: access_token,
				},
			});
			setBank({ name: response.data.bank_name, number: response.data.bank_no });
		})();
	});

	// TODO : If the user doesn't have a bank, set the step to -1
	// At step -1, let them create a bank
	// At step 0, let them decide if the want to deposit/withdraw
	// Depending on their decision, set the type (need to pass in from TabPanel)

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
					access_token={access_token}
				/>
			);

		case 4:
			return <WalletSuccess formValues={formValues} />;
	}
};

const mapStateToProps = (state) => {
	return {
		access_token: state.auth.access_token,
	};
};

export default connect(mapStateToProps, null)(Wallet);
