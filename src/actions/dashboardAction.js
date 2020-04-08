export const GET_MOST_TRAVELED_DESTINATION = 'GET_MOST_TRAVELED_DESTINATION';


import axios from 'axios';

export const getMostTraveledDestinations = () => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	const localStorageData = localStorage.getItem('token');
	const token = `Bearer ${localStorageData}`;
	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};
	try {
		const destinations = await axios.get(
			'https://blackninjas-backend-staging.herokuapp.com/api/v1/locations/most-travelled',
			{ headers },
        );
		dispatch(getDestinations(destinations.data.data));
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {}
};

export function getDestinations(data) {
	return {
		type: GET_MOST_TRAVELED_DESTINATION,
		payload: data,
	};
}
