const userDashboardReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_MOST_TRAVELED_DESTINATION':
			return {
				...state,
				locations: action.payload,

			};
			case 'LOADING':
					return {
						...state,
						isLoading: action.payload,
					};

		default:
			return state;
	}
};
export default userDashboardReducer;
