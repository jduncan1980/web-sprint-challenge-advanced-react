import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
	waitFor,
	act,
} from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

afterEach(() => {
	cleanup();
});

test('form header renders', () => {
	const { getByTestId } = render(<CheckoutForm />);
	const header = getByTestId('formHeader');
	expect(header).toHaveTextContent(/checkout form/i);
});

test('form shows success message on submit with form details', async () => {
	const { getByTestId } = render(<CheckoutForm />);

	const firstName = getByTestId('firstNameInput');
	fireEvent.change(firstName, { target: { value: 'joseph' } });
	expect(firstName).toHaveValue('joseph');

	const lastName = getByTestId('lastNameInput');
	fireEvent.change(lastName, { target: { value: 'smith' } });
	expect(lastName).toHaveValue('smith');

	const address = getByTestId('addressInput');
	fireEvent.change(address, { target: { value: '123 Fake St.' } });
	expect(address).toHaveValue('123 Fake St.');

	const city = getByTestId('cityInput');
	fireEvent.change(city, { target: { value: 'Brooklyn' } });
	expect(city).toHaveValue('Brooklyn');

	const state = getByTestId('stateInput');
	fireEvent.change(state, { target: { value: 'NY' } });
	expect(state).toHaveValue('NY');

	const zip = getByTestId('zipInput');
	fireEvent.change(zip, { target: { value: '12345' } });
	expect(zip).toHaveValue('12345');

	const button = getByTestId('submitButton');
	fireEvent.click(button);

	const success = await waitFor(() => getByTestId('successMessage'));
	expect(success).toHaveTextContent(/joseph/i);
	expect(success).toHaveTextContent(/smith/i);
	expect(success).toHaveTextContent(/123 Fake St./i);
	expect(success).toHaveTextContent(/Brooklyn/i);
	expect(success).toHaveTextContent(/ny/i);
	expect(success).toHaveTextContent(/12345/i);
});
