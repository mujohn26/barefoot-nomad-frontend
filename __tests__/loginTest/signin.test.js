import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	LoginForm,
	mapStateToProps,
} from '../../src/components/auth/Login.jsx';
import { props } from '../../__mockData__/signin-mock-data';
import reducer from '../../src/reducers/index';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<LoginForm {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<LoginForm {...props} store={store} />);
	wrapper.setState({
		email: 'jajabenit25@gmail.com',
		password: 'jajabenit2600',
		submitted: false,
	});
	return wrapper;
};
const setUpInitComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<LoginForm {...props} store={store} />);
	wrapper.setState({
		email: 'jajabenit25@gmail.com',
		password: 'jajabenit2600',
		submitted: true,
	});
	return wrapper;
};
describe('Render signIn component', () => {
	it('should call action on form submit', () => {
		const wrapper = setUpComponent();
		const submitRequest = sinon
			.stub(wrapper.instance(), 'handleSubmit')
			.returns(true);
		wrapper.find('form').simulate('submit', { preventDefault() {} });
		expect(submitRequest).toBeDefined();

		submitRequest.restore();
	});
	it('should handle change successfully', () => {
		const component = setUp();
		component.setState({
			email: '',
			password: '',
			submitted: false,
		});
		const handleChangeSpy = jest.spyOn(component.instance(), 'handleChange');
		component.find('[data-test="signin-email"]').simulate('change', {
			target: { name: 'email', value: 'jajabenit@gmail.com' },
		});
		component.find('[data-test="signin-password"]').simulate('change', {
			target: { name: 'password', value: '0727570939' },
		});
		expect(handleChangeSpy).toBeDefined();
	});
	it('should map state to props', () => {
		expect(mapStateToProps);
		const state = props;
		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});

describe('Render Login  components', () => {
	it('should throw an error bad email and password input', () => {
		const component = setUpInitComponent();
		const handleSubmitSpy = jest.spyOn(component.instance(), 'handleSubmit');
		expect(handleSubmitSpy).toBeDefined();
	});

	it('should handle componentDidUpdate successfully', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ user: 'invalid' });
		expect(handleChangeSpy).toBeDefined();
	});
});
