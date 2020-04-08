import axios from 'axios';
import io from 'socket.io-client';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAIL = 'GET_NOTIFICATIONS_FAIL';
export const GET_SOCKET_NOTIFICATIONS = 'GET_SOCKET_NOTIFICATIONS';
export const MARK_NOTIFICATIONAS_READ = 'MARK_NOTIFICATIONAS_READ';
export const MARK_NOTIFICATIONAS_READ_FAIL = 'MARK_NOTIFICATIONAS_READ_FAIL';
export const MAKE_OPEN_MODEL_TO_FALSE = 'MAKE_OPEN_MODEL_TO_FALSE';

export const GetNotifications = () => async dispatch => {
	dispatch(getUserNotifications());
};

export const markNotificationAsRead = (
	notificationID = 0,
) => async dispatch => {
	const Token = `Bearer ${localStorage.getItem('token')}`;
	const headers = {
		'Content-Type': 'application/json',
		token: Token,
	};
	notificationID = notificationID === 0 ? '' : notificationID;

	try {
		const result = await axios.patch(
			`${process.env.BACKEND_BASE_URL}/api/v1/notifications/${notificationID}`,
			{ isRead: true },
			{ headers },
		);
		const response = result.data.data;
		dispatch({
			type: MARK_NOTIFICATIONAS_READ,
			markNotificationAsReadMessage: response,
		});
	} catch (error) {
		dispatch({
			type: MARK_NOTIFICATIONAS_READ_FAIL,
			markNotificationAsReadErrorMessage: true,
			open: true,
		});
	}
	dispatch(getUserNotifications());
};

export const getUserNotifications = () => async dispatch => {
	const Token = `Bearer ${localStorage.getItem('token')}`;
	const headers = {
		'Content-Type': 'application/json',
		token: Token,
	};

	try {
		const result = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/notifications`,
			{ headers },
		);
		const UserNotifications = result.data.data;
		dispatch({
			type: GET_NOTIFICATIONS_SUCCESS,
			Notifications: UserNotifications,
		});
	} catch (error) {
		dispatch({
			type: GET_NOTIFICATIONS_FAIL,
			NotificationError: 'Oooops ! something went wrong please try again',
		});
	}
};

export const closeErrorMessageAlert = () => dispatch => {
	dispatch({
		type: MAKE_OPEN_MODEL_TO_FALSE,
		open: false,
	});
};
export const socketManagement = senderId => dispatch => {
	var socket = io.connect(`${process.env.BACKEND_BASE_URL}`);
	socket.emit('connect_user', parseInt(senderId));
	socket.on('approve-or-reject-trip_request_event', data => {
		dispatch(getUserNotification(data));
	});
	socket.on('edit-trip-request', data => {
		dispatch(getUserNotification(data));
	});
	socket.on('trip_request_event', data => {
		dispatch(getUserNotification(data));
	});
	socket.on('trip_request_comment_event', data => {
		dispatch(getUserNotification(data));
	});
};

export const getUserNotification = data => dispatch => {
	data.createdAt = new Date();
	dispatch({
		type: GET_SOCKET_NOTIFICATIONS,
		Notification: data,
	});
};
