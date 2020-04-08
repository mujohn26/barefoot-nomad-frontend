let user = localStorage.getItem('user');
const initialState = user ? { loggedIn: true, user } : {};

const signInReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_SIGNIN_SUCCESS':
			return {
				...state,
				loggedIn: true,
				user: action.payload,
				isLoading: false,
			};
		case 'USER_SIGNIN_FAILURE':
			return {
				...state,
				error: action.payload,
				isLoading: false,
			};
		case 'USER_LOGOUT':
			return {
				...state,
			};
		default:
			return state;
	}
};
export default signInReducer;
