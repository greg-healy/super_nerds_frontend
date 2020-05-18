import React, { useState } from 'react';

import SendUserSearch from './SendUserSearch';
import SendAmount from './SendAmount';
import SendConfirm from './SendConfirm';
import SendSuccess from './SendSuccess';

const SendForm = (props) => {
	const [step, setStep] = useState(1);
	const [recip, setRecip] = useState('');
	const [amount, setAmount] = useState(0);

	const nextStep = () => {
		setStep(step + 1);
	};

	const prevStep = () => {
		setStep(step - 1);
	};

	const formValues = { recip, amount };

	switch (step) {
		case 1:
			return (
				<SendUserSearch
					nextStep={nextStep}
					setRecip={setRecip}
					formValues={formValues}
				/>
			);

		case 2:
			return (
				<SendAmount
					nextStep={nextStep}
					prevStep={prevStep}
					setAmount={setAmount}
					formValues={formValues}
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
			return <SendSuccess formValues={formValues} />;

		default:
	}
};

export default SendForm;
