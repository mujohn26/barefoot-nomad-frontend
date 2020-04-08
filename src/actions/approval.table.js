import axios from 'axios';
import { config } from 'dotenv';
export const GET_TRIP_REQUESTS_SUCCESS = 'GET_TRIP_REQUESTS_SUCCESS';
export const GET_TRIP_REQUESTS_FAIL = 'GET_TRIP_REQUESTS_FAIL';
export const SET_SELLECTED_TRIP = 'SET_SELLECTED_TRIP';
export const EDIT_TRIPREQUEST_STATUS_SUCCESS =
	'EDIT_TRIPREQUEST_STATUS_SUCCESS';
export const EDIT_TRIPREQUEST_STATUS_FAIL = 'EDIT_TRIPREQUEST_STATUS_FAIL';
export const MAKE_OPEN_MODEL_TO_FALSE = 'MAKE_OPEN_MODEL_TO_FALSE';
export const SEARCH_TRIP_REQUESTS_FAIL = 'SEARCH_TRIP_REQUESTS_FAIL';

config();
export const getTripRequests = props => async dispatch => {
	const Token = `Bearer ${localStorage.getItem('token')}`;
	const headers = {
		'Content-Type': 'application/json',
		token: Token,
	};
	try {
		const results = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/?page=${props.page}&limit=${props.limit}`,
			{ headers },
		);
		dispatch({
			type: GET_TRIP_REQUESTS_SUCCESS,
			tripRequests: results.data.data,
		});
	} catch (error) {
		dispatch({ type: GET_TRIP_REQUESTS_FAIL, tripRequestsError: true });
	}
};
export const SearchTripRequests = e => async dispatch => {
	const Token = `Bearer ${localStorage.getItem('token')}`;
	const headers = {
		'Content-Type': 'application/json',
		token: Token,
	};
	try {
		const results = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/search?keyword=${e.target.value}&searchType=managerId&page=1&limit=10`,
			{ headers },
		);
		const data = {
			count: results.data.data.length,
			requestTrips: results.data.data,
		};

		dispatch({
			type: GET_TRIP_REQUESTS_SUCCESS,
			tripRequests: data,
		});
	} catch (error) {
		dispatch({ type: SEARCH_TRIP_REQUESTS_FAIL, searchError: true });
	}
};

export const editTripRequestStatus = (
	status,
	tripID,
	tripRequests,
) => async dispatch => {
	const Token = `Bearer ${localStorage.getItem('token')}`;
	const headers = {
		'Content-Type': 'application/json',
		token: Token,
	};
	try {
		const results = await axios.patch(
			`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${tripID}`,
			{ status: status },
			{ headers },
		);

		dispatch({
			type: EDIT_TRIPREQUEST_STATUS_SUCCESS,
			successMessage: true,
			message: results.data.message,
		});
		dispatch(updateTripRequestStatus(tripRequests, tripID, status));
	} catch (error) {
		dispatch({
			type: EDIT_TRIPREQUEST_STATUS_FAIL,
			errorMessage: true,
			message: error.message,
		});
	}
};

export const setSelectedTripRequestAction = props => async dispatch => {
	dispatch({ type: SET_SELLECTED_TRIP, payload: props });
};

export const closeErrorMessageAlert = () => async dispatch => {
	dispatch({
		type: MAKE_OPEN_MODEL_TO_FALSE,
		successMessage: false,
		errorMessage: false,
	});
};
export const updateTripRequestStatus = (
	tripRequests,
	tripID,
	status,
) => async dispatch => {
	tripRequests.map((tripRequest, index) => {
		tripRequest.map(trip => {
			if (trip.id === tripID) {
				trip.status = status;
			}
		});
	});
	dispatch({
		type: GET_TRIP_REQUESTS_SUCCESS,
		tripRequests: tripRequests,
	});
};
