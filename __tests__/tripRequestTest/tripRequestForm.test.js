import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	OneWayForm,
	mapStateToProps,
} from '../../src/components/trip-request/oneWay.jsx';
import { TripRequest } from '../../src/views/triprequest.view';
import { props, props2 } from '../../__mockData__/tripRequest-mock-data';
import reducer from '../../src/reducers/index';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<OneWayForm {...props} store={store} />);
	return wrapper;
};
describe('Trip requests Form component tests', () => {
	it('should count div used throughout the form', () => {
		const wrapper = setUpComponent();
		wrapper.setProps({ previousValue: { To: true } });
		expect(wrapper.find('div').length).toBe(1);
	});
	it('should handle departure change successfully while sending multi city trip request', () => {
		const component = setUpComponent();
		component.setProps({ previousValue: { To: false } });
		component.setProps({
			index: 1,
		});
		component.setState({
			submitted: false,
		});
		component
			.find('WithStyles(ForwardRef(Select))')
			.at(0)
			.props()
			.onChange();
		expect(component.state('submitted')).toEqual(true);
	});
	it('should handle destination change successfully while sending multi city trip request', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
		});
		component.setState({
			submitted: true,
		});
		component
			.find('WithStyles(ForwardRef(Select))')
			.at(1)
			.props()
			.onChange();
		expect(component.state('submitted')).toEqual(false);
	});
	it('should handle departure date change successfully while sending multi city trip request', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
		});
		component.setState({
			submitted: false,
		});
		component
			.find('PickerWithState')
			.props()
			.onChange();
		expect(component.state('submitted')).toEqual(true);
	});
	it('should handle reason change successfully while sending multi city trip request', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
		});
		component.setState({
			submitted: true,
		});
		component
			.find('WithStyles(ForwardRef(TextField))')
			.props()
			.onChange();
		expect(component.state('submitted')).toEqual(false);
	});
	it('should simulate onChange successfully', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
			value: {
				index: 1,
			},
		});
		component
			.find('PickerWithState')
			.at(1)
			.props()
			.onChange();
	});
	it('should simulate delete change when onclick is successful', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
			multiCityDatalength: 3,
		});
		component
			.find('CloseRoundedIcon')
			.props()
			.onClick();
	});
	it('should map state to props', () => {
		const state = props;
		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
	it('should map state to props', () => {
		const store = testStore({});
		shallow(<OneWayForm {...props2} store={store} />);
		const state = props2;
		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});
