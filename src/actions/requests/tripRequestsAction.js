import axios from 'axios';
import { config } from 'dotenv';
config();
export const getUserTripRequestsAction = props => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	const token = localStorage.getItem('token');
	try {
		const results = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/trips/my-trip-requests/?page=${props.page}&limit=${props.limit}`,
			{
				headers: {
					'Content-Type': 'application/json',
					token: `Bearer ${token}`,
				},
			},
		);
		dispatch({
			type: 'GET_USER_TRIP_REQUESTS_SUCCESS',
			payload: results.data.data,
		});
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		dispatch({ type: 'GET_USER_TRIP_REQUESTS_FAILED', payload: true });
		dispatch({ type: 'LOADING', payload: false });
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
			`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/search?keyword=${e.target.value}&searchType=userId&page=1&limit=10`,
			{ headers },
		);
		const data = {
			count: results.data.data.length,
			requestTrips: results.data.data,
		};

		dispatch({
			type: 'GET_USER_TRIP_REQUESTS_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({ type: 'SEARCH_TRIP_REQUESTS_FAIL', searchError: true });
		dispatch({ type: 'LOADING', payload: false });
	}
};
export const setSelectedTripRequestAction = props => async dispatch => {
	const token = localStorage.getItem('token');
	dispatch({ type: 'SET_SELLECTED_TRIP', payload: props });
	const results = await axios.get(
		`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${props[0].tripId}/${token}`,
		{
			headers: {
				'Content-Type': 'application/json',
				token: `Bearer ${token}`,
			},
		},
	);
	dispatch({ type: 'SET_TRIP_TO_EDIT', payload: results.data.data.trips });
};
