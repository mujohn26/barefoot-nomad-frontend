export const GET_ACCOMMODATION_SUCCES = 'GET_ACCOMMODATION';
export const GET_LOCATIONS_SUCCES = 'GET_LOCATIONS';
export const CREATE_ACCOMMODATION_SUCCES = 'CREATE_ACCOMMODATION';
export const GET_ACCOMMODATION_TYPES_SUCCES = 'GET_ACCOMMODATION_TYPES';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_ROOM_IMAGE_SUCCESS = 'UPLOAD_ROOM_IMAGE';
export const ERROR_UPLOAD_IMAGE = 'ERROR_UPLOAD_IMAGE';
export const GET_CARD_CLICKED = 'GET_CARD_CLICKED';

import axios from 'axios';

export const getAccommodations = () => async dispatch => {
	dispatch({ type: 'LOADING_DATA', payload: true });
	const localStorageData = localStorage.getItem('token');

	const token = `Bearer ${localStorageData}`;

	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};
	try {
		const accommodations = await axios.get(
			'https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodations',
			{ headers },
		);
		dispatch(getAccommodationsSuccess(accommodations.data.data.rows));
		dispatch({ type: 'LOADING_DATA', payload: false });
	} catch (error) {
		dispatch({ type: 'GET_ACCOMODATION_ERROR', payload: error});
	}
};

export const getLocations = () => async dispatch => {
	dispatch({ type: 'LOADING_DATA', payload: true });
	const localStorageData = localStorage.getItem('token');

	const token = `Bearer ${localStorageData}`;

	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};
	try {
		const locations = await axios.get(
			'https://blackninjas-backend-staging.herokuapp.com/api/v1/locations',
			{ headers },
		);
		dispatch(getlocationsSuccess(locations.data.data));
		dispatch({ type: 'LOADING_DATA', payload: false });
	} catch (error) {}
};

export const getAccommodationType = () => async dispatch => {
	dispatch({ type: 'LOADING_DATA', payload: true });
	const localStorageData = localStorage.getItem('token');

	const token = `Bearer ${localStorageData}`;

	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};
	try {
		const accommodationTypes = await axios.get(
			'https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodationType',
			{ headers },
		);
		dispatch(getaccommodationTypesSuccess(accommodationTypes.data.data));
		dispatch({ type: 'LOADING_DATA', payload: false });
	} catch (error) {}
};

export const createAccomodationFacility = data => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	const localStorageToken = localStorage.getItem('token');

	const token = `Bearer ${localStorageToken}`;
	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};

	try {
		const response = await axios.post(
			`https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodations`,
			data,
			{ headers },
		);

		dispatch(createAccommodationSuccess(response.data.message));
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		dispatch({ type: 'LOADING', payload: false });
		dispatch({ type: 'CREATE_ACCOMODATION_ERROR', payload: error});
	}
};

export const uploadNewImageOnCloud = (data,index) => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });

	await axios
	.post('https://api.cloudinary.com/v1_1/dby88h516/image/upload', data)
	.then(async res => {
		const imageURL = { key:index,imageUrl: res.data.secure_url };
		dispatch({
			type: UPLOAD_IMAGE_SUCCESS,
			attribute: imageURL,
		});
			dispatch({ type: 'LOADING', payload: false });
		})
		.catch(error => {
			const errorData = {
				errorMessage: 'Fail to upload image please try again',
				updateStatus: false,
			};
			dispatch({
				type: ERROR_UPLOAD_IMAGE,
				attribute: errorData,
			});

		});
};

export const uploadNewRoomImageOnCloud = (data, cardId) => async dispatch => {
	await axios
		.post('https://api.cloudinary.com/v1_1/dby88h516/image/upload', data)
		.then(async res => {
			const imageURL = { Image: res.data.secure_url, cardId };
			dispatch({
				type: UPLOAD_ROOM_IMAGE_SUCCESS,
				attribute: imageURL,
			});
			dispatch({ type: 'LOADING', payload: false });
		})
		.catch(error => {
			const errorData = {
				errorMessage: 'Fail to upload image please try again',
				updateStatus: false,
			};
			dispatch({
				type: ERROR_UPLOAD_IMAGE,
				attribute: errorData,
			});
		});
};

export function getAccommodationsSuccess(data) {
	return {
		type: GET_ACCOMMODATION_SUCCES,
		payload: data,
	};
}
export function getlocationsSuccess(data) {
	return {
		type: GET_LOCATIONS_SUCCES,
		payload: data,
	};
}
export function cardClicked(id) {
	return {
		type: GET_CARD_CLICKED,
		payload: id,
	};
}
export function getaccommodationTypesSuccess(data) {
	return {
		type: GET_ACCOMMODATION_TYPES_SUCCES,
		payload: data,
	};
}
export function createAccommodationSuccess(data) {
	return {
		type: CREATE_ACCOMMODATION_SUCCES,
		payload: data,
	};
}
export const handleDeleteAccommodation = data => dispatch =>{
		dispatch({
				type: 'DELETE_ACCOMMODATION_CHIP',
				payload: data
			})
		} 