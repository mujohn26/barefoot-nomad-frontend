import {
	GET_TRIP_REQUESTS_SUCCESS,
	GET_TRIP_REQUESTS_FAIL,
	SET_SELLECTED_TRIP,
	EDIT_TRIPREQUEST_STATUS_SUCCESS,
	EDIT_TRIPREQUEST_STATUS_FAIL,
	MAKE_OPEN_MODEL_TO_FALSE,
} from '../src/actions/approval.table';

export const props = {
	closeErrorMessageAlert: jest.fn(),
	popupState: true,
	GetNotifications: jest.fn(),

	getTripRequests: jest.fn(),
};

export const makeOpenModelToFalse = {
	type: MAKE_OPEN_MODEL_TO_FALSE,
	successMessage: false,
	errorMessage: false,
	message: '',
};
export const editTripRequestStatusFail = {
	type: EDIT_TRIPREQUEST_STATUS_FAIL,
	errorMessage: true,
	message: '',
};
export const editTripRequestStatusSuccess = {
	type: EDIT_TRIPREQUEST_STATUS_SUCCESS,
	successMessage: true,
	message: '',
};
export const setSelectedTripRequest = {
	type: SET_SELLECTED_TRIP,
	payload: {},
};
export const getTripRequestsFail = {
	type: GET_TRIP_REQUESTS_FAIL,
	tripRequestsError: false,
};
export const getTripRequestsSuccess = {
	type: GET_TRIP_REQUESTS_SUCCESS,
	tripRequests: { requestTrips: [[], []] },
};
export const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjMsInJvbGUiOiJyZXF1ZXN0ZXIifSwiaWF0IjoxNTgzOTI0ODAyLCJleHAiOjE1ODQwMTEyMDJ9.-9UymF5sdQOnZSTGL9Gnm1rIMnpHEGNxyeYl9X3_GmM';
