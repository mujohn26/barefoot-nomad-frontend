import axios from 'axios';
export const REQUEST_TRIP_SUCCESS = 'REQUEST_TRIP_SUCCESS';
export const REQUEST_TRIP_FAILURE = 'REQUEST_TRIP_FAILURE';
export const GET_LOCATIONS = 'GET_LOCATIONS';
export const GET_ACCOMODATION_SUCCESS = 'GET_ACCOMODATION_SUCCESS';
export const GET_ACCOMODATION_FAILURE = 'GET_ACCOMODATION_FAILURE';
import { config } from 'dotenv';

config();

const userToken = `Bearer ${localStorage.getItem('token')}`;

const headers = {
	'Content-Type': 'application/json',
	token: userToken,
};
export const requestTrip = data => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	return await axios
		.post(`${process.env.BACKEND_BASE_URL}/api/v1/trips`, data, { headers })
		.then(response => {
			const trip_request = response.data.data;
			dispatch({ type: 'LOADING', payload: false });
			dispatch(success(trip_request));
		})
		.catch(error => {
			const errorData = error.response.data;
			dispatch({ type: 'LOADING', payload: false });
			dispatch(failure(errorData));
		});
};

export const editTripRequest = (data, tripId) => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	return await axios
		.patch(`${process.env.BACKEND_BASE_URL}/api/v1/trips/${tripId}`, data, {
			headers,
		})
		.then(response => {
			const trip_request = response.data.data;
			dispatch({ type: 'LOADING', payload: false });
			dispatch({
				type: REQUEST_TRIP_SUCCESS,
				payload: trip_request,
				message: 'Trip request has been successfully edited',
			});
		})
		.catch(error => {
			const errorData = error.response.data;
			dispatch({ type: 'LOADING', payload: false });
			dispatch({
				type: REQUEST_TRIP_FAILURE,
				payload: errorData,
				message:
					'Trip cannot be edited at moment, check provided info and Try Again !!',
			});
		});
};

export const GetLocations = () => async dispatch => {
	await axios
		.get(`${process.env.BACKEND_BASE_URL}/api/v1/locations`, {
			headers,
		})
		.then(response => {
			const data = response.data.data;
			dispatch({ type: 'GET_LOCATIONS', locationsInfo: data });
		});
};

export const GetAccomodations = destination => dispatch => {
	return axios
		.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/located/${destination}`,
			{
				headers,
			},
		)
		.then(response => {
			const accommodations = response.data.data;
			if (accommodations.length > 0) {
				dispatch({
					type: 'GET_ACCOMODATION_SUCCESS',
					accommodations: accommodations,
				});
			} else {
				dispatch({ type: 'GET_ACCOMODATION_SUCCESS', accommodations: false });
			}
		});
};

export const success = request => {
	return {
		type: REQUEST_TRIP_SUCCESS,
		payload: request,
		message: 'Trip request has been successfully created',
	};
};

export const failure = error => {
	return {
		type: REQUEST_TRIP_FAILURE,
		payload: error,
		message: 'Trip cannot be created, check provided info and Try Again !!',
	};
};
