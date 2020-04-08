/* eslint-disable consistent-return */
const EVENTS = {
	connect_user: [],
	'approve-or-reject-trip_request_event': [],
	'edit-trip-request': [],
	trip_request_comment_event: [],
	trip_request_event: [],
};
const emit = (event, ...args) => {
	EVENTS[event].forEach(func => func(...args));
};
const socket = {
	on(event, func) {
		if (EVENTS[event]) {
			return EVENTS[event].push(func);
		}
		EVENTS[event] = [func];
	},
	emit,
};
export const io = {
	connect() {
		return socket;
	},
};
// to emulate server emit.
export const serverSocket = { emit };
export default io;
