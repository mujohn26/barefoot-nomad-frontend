import axios from 'axios';
import { config } from 'dotenv';
export const USERS_MANAGERS = 'USER_MANAGER';
export const GET_MANAGERS = 'GET_MANAGERS';
export const UPDATE_USERS_MANAGERS = 'UPDATE_USERS_MANAGERS';
export const ON_CHANGE = 'ON_CHANGE';

config();

export const getUsersManagers = (page, rowsPerPage) => async dispatch => {
	try {
		const headers = {
			'Content-type': 'application/json',
			token: `Bearer ${localStorage.getItem('token')}`,
		};
		const users = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/user-managements?page=${page}&limit=${rowsPerPage}`,
			{ headers },
		);
		dispatch(getUsersAction(users.data.data));
		return {
			type: USERS_MANAGERS,
			payload: users.data.data,
		};
	} catch (error) {
		// return error
	}
};
export const getManagers = () => async dispatch => {
	try {
		const headers = {
			'Content-type': 'application/json',
			token: `Bearer ${localStorage.getItem('token')}`,
		};
		const managers = await axios.get(
			`${process.env.BACKEND_BASE_URL}/api/v1/user-managements/managers`,
			{ headers },
		);

		dispatch(getManagersAction(managers.data.data));
	} catch (error) {
		// return error
	}
};
export const updateUserManager = (userId, managerId) => async dispatch => {
	try {
		const headers = {
			'Content-type': 'application/json',
			token: `Bearer ${localStorage.getItem('token')}`,
		};
		const updatedUser = await axios.patch(
			`${process.env.BACKEND_BASE_URL}/api/v1/user-managements/users/${userId}`,
			{ managerId },
			{ headers },
		);
		dispatch(updateUserManagerAction(updatedUser.data));
	} catch (error) {
		// return error
	}
};

export const onChangeState = (users, data) => dispatch => {
	users.map((user) => {
		(user.id === data.id) ? user.manager = data.manager : user.manager = user.manager;
	})

	dispatch({
		type: ON_CHANGE,
		payload: users
	})
}
// action creators
export function getUsersAction(data) {
	return {
		type: USERS_MANAGERS,
		payload: data,
	};
}
export function getManagersAction(data) {
	return {
		type: GET_MANAGERS,
		payload: data,
	};
}
export function updateUserManagerAction(data) {
	return {
		type: UPDATE_USERS_MANAGERS,
		payload: data,
	};
}
