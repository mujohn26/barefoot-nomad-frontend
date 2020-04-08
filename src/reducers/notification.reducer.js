const initialState = {
	Notifications: [],
	markNotificationAsRead: [],
	NotificationError: '',
	markNotificationAsReadErrorMessage: false,
	open: false,
};
const NotificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_NOTIFICATIONS_SUCCESS':
			return {
				...state,
				Notifications: [...action.Notifications],
				NotificationError: '',
			};
		case 'GET_NOTIFICATIONS_FAIL':
			return {
				...state,
				NotificationError: action.NotificationError,
			};
		case 'GET_SOCKET_NOTIFICATIONS':
			return {
				...state,
				Notifications: [action.Notification, ...state.Notifications],
			};
		case 'MARK_NOTIFICATIONAS_READ':
			return {
				...state,
				markAllAsRead: {
					...state.markNotificationAsRead,
					...action.markNotificationAsReadMessage,
				},
				markNotificationAsReadErrorMessage: false,
			};
		case 'MARK_NOTIFICATIONAS_READ_FAIL':
			return {
				...state,
				markNotificationAsReadErrorMessage: {
					...state.markNotificationAsReadErrorMessage,
					...action.markNotificationAsReadErrorMessage,
				},
				open: action.open,
			};
		case 'MAKE_OPEN_MODEL_TO_FALSE':
			return {
				...state,
				open: action.open,
			};
		default:
			return state;
	}
};
export default NotificationReducer;
