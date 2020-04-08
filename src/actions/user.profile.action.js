import React from 'react';
import axios from 'axios';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const UPLOAD_IMAGE_SUCCESS = 'UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_FAIL = 'UPLOAD_IMAGE_FAIL';
export const CHANGE_STATE = 'CHANGE_STATE';
export const HTTP_REQUEST_START = 'HTTP_REQUEST_START';
export const CANCEL_USER_UPDATE = 'CANCEL_USER_UPDATE';
export const ERROR_UPLOAD_IMAGE = 'ERROR_UPLOAD_IMAGE';

export const GetUserProfile = () => async dispatch => {
	const userToken = `Bearer ${localStorage.getItem('token')}`;

	const headers = {
		'Content-Type': 'application/json',
		token: userToken,
	};
	const profileImage = process.env.DEFAULT_PROFILE_IMAGE_URL;
	await axios
		.get(`${process.env.BACKEND_BASE_URL}/api/v1/auth/profile`, { headers })
		.then(res => {
			const userProfile = res.data;

			(userProfile.data.birthdate = userProfile.data.birthdate
				? userProfile.data.birthdate.split('T')[0]
				: ''),
				(userProfile.data.profileImage = userProfile.data.profileImage
					? userProfile.data.profileImage
					: profileImage),
				(userProfile.data.birthdate =
					userProfile.data.birthdate == '1719-01-01'
						? ''
						: userProfile.data.birthdate);

			dispatch({
				type: GET_USER_PROFILE,
				userProfileInfo: userProfile,
			});
		});
};

export const uploadNewImageOnCloud = data => async dispatch => {
	const loadingImage = process.env.PROFILE_LOADER_URL;
	const LoaderURL = { profileImage: loadingImage };
	dispatch({
		type: HTTP_REQUEST_START,
		attribute: LoaderURL,
	});

	await axios
		.post(process.env.CLOUDINARY_URL, data)
		.then(async res => {
			const imageURL = { profileImage: res.data.secure_url };
			dispatch({
				type: UPLOAD_IMAGE_SUCCESS,
				attribute: imageURL,
			});
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

export const updateUserProfile = data => async dispatch => {
	const userToken = `Bearer ${localStorage.getItem('token')}`;

	const headers = {
		'Content-Type': 'application/json',
		token: userToken,
	};
	data.birthdate = data.birthdate ? data.birthdate : '1719-01-01';
	await axios
		.patch(`${process.env.BACKEND_BASE_URL}/api/v1/auth/profile`, data, {
			headers,
		})
		.then(async res => {
			const response = res.data
				? res.data
				: { data: { errorMessage: 'Update fail please try again' } };
			response.data.updateStatus = 'true';
			response.data.errorMessage = false;
			dispatch({
				type: UPDATE_USER_PROFILE,
				updatedProfile: response.data,
			});
		});
};

export const changeAttribute = data => dispatch => {
	dispatch({
		type: CHANGE_STATE,
		attribute: data,
	});
};

export const cancelUserUpdate = () => dispatch => {
	dispatch({
		type: CANCEL_USER_UPDATE,
	});
};
