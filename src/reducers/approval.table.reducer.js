const initialState = {
	tripRequests: [],
	trip: [],
	count: 0,
	tripRequestsError: '',
	successMessage: false,
	errorMessage: false,
	message: '',
	searchError: false,
};
const approvalsTableReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_TRIP_REQUESTS_SUCCESS':
			const data = action.tripRequests.requestTrips;
			return {
				...state,
				tripRequests: [...data],
				tripRequestsError: '',
				count: action.tripRequests.count,
				searchError: false,
			};
		case 'GET_TRIP_REQUESTS_FAIL':
			return {
				...state,
				tripRequestsError: action.tripRequestsError,
			};
		case 'SEARCH_TRIP_REQUESTS_FAIL':
			return {
				...state,
				searchError: action.searchError,
			};
		case 'SET_SELLECTED_TRIP':
			return {
				...state,
				trip: action.payload,
			};
		case 'EDIT_TRIPREQUEST_STATUS_SUCCESS':
			return {
				...state,
				successMessage: action.successMessage,
				message: action.message,
			};
		case 'EDIT_TRIPREQUEST_STATUS_FAIL':
			return {
				...state,
				errorMessage: action.errorMessage,
				message: action.message,
			};
		case 'MAKE_OPEN_MODEL_TO_FALSE':
			return {
				...state,
				successMessage: action.successMessage,
				errorMessage: action.errorMessage,
				message: '',
			};
		default:
			return state;
	}
};
export default approvalsTableReducer;
