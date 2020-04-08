import React from 'react';
import { shallow, mount } from 'enzyme';
import { TripRequest, mapStateToProps } from '../../src/views/triprequest.view';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { props } from '../../__mockData__/tripRequest-mock-data';
import reducer from '../../src/reducers/index';

import { Provider } from 'react-redux';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<TripRequest {...props} store={store} />);
	return wrapper;
};
const setUpEditTrip = (initialState = {}) => {
	const store = testStore(initialState);
	props.trip = [
		{
			reason: 'traveling',
			accomodationId: 3,
			From: 1,
			To: 4,
			type: 'one way',
			departureDate: `${new Date(2013, 0, 2)}`,
		},
		{
			reason: 'traveling',
			accomodationId: 3,
			From: 4,
			To: 6,
			type: 'one way',
			departureDate: `${new Date(2016, 0, 2)}`,
		},
	];
	const wrapper = shallow(<TripRequest {...props} store={store} />);
	return wrapper;
};

describe('Trip Request component tests', () => {
	it('should render successfully all breaks found in Trip Request view page', () => {
		const wrapper = shallow(<TripRequest error={true} />);
		expect(wrapper.find('br').length).toBe(1);
	});

	it('should handle change successfully', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.onHandleChange({
				target: { name: 'From', value: '3' },
			});
		expect(component.state('From')).toEqual('3');
	});
	it('should handle destination change when departure and destination are different', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.onHandleChange({ target: { name: 'To', value: '1' } });
		expect(component.state('To')).toEqual('1');
	});
	it('should return empty value of destination when departure and destination are the same', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '1',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.onHandleChange({ target: { name: 'To', value: '1' } });
		expect(component.state('To')).toEqual('');
	});
	it('should handle departureDate change successfully', () => {
		const component = setUp();
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.onHandleChange({
				target: {
					name: 'departureDate',
					value: 'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
				},
			});
		expect(component.state('departureDate')).toEqual(
			'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
		);
	});
	it('should simulate that onclick button has been clicked on round trip', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: `${new Date(2013, 0, 2)}`,
		});
		component
			.find('WithStyles(ForwardRef(Button))')
			.at(1)
			.props()
			.onClick();
	});
	it('should simulate that onclick button has been clicked on one way trip', () => {
		const component = setUp();
		component.setState({
			index: 0,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: `${new Date(2013, 0, 2)}`,
		});
		component
			.find('WithStyles(ForwardRef(Button))')
			.at(1)
			.props()
			.onClick();
	});
	it('should handle handle departure date change  successfully', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.handleChangeDepartureDate(
				'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
			);
		expect(component.state('departureDate')).toEqual(
			'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
		);
	});
	it('should handle return date change successfully', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.handleChangeReturnDate(
				'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
			);
		expect(component.state('returnDate')).toEqual(
			'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
		);
	});
	it('should handle return date to be greater than departure date', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: `Mon Mar 14 2020 16:38:51 GMT+0200 (Central Africa Time)`,
			returnDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(0)
			.props()
			.handleChangeReturnDate(
				'Mon Mar 10 2020 16:38:51 GMT+0200 (Central Africa Time)',
			);
		expect(component.state('returnDate')).toEqual(
			'Mon Mar 14 2020 16:38:51 GMT+0200 (Central Africa Time)',
		);
	});
	it('should handle onclick change of accommodationId', () => {
		const component = setUp();
		component
			.find('Connect(AdsPictures)')
			.at(1)
			.props()
			.onClick(10);
		expect(component.state('accomodationId')).toEqual(10);
	});
	it('should handle change of tab index successfully', () => {
		const component = setUp();
		component.setState({
			index: 1,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: '',
		});
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'handleIndexChange',
		);
		component
			.find('[data-test="index"]')
			.props()
			.onChange('', 2);
		expect(handleChangeSpy).toBeDefined();
		expect(component.state('index')).toEqual(2);
	});
	it('should handle close snackbar successfully', () => {
		const component = setUp();
		component
			.find('[data-test="closeSnackbar"]')
			.props()
			.onClose();
		expect(component.state('open')).toEqual(false);
	});
	it('should simulate that onclick button has been successfully when multi city trip request is submitted', () => {
		const component = setUp();
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: `${new Date(2013, 0, 2)}`,
			multiCity: [
				{
					reason: 'traveling',
					accomodationId: 3,
					From: 1,
					To: 4,
					type: 'one way',
					departureDate: `${new Date(2013, 0, 2)}`,
				},
				{
					reason: 'traveling',
					accomodationId: 3,
					From: 4,
					To: 6,
					type: 'one way',
					departureDate: `${new Date(2016, 0, 2)}`,
				},
			],
		});
		component
			.find('WithStyles(ForwardRef(Button))')
			.at(1)
			.props()
			.onClick();
	});
	it('should simulate that onclick save button is clicked', () => {
		const component = setUpEditTrip();
		component.setState({
			index: 2,
			submitted: false,
		});
		component
			.find('WithStyles(ForwardRef(Button))')
			.props()
			.onClick();
		expect(component.state('multiCity')[1].type).toEqual('multi-city');
	});
	it('should simulate that onclick button has been successfully when multi city trip edit request is submitted', () => {
		const component = setUp();
		component.setState({
			index: 2,
			submitted: false,
			trip: true,
			buttonState: false,
			reason: 'traveling',
			accomodationId: 3,
			From: 1,
			To: 4,
			type: 'one way',
			departureDate: `${new Date(2013, 0, 2)}`,
			multiCity: [
				{
					reason: 'traveling',
					accomodationId: 3,
					From: 1,
					To: 4,
					type: 'one way',
					departureDate: `${new Date(2013, 0, 2)}`,
				},
				{
					reason: 'traveling',
					accomodationId: 3,
					From: 4,
					To: 6,
					type: 'one way',
					departureDate: `${new Date(2016, 0, 2)}`,
				},
			],
		});
		component
			.find('WithStyles(ForwardRef(Button))')
			.props()
			.onClick();
		expect(component.state('multiCity')[1].type).toEqual('multi-city');
	});
	it('should handle change successfully while creating multi city trip request', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(1)
			.props()
			.onHandleChange(
				{
					target: { name: 'From', value: '3' },
				},
				1,
			);
		expect(component.state('multiCity')[1].From).toEqual('3');
	});
	it('should handle addition of new multi city trip request form', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('AddCircleRoundedIcon')
			.props()
			.onClick();
		expect(component.state('multiCity').length).toEqual(3);
	});
	it('should handle delete one form of  multi city trip request successfully', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
			multiCity: [
				{
					From: '1',
					To: '1',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '1',
					To: '1',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '1',
					To: '1',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(1)
			.props()
			.handleDelete();
		expect(component.state('multiCity').length).toEqual(2);
	});
	it('should handle destination change when departure and destination are different while adding multi city trip request info', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '',
			To: '',
			type: 'one way',
			departureDate: ``,
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(1)
			.props()
			.onHandleChange({ target: { name: 'To', value: '1' } }, 0);
		expect(component.state('multiCity')[0].To).toEqual('1');
	});
	it('should return empty value of destination when departure and destination are the same while sending multi city trip request', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '1',
			To: '',
			type: 'one way',
			departureDate: ``,
			multiCity: [
				{
					From: '1',
					To: '1',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '1',
					To: '1',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(1)
			.props()
			.onHandleChange({ target: { name: 'To', value: '1' } }, 0);
		expect(component.state('multiCity')[0].To).toEqual('');
	});
	it('should handle departureDate change successfully while sending multi city trip request', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '1',
			To: '',
			type: 'one way',
			departureDate: ``,
			multiCity: [
				{
					From: '',
					To: '',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '',
					To: '',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
		});
		component
			.find('Connect(WithStyles(OneWayForm))')
			.at(1)
			.props()
			.handleChangeDateMultiCity(
				'Mon Mar 09 2020 16:38:51 GMT+0200 (Central Africa Time)',
				'departureDate',
				0,
			);
		expect(component.state('multiCity')[0].departureDate).toEqual('2020-03-09');
	});
	it('should handle accommodationId change successfully while sending multi city trip request', () => {
		const component = setUp();
		component.setProps({
			index: 1,
		});
		component.setState({
			index: 2,
			submitted: false,
			reason: '',
			accomodationId: '',
			From: '1',
			To: '',
			type: 'one way',
			departureDate: ``,
			multiCity: [
				{
					From: '',
					To: '',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
				{
					From: '',
					To: '',
					type: 'one way',
					departureDate: `${new Date()}`,
					reason: '',
					accomodationId: '',
				},
			],
		});
		component
			.find('Connect(AdsPictures)')
			.at(0)
			.props()
			.onClick(10, 0);
		expect(component.state('multiCity')[0].accomodationId).toEqual(10);
	});
	it('should map state to props', () => {
		const state = props;
		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});
