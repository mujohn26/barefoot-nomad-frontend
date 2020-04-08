import axios from 'axios';
export const USER_SIGNIN_SUCCESS = 'USER_SIGNIN_SUCCESS';
export const USER_SIGNIN_FAILURE = 'USER_SIGNIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
import { createBrowserHistory } from 'history';
import { config } from 'dotenv';

config();

export const history = createBrowserHistory({
	forceRefresh: true,
});

export const signIn = (email, password) => async dispatch => {
	dispatch({ type: 'LOADING', payload: true });
	return await axios
		.post(`${process.env.BACKEND_BASE_URL}/api/v1/auth/signin`, {
			email: email,
			password: password,
		})
		.then(response => {
			if (response.data.status === 200) {
				const user = response.data.data;
				localStorage.setItem('token', user);
				dispatch({ type: 'LOADING', payload: false });
				dispatch(success(user));
			}
			return response;
		})
		.catch(error => {
			const errorData = error.response.data;
			dispatch({ type: 'LOADING', payload: false });
			return Promise.reject(dispatch(failure(errorData)));
		});
};

export function success(user) {
	return { type: USER_SIGNIN_SUCCESS, payload: user, isLoading: false };
}

export function failure(error) {
	return { type: USER_SIGNIN_FAILURE, payload: error, isLoading: false };
}
