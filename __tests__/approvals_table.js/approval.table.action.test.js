import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	getTripRequests,
	editTripRequestStatus,
	setSelectedTripRequestAction,
	closeErrorMessageAlert,
	SearchTripRequests,
} from '../../src/actions/approval.table';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
import dotenv from 'dotenv';

dotenv.config();
describe('approval table test', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});

	it('should get trip requests managed by manager', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {
					data: {
						data: { tripRequests: [] },
					},
				},
			});
		});

		const expectation = [
			{
				type: 'GET_TRIP_REQUESTS_SUCCESS',
				tripRequests: { data: { tripRequests: [] } },
			},
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(getTripRequests({ page: 1, limit: 10 }))
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});
	it('should fail to get manager trip request', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 400,
				message: 'fail',
				response: {},
			});
		});

		const expectation = [
			{ type: 'GET_TRIP_REQUESTS_FAIL', tripRequestsError: true },
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(getTripRequests({ page: 1, limit: 10 }))
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});
	it('should edit trip request status', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {},
			});
		});

		const expectation = [
			{
				type: 'EDIT_TRIPREQUEST_STATUS_SUCCESS',
				successMessage: true,
				message: undefined,
			},
			{
				type: 'GET_TRIP_REQUESTS_SUCCESS',
				tripRequests: [
					[
						{
							id: 1,
							status: 'approved',
						},
					],
					[{ status: '', id: 2 }],
				],
			},
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(
				editTripRequestStatus('approved', 1, [
					[{ status: '', id: 1 }],
					[{ status: '', id: 2 }],
				]),
			)
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});
	it('should fail to edit trip request status', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 500,
				message: 'fail',
				response: {},
			});
		});

		const expectation = [
			{
				type: 'EDIT_TRIPREQUEST_STATUS_FAIL',
				errorMessage: true,
				message: 'Request failed with status code 500',
			},
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(editTripRequestStatus('approved', 1, [[{ status: '', id: 1 }]]))
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});

	it('should search trip requests managed by manager', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {
					data: {
						count: 2,
						data: { tripRequests: [] },
					},
				},
			});
		});

		const expectation = 'GET_TRIP_REQUESTS_SUCCESS';

		const myStore = mockStore({});
		await myStore
			.dispatch(SearchTripRequests({ target: { value: '0' } }))
			.then(async () => {
				const result = myStore.getActions();
				expect(result[0].type).toEqual(expectation);
			});
	});

	it('should get selected trip', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {},
			});
		});

		const expectation = [
			{ type: 'SET_SELLECTED_TRIP', payload: [[{ status: '', id: 1 }]] },
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(setSelectedTripRequestAction([[{ status: '', id: 1 }]]))
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});
	it('should close error message alert', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'fail',
				response: {},
			});
		});

		const expectation = [
			{
				type: 'MAKE_OPEN_MODEL_TO_FALSE',
				successMessage: false,
				errorMessage: false,
			},
		];
		const newStore = mockStore({});
		await newStore.dispatch(closeErrorMessageAlert()).then(async () => {
			const result = newStore.getActions();
			expect(result).toEqual(expectation);
		});
	});

	it('should fail to search manager trip request', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 400,
				message: 'fail',
				response: {},
			});
		});

		const expectation = [
			{ type: 'SEARCH_TRIP_REQUESTS_FAIL', searchError: true },
		];
		const newStore = mockStore({});
		await newStore
			.dispatch(SearchTripRequests({ target: 'value' }))
			.then(async () => {
				const result = newStore.getActions();
				expect(result).toEqual(expectation);
			});
	});
});
