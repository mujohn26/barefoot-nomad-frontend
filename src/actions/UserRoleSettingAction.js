export const GET_USERS = 'GET_USERS';
export const SETTING_ROLES_SUCESS = 'SETTING_ROLES';
export const SETTING_ROLES_FAILURE = 'SETTING_FAILURE';
export const GET_ONE_UPDATE = 'GET_ONE_UPDATE';
export const CANSEL_USERS_INFO = 'CANSEL_USERS_INFO';

import axios from 'axios';
import { log } from 'util';

export const getUsers = () => async dispatch => {
	dispatch({ type: 'LOADING_DATA', payload: true });
	const localStorageData = localStorage.getItem('token');
	const token = `Bearer ${localStorageData}`;
	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};
	try {
		const users = await axios.get(
			'https://blackninjas-backend-staging.herokuapp.com/api/v1/users',
			{ headers },
		);
		dispatch(getUsersAction(users.data.data.rows));
		dispatch({ type: 'LOADING_DATA', payload: false });
		return users.data.data.rows;
	} catch (error) { }
};
export const updateUserRole = ({ userId, role }) => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	const localStorageToken = localStorage.getItem('token');
	const token = `Bearer ${localStorageToken}`;
	const headers = {
		'Content-Type': 'application/json',
		token: token,
	};

	try {
		const roles = [];
		const response = await axios.patch(
			`https://blackninjas-backend-staging.herokuapp.com/api/v1/users/${userId}/settings`,
			{ role },
			{ headers },
		);
		roles.push({ userId: userId, role: response.data.data.role });
		dispatch(updateRoleSucess(roles));
		dispatch({ type: 'LOADING', payload: false });
	} catch (error) {
		dispatch(updateRoleFailure(error.response.data.error));
		dispatch({ type: 'LOADING', payload: false });
	}
};

export function getUsersAction(data) {
	return {
		type: GET_USERS,
		payload: data,
	};
}
export function updateRoleSucess(roles) {
	return {
		type: SETTING_ROLES_SUCESS,
		role: roles,
	};
}
export function updateRoleFailure(error) {
	return {
		type: SETTING_ROLES_FAILURE,
		updateErrorMessage: error,
	};
}
export const updateOneUser = (userInfo, allUsers) => dispatch => {
	allUsers.map(user => {
		if (user.id === userInfo.id) {
			user.role = userInfo.role;
		}
	});
	dispatch({
		type: GET_ONE_UPDATE,
		updatedUsers: allUsers,
	});
};
