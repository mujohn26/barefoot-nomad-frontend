import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import {
	GetNotifications,
	markNotificationAsRead,
	getUserNotifications,
	socketManagement,
	closeErrorMessageAlert,
} from '../../src/actions/notificationPane';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
import dotenv from 'dotenv';
import { serverSocket } from './__mocks__/socket.io-client';

dotenv.config();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
describe('display notification pane', () => {
	beforeEach(() => {
		moxios.install(axios);
		store.clearActions();
		jest.resetAllMocks();
	});
	afterEach(() => {
		moxios.uninstall(axios);
		store.clearActions();
	});

	it('should fail to mark all notifications  as read', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 401,
				message: 'error',
				response: {},
			});
		});

		const expectation = [
			{
				markNotificationAsReadErrorMessage: true,
				open: true,
				type: 'MARK_NOTIFICATIONAS_READ_FAIL',
			},
		];
		const newStore = mockStore({});
		await newStore.dispatch(markNotificationAsRead()).then(async () => {
			const result = newStore.getActions();
			expect(result).toEqual(expectation);
		});
	});

	it('should fail to mark all notifications  as read', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 401,
				message: 'error',
				response: {},
			});
		});

		const expectation = [
			{
				markNotificationAsReadErrorMessage: true,
				open: true,
				type: 'MARK_NOTIFICATIONAS_READ_FAIL',
			},
		];
		const newStore = mockStore({});
		await newStore.dispatch(markNotificationAsRead()).then(async () => {
			const result = newStore.getActions();
			expect(result).toEqual(expectation);
		});
	});

	it('should fail to get all notifications', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 401,
				message: 'error',
				response: {},
			});
		});

		const expectation = [
			{
				type: 'GET_NOTIFICATIONS_FAIL',
				NotificationError: 'Oooops ! something went wrong please try again',
			},
		];
		await store.dispatch(getUserNotifications()).then(async () => {
			const result = store.getActions();
			expect(result).toEqual(expectation);
		});
	});

	it('should get all notifications', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {
					data: {
						data: ['New message', 'New trips'],
					},
				},
			});
		});
		await store.dispatch(GetNotifications()).then(async () => {
			const result = store.getActions();
			expect(result).toBeTruthy();
		});
	});

	it('should mark notifications as read', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {
					data: {
						data: ['New message', 'New trips'],
					},
				},
			});
		});

		const expectation = [
			{
				markNotificationAsReadMessage: { data: ['New message', 'New trips'] },
				type: 'MARK_NOTIFICATIONAS_READ',
			},
		];

		await store.dispatch(markNotificationAsRead(2)).then(async () => {
			const result = store.getActions();
			expect(result).toEqual(expectation);
		});
	});

	it('should get all notifications after mark all notifications as read', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {
					data: {
						data: ['New message', 'New trips'],
					},
				},
			});
		});
		await store.dispatch(getUserNotifications()).then(async () => {
			const result = store.getActions();
			expect(result[0].type).toEqual('GET_NOTIFICATIONS_SUCCESS');
		});
	});

	it('should close error message alert', async () => {
		const middlewares = [thunk];
		const mockStore = configureMockStore(middlewares);
		const initialState = {};
		const stor = mockStore(initialState);

		const expectation = [{ type: 'MAKE_OPEN_MODEL_TO_FALSE', open: false }];

		await stor.dispatch(closeErrorMessageAlert());
		const actions = stor.getActions();
		expect(actions).toEqual(expectation);
	});

	it('should cencing notifications from server via socket', () => {
		const initialState = {};
		const storer = mockStore(initialState);
		storer.dispatch(socketManagement(1));
		serverSocket.emit('approve-or-reject-trip_request_event', () => ({
			title: 'new notification',
			message: ' trip approved',
		}));
		serverSocket.emit('edit-trip-request', () => ({
			title: 'new notification',
			message: ' trip edited',
		}));
		serverSocket.emit('trip_request_comment_event', () => ({
			title: 'new notification',
			message: ' comment',
		}));
		serverSocket.emit('trip_request_event', () => ({
			title: 'new notification',
			message: ' trip created',
		}));
		const actions = storer.getActions();
		expect(actions.length).toEqual(4);
		expect(actions[0].type).toEqual('GET_SOCKET_NOTIFICATIONS');
	});
});
