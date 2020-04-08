import NotificationReducer from '../../src/reducers/notification.reducer';
import {
	getNotifications,
	markNotificationAsRead,
	initialState,
	socketNotification,
	getNotificationsFail,
	markNotificationAsReadFail,
	openErrorModel,
} from '../../__mockData__/notification.mock.data';

describe('notification test', () => {
	it('Should get all notification', () => {
		const getState = NotificationReducer({}, getNotifications);
		expect(getState).toEqual({
			Notifications: getNotifications.Notifications,
			NotificationError: '',
		});
	});
	it('Should get all notification', () => {
		const getState = NotificationReducer({}, getNotifications);
		expect(getState).toEqual({
			Notifications: getNotifications.Notifications,
			NotificationError: '',
		});
	});
	it('Should get notification via socket', () => {
		const getState = NotificationReducer(
			{ Notifications: [] },
			socketNotification,
		);

		expect(getState).toEqual({
			Notifications: [undefined],
		});
	});
	it('Should mark notification as read', () => {
		const getState = NotificationReducer({}, markNotificationAsRead);
		expect(getState).toEqual({
			markAllAsRead: markNotificationAsRead.markNotificationAsReadMessage,
			markNotificationAsReadErrorMessage: false,
		});
	});
	it('Should fail to get all notifications', () => {
		const getState = NotificationReducer({}, getNotificationsFail);
		expect(getState).toEqual({
			NotificationError: getNotificationsFail.NotificationError,
		});
	});
	it('Should fail to mark all notifications as read', () => {
		const getState = NotificationReducer({}, markNotificationAsReadFail);
		expect(getState).toEqual({
			markNotificationAsReadErrorMessage:
				markNotificationAsReadFail.markNotificationAsReadErrorMessage,
			open: markNotificationAsReadFail.open,
		});
	});
	it('Should close error message model', () => {
		const getState = NotificationReducer({}, openErrorModel);
		expect(getState).toEqual({
			open: openErrorModel.open,
		});
	});

	it('Should match with  default', () => {
		const getState = NotificationReducer(initialState, '');
		expect(getState).toEqual({
			Notifications: [],
			markNotificationAsRead: [],
			NotificationError: '',
			markNotificationAsReadErrorMessage: false,
			open: false,
		});
	});
});
