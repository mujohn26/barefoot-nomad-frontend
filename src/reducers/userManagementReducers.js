const initState = {
	userData: [],
	managerData: [],
	cancelledUpdateManagers: [],
	previousUserData: [],
};
const userManagementReducer = (state = initState, action) => {
	switch (action.type) {
		case 'USER_MANAGER':
			return {
				...state,
				userData: action.payload,
				previousUserData: action.payload,
			};
		case 'GET_MANAGERS':
			return {
				...state,
				managerData: action.payload,
			};
		case 'UPDATE_USERS_MANAGERS':
			return {
				...state,
				updatedData: action.payload,
			};
		case 'ON_CHANGE':
			return {
				...state,
				userData: action.payload,
			};
		default:
			return state;
	}
};
export default userManagementReducer;
