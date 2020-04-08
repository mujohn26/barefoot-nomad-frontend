import React from 'react';
import { mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../../src/reducers/index';
import {
	Request,
	mapStateToProps,
	normalizeType,
} from '../../src/views/trip_requests/userTripRequest.view.jsx';
const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
describe('Render trip request ui', () => {
	const props = [
		{
			id: 1,
			origin: 'Kigali',
			destination: 'Kincasa',
			tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
			tripTripId: 2,
			tripType: 'round trip',
			status: 'Approved',
			accomodation: 'fgfghftjghv',
			departureDate: '2020-09-12T00:00:00.000Z',
			returnDate: '2020-02-01T22:00:00.000Z',
			createdAt: '2020-02-19T19:58:30.638Z',
			manager: {
				'first Name': 'Dominique',
				lastName: 'Nsengimana',
			},
			booking: []
		},
	];
	const user = {
		firstName: 'Dominique',
		lastName: 'Veda',
	};
	const prop = {};
	const store = testStore({});
	mount(
		<Provider store={store}>
			<Request trip={prop} history={{ push: jest.fn() }} user={user} />
		</Provider>,
	);
	const wrapper1 = mount(
		<Provider store={store}>
			<Request trip={[]} user={user} history={{ push: jest.fn() }} />
		</Provider>,
	);
	const wrapper = mount(
		<Provider store={store}>
			<Request trip={props} user={user} history={{ push: jest.fn() }} selectTripToBookAccommodationAction={jest.fn()} />
		</Provider>,
	);
	props[0].booking = [{
		id: 32,
		accomodation: 'Ganji',
		name: 'Ganji',
		roomid: 324
	}]
	const wrapper2 = mount(
		<Provider store={store}>
			<Request trip={props} user={user} history={{ push: jest.fn() }} selectTripToBookAccommodationAction={jest.fn()} />
		</Provider>,
	);
	it('should map state to props successfully', () => {
		const mapState = mapStateToProps({
			tripRequestsReducers: {
				trip: {
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'round trip',
					status: 'Approved',
					accomodation: 'fgfghftjghv',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			},
			userProfileReducer: {
				userProfileInfo: {
					firstName: 'Dominique',
					lastName: 'Veda',
				},
			},
		});
		expect(mapState.user).toEqual(user);
	});
	it('should render all components successfully', () => {
		const origin = wrapper.find('#origin0').at(1);
		expect(origin.first().props().label).toEqual('Origin');
		const destination = wrapper.find('#destination0').at(1);
		expect(destination.first().props().label).toEqual('Destination');
		const departureDate = wrapper.find('#departureDate0').at(1);
		expect(departureDate.first().props().label).toEqual('Departure Date');
		const returnDate = wrapper.find('#returnDate0').at(1);
		expect(returnDate.first().props().label).toEqual('Return Date');
		const reason = wrapper.find('#reason0').at(1);
		expect(reason.first().props().label).toEqual('Reason');
		const accomodation = wrapper.find('#accomodation0').at(1);
		expect(accomodation.first().props().label).toEqual('Accomodation');
		const btn_edit_booking = wrapper.find('#btn_edit_booking').at(1);
		btn_edit_booking
			.first()
			.props()
			.onClick();
	});
	it('should return collect trip type', () => {
		expect(normalizeType('multi-city')).toEqual('Multiple cities trip');
		expect(normalizeType('one way')).toEqual('One way trip');
		expect(normalizeType('return trip')).toEqual('Return trip');
		normalizeType('eturn trip');
	});
});
