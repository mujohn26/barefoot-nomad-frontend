const userSettingReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return {
				...state,
				users: action.payload,
				oldUsersInfo: action.payload,
			};
		case 'GET_ONE_UPDATE':
			return {
				...state,
				users: { ...state.users, ...action.updatedUsers },
			};
		case 'SETTING_ROLES':
			return {
				...state,
				role: action.role,
			};
		case 'SETTING_FAILURE':
			return {
				...state,
				updateErrorMessage: action.updateErrorMessage,
			};
		case 'LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'LOADING_DATA':
			return {
				...state,
				isLoadingData: action.payload,
			};
		default:
			return state;
	}
};
export default userSettingReducer;
