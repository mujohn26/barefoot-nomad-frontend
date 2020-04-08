export const USER_LOGOUT = 'USER_LOGOUT';

export function logout() {
	localStorage.removeItem('token');
	return { type: USER_LOGOUT };
}
