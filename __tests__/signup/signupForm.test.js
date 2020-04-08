import React from 'react';
import { mount } from 'enzyme';
import { mapStateToProps } from '../../src/views/signup/signup.view.jsx';
import SignupForm from '../../src/components/signup/signup_form.component.jsx';

describe('Render signup form view', () => {
	it('should render signup form view successfully', async () => {
		mapStateToProps({
			appReducer: {
				isLoading: false,
			},
			signupReducer: {
				signupError: 'Provided email is already registered',
				isSignedup: true,
			},
		});

		const wrapper = mount(
			<SignupForm
				style={{}}
				history={{
					push: jest.fn(),
				}}
				values={{
					firstName: 'Dominique',
					lastName: 'Nsengimana',
					email: 'nsengimanaveda@gmail.com',
					country: 'Rwanda',
					password: '1234567890o',
					passwordMatch: true,
					isEmailValid: false,
					isPasswordValid: false,
					isLastnameValid: true,
					isFirstnameValid: true,
					isCountryValid: true,
					enableBtn: false,
				}}
				setValues={jest.fn}
				error='Provided email is already registered'
				signupAction={jest.fn()}
				setErrorAction={jest.fn()}
				isLoading={false}
				isSignupCompleted={true}
			/>,
		);

		mount(
			<SignupForm
				style={{}}
				history={{
					push: jest.fn(),
				}}
				values={{
					firstName: 'Dominique',
					lastName: 'Nsengimana',
					email: 'nsengimanaveda@gmail.com',
					country: 'Rwanda',
					password: '1234567890o',
					passwordMatch: true,
					isEmailValid: true,
					isPasswordValid: true,
					isLastnameValid: true,
					isFirstnameValid: true,
					isCountryValid: true,
					enableBtn: false,
				}}
				setValues={jest.fn}
				error='Provided email is already registered'
				signupAction={jest.fn()}
				setErrorAction={jest.fn()}
				isLoading={true}
				isSignupCompleted={true}
			/>,
		);

		const signupform = mount(
			<SignupForm
				style={{}}
				history={{
					push: jest.fn(),
				}}
				values={{
					firstName: 'Dominique',
					lastName: 'Nsengimana',
					email: 'nsengimanaveda@gmail.com',
					country: 'Rwanda',
					password: '1234567890o',
					passwordMatch: false,
					isEmailValid: true,
					isPasswordValid: true,
					isLastnameValid: true,
					isFirstnameValid: true,
					isCountryValid: true,
					enableBtn: false,
				}}
				setValues={jest.fn}
				error='Provided email is already registered'
				signupAction={jest.fn()}
				setErrorAction={jest.fn()}
				isLoading={false}
				isSignupCompleted={true}
			/>,
		);
		signupform.setProps({
			values: {
				firstName: 'Dominique',
				lastName: 'Nsengimana',
				email: 'nsengimanaveda@gmail.com',
				country: 'Rwanda',
				password: '1234567890o',
				passwordMatch: false,
				isEmailValid: true,
				isPasswordValid: true,
				isLastnameValid: true,
				isFirstnameValid: true,
				isCountryValid: true,
				enableBtn: false,
			},
			isLoading: false,
		});

		const emailTxt = wrapper.find('#email').at(1);
		emailTxt
			.props()
			.onChange({ target: { value: 'nsengimanaveda@gmail.com' } });
		const emailTxt1 = wrapper.find('#email').at(1);
		emailTxt1.props().onBlur({ target: { value: 'nsengimanaveda@gmail.com' } });
		const passwordTxt = wrapper.find('#password').at(1);
		passwordTxt.props().onChange({ target: { value: '1234567890o' } });
		passwordTxt.props().onBlur({ target: { value: '1234567890o' } });
		const confirm_passwordTxt = wrapper.find('#confirm_password').at(1);
		confirm_passwordTxt.props().onChange({ target: { value: '1234567890o' } });

		const confirm_passwordTxt2 = signupform.find('#confirm_password').at(1);
		confirm_passwordTxt2.props().onChange({ target: { value: '1234567890o' } });
		confirm_passwordTxt2
			.props()
			.onChange({ target: { value: '1234567890ou' } });

		confirm_passwordTxt.props().onBlur({ target: { value: '1234567890o' } });
		confirm_passwordTxt.props().onBlur({ target: { value: '1234567890' } });
		confirm_passwordTxt.props().onChange({ target: { value: '1234567890og' } });
		const signupBtn = wrapper.find('#signupBtn');
		signupBtn
			.first()
			.props()
			.onClick();

		const firstnameTxt = wrapper.find('#firstname').at(1);
		firstnameTxt.props().onChange({ target: { value: 'Dominique' } });
		const lastnameTxt = wrapper.find('#lastname').at(1);
		lastnameTxt.props().onChange({ target: { value: 'Veda' } });

		const country_selector = wrapper.find('CountrySelector');

		country_selector.props().onChange({ target: { value: 'Rwanda' } });
	});
});
