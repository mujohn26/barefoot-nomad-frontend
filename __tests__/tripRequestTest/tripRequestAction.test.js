import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	requestTrip,
	GetLocations,
	GetAccomodations,
	editTripRequest,
} from '../../src/actions/tripRequestAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Trip Requests  actions', () => {
	beforeEach(() => {
		moxios.install();
	});
	afterEach(() => {
		moxios.uninstall();
	});
	it('should create one way trip successfully', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'Trip Request Successfully created',
					data: {
						data: {
							id: 167,
							originId: 1,
							destinationId: 2,
							accomodationId: 2,
							departureDate: '2020-05-20T00:00:00.000Z',
							returnDate: null,
							userId: 6,
							tripId: '515803e4-ff3e-4b79-bce4-f64416d87a92',
							tripType: 'one way',
							updatedAt: '2020-03-17T20:12:48.733Z',
							createdAt: '2020-03-17T20:12:48.733Z',
							reason: null,
							leavingDays: null,
						},
					},
				},
			});
		});
		const store = mockStore({});
		return store
			.dispatch(requestTrip('1', '2', '2', '2020-05-20', '0788787273'))
			.then(() => {
				expect(store.getActions()[2]).toEqual({
					type: 'REQUEST_TRIP_SUCCESS',
					payload: {
						data: {
							id: 167,
							originId: 1,
							destinationId: 2,
							accomodationId: 2,
							departureDate: '2020-05-20T00:00:00.000Z',
							returnDate: null,
							userId: 6,
							tripId: '515803e4-ff3e-4b79-bce4-f64416d87a92',
							tripType: 'one way',
							updatedAt: '2020-03-17T20:12:48.733Z',
							createdAt: '2020-03-17T20:12:48.733Z',
							reason: null,
							leavingDays: null,
						},
					},
					message: 'Trip request has been successfully created',
				});
			});
	});
	it('should edit trip successfully', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'Trip Request Successfully created',
					data: {
						data: {
							id: 167,
							originId: 1,
							destinationId: 2,
							accomodationId: 2,
							departureDate: '2020-05-20T00:00:00.000Z',
							returnDate: null,
							userId: 6,
							tripId: '515803e4-ff3e-4b79-bce4-f64416d87a92',
							tripType: 'one way',
							updatedAt: '2020-03-17T20:12:48.733Z',
							createdAt: '2020-03-17T20:12:48.733Z',
							reason: null,
							leavingDays: null,
						},
					},
				},
			});
		});
		const store = mockStore({});
		return store
			.dispatch(
				editTripRequest(
					{
						From: '1',
						To: '2',
						accomodationId: '2',
						departureDate: '2020-05-20',
						reason: 'family trip',
					},
					'515803e4-ff3e-4b79-bce4-f64416d87a92',
				),
			)
			.then(() => {
				expect(store.getActions()[2]).toEqual({
					type: 'REQUEST_TRIP_SUCCESS',
					payload: {
						data: {
							id: 167,
							originId: 1,
							destinationId: 2,
							accomodationId: 2,
							departureDate: '2020-05-20T00:00:00.000Z',
							returnDate: null,
							userId: 6,
							tripId: '515803e4-ff3e-4b79-bce4-f64416d87a92',
							tripType: 'one way',
							updatedAt: '2020-03-17T20:12:48.733Z',
							createdAt: '2020-03-17T20:12:48.733Z',
							reason: null,
							leavingDays: null,
						},
					},
					message: 'Trip request has been successfully edited',
				});
			});
	});
	it('should not edit trip request', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 404,
				response: {
					status: 404,
					error:
						'Trip cannot be edited at moment, check provided info and Try Again !!',
				},
			});
		});
		const store = mockStore({});
		return store.dispatch(editTripRequest('')).catch(() => {
			expect(store.getActions()[2]).toEqual({
				type: 'REQUEST_TRIP_ERROR',
				payload: { data: '' },
				message:
					'Trip cannot be edited at moment, check provided info and Try Again !!',
			});
		});
	});
	it('should get accommodation from supported location', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 201,
				response: {
					status: 201,
					data: [
						{ id: '1', name: 'marriot' },
						{ id: '2', name: 'ubumwe' },
						{ id: '3', name: 'serena' },
					],
				},
			});
		});
		const store = mockStore({});
		return store.dispatch(GetAccomodations('1')).then(() => {
			expect(store.getActions()[0]).toEqual({
				type: 'GET_ACCOMODATION_SUCCESS',
				accommodations: [
					{ id: '1', name: 'marriot' },
					{ id: '2', name: 'ubumwe' },
					{ id: '3', name: 'serena' },
				],
			});
		});
	});
	it('should get accommodation from supported location return false when no accomodation found', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 201,
				response: {
					status: 201,
					data: {
						data: [],
					},
				},
			});
		});
		const store = mockStore({});
		return store.dispatch(GetAccomodations('1')).then(() => {
			expect(store.getActions()[0]).toEqual({
				type: 'GET_ACCOMODATION_SUCCESS',
				accommodations: false,
			});
		});
	});
	it('should get all supported location', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 201,
				response: {
					status: 201,
					data: {
						data: [
							{ id: '1', name: 'kigali' },
							{ id: '2', name: 'Kenya' },
						],
					},
				},
			});
		});
		const store = mockStore({});
		return store.dispatch(GetLocations('')).then(() => {
			expect(store.getActions()[0]).toEqual({
				type: 'GET_LOCATIONS',
				locationsInfo: {
					data: [
						{ id: '1', name: 'kigali' },
						{ id: '2', name: 'Kenya' },
					],
				},
			});
		});
	});
	it('should not get create trip request when no data provided', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 404,
				response: {
					status: 404,
					error:
						'Trip cannot be edited at moment, check provided info and Try Again !!',
				},
			});
		});
		const store = mockStore({});
		return store.dispatch(requestTrip('')).catch(() => {
			expect(store.getActions()[2]).toEqual({
				type: 'REQUEST_TRIP_ERROR',
				payload: { data: '' },
				message:
					'Trip cannot be edited at moment, check provided info and Try Again !!',
			});
		});
	});
});
