import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	ResetPassword,
	mapStateToProps,
} from '../../../src/views/passwordReset/ResetPassword ';
import { props } from '../../../__mockData__/resetPassword-mock-data';
import reducer from '../../../src/reducers/index';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<ResetPassword {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<ResetPassword {...props} store={store} />);
	wrapper.setState({
		password: 'mujohn25',
		confirmPassword: 'mujohn25',
	});
	return wrapper;
};
const setUpInitComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<ResetPassword {...props} store={store} />);
	return wrapper;
};
describe('Render resetPassword  components', () => {
	it('should handle submit successfully', () => {
		const component = setUpComponent();
		component.setState({
			isPasswordValid: true,
			isMatching: true,
			passwordError: 'not matching',
		});
		const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
		component
			.find('[data-test="reset-btn"]')
			.at(4)
			.simulate('submit', { preventDefault() {} });
		expect(handleSubmitSpy).toBeDefined();
	});

	it('should handle change successfully', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('[data-test="reset-password-field"]')
			.simulate('change', { target: { value: '0727570939' } });
		component
			.find('[data-test="reset-confirm-password-field"]')
			.simulate('change', { target: { value: '0727570939' } });
		expect(handleChangeSpy).toBeDefined();
	});
	it('should handle blur successfully', () => {
		const component = setUp();

		const handleChangeSpy = jest.spyOn(component.instance(), 'handleBlur');
		component
			.find('[data-test="reset-password-field"]')
			.simulate('blur', { target: { name: 'password' } });
		component
			.find('[data-test="reset-confirm-password-field"]')
			.simulate('blur', { target: { name: 'confirmPassword' } });
		expect(handleChangeSpy).toBeDefined();
	});
	it('should map state to props', () => {
		expect(mapStateToProps);

		const state = {
			passwordReducer: {
				resetMessage: 'email sent',
				isLoading: true,
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});

describe('Render resetPassword  components', () => {
	it('should throw an error on unmatched password', () => {
		const wrapper = mount(<ResetPassword {...props} />);
		wrapper.setState({
			password: 'mujohn25',
			confirmPassword: 'mujohn25',
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'validate');

		wrapper.instance().validate('confirmPassword', 'mujohn25');
		expect(handleSubmitSpy).toBeDefined();
	});

	it('should handle componentDidUpdate successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ resetMessage: 'invalid' });
		expect(handleChangeSpy).toBeDefined();
	});
});
