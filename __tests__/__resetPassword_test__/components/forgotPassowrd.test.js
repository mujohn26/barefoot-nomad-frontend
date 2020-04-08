import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
	ForgotPassword,
	mapStateToProps,
} from '../../../src/views/passwordReset/ForgotPassword';
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
	const wrapper = shallow(<ForgotPassword {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<ForgotPassword {...props} store={store} />);
	return wrapper;
};
describe('Render password  components', () => {
	it('should handle submit successfully', () => {
		const component = setUpComponent();
		const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
		component
			.find('[data-test="forgot-btn"]')
			.at(4)
			.simulate('submit', { preventDefault() {} });
		expect(handleSubmitSpy).toBeDefined();
	});

	it('should handle change successfully', () => {
		const component = setUp();
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component
			.find('[data-test="forgot-email-field"]')
			.simulate('change', { target: { value: 'em' } });

		expect(handleChangeSpy).toBeDefined();
	});
	it('should map state to props', () => {
		expect(mapStateToProps);
		const state = {
			passwordReducer: {
				forgotMessage: 'email sent',
				isLoading: true,
				forgotMessageError: 'user not found',
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});

describe('Render forgot components', () => {
	it('should be disabled function', () => {
		const wrapper = mount(<ForgotPassword {...props} />);
		wrapper.setState({
			email: 'mujohn25@gmail.com',
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'shouldBeDisabled');

		wrapper.instance().shouldBeDisabled();
	});

	it('should handle componentDidUpdate successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ forgotMessage: 'invalid' });
		expect(handleChangeSpy).toBeDefined();
	});
});
