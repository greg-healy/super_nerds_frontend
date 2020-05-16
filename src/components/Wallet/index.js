import React, { useState, useEffect } from 'react';

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
	}
};

export default SendForm;
