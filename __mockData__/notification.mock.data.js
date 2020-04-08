import {
	MARK_NOTIFICATIONAS_READ,
	GET_NOTIFICATIONS_SUCCESS,
} from '../src/actions/notificationPane';

export const props = {
	classes: { textFild: '' },
	modal: true,
	closeErrorMessageAlert: jest.fn(),
	socketManagement: jest.fn(),
	// popupState: jest.fn(),
	popupState: true,
	GetNotifications: jest.fn(),
	UNSAFE_componentWillMount: jest.fn(),
	markNotificationAsRead: jest.fn(),
	notificationPaneHeigthHandle: jest.fn(),
	history: { push: jest.fn() },
	notifications: [{ read: true }, { read: true }],
	notification: [{ read: false }, { read: false }],
	notificationPaneHeigthHandle: jest.fn(),
	notificationGreaterThanNine: [
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
		{ read: false },
	],
};

export const socketNotification = {
	type: 'GET_SOCKET_NOTIFICATIONS',
	Notifications: {},
};
export const getNotificationsFail = {
	type: 'GET_NOTIFICATIONS_FAIL',
	NotificationError: {},
};
export const markNotificationAsReadFail = {
	type: 'MARK_NOTIFICATIONAS_READ_FAIL',
	markNotificationAsReadErrorMessage: {},
	open: '',
};
export const openErrorModel = {
	type: 'MAKE_OPEN_MODEL_TO_FALSE',
	open: false,
};

export const initialState = {
	Notifications: [],
	markNotificationAsRead: [],
	NotificationError: '',
	markNotificationAsReadErrorMessage: false,
	open: false,
};
export const getNotifications = {
	type: GET_NOTIFICATIONS_SUCCESS,
	Notifications: [
		{
			message: 'test message',
		},
		{
			message: 'test message',
		},
		{
			message: 'test message',
		},
	],
};

export const markNotificationAsRead = {
	type: MARK_NOTIFICATIONAS_READ,
	markNotificationAsReadMessage: {
		message: 'shema has updated a trip request',
	},
};

export const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoicmljc2hhbWFAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjEsInJvbGUiOiJyZXF1ZXN0ZXIifSwiaWF0IjoxNTgyMzk1NjAyLCJleHAiOjE1ODI0ODIwMDJ9.idrtqvBO6UkVxqU32mW6XKC2a4XcltwETQtMWOP3lOQ';
