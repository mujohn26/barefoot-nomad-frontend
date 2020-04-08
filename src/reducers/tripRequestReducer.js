const initialState = {
	tripInfo: {
		departure: '',
		destination: '',
		departureDate: '',
		accommodationId: '',
		returnDate: '',
		reasons: '',
		type: '',
		updateStatus: '',
		errorMessage: '',
	},
	locationsInfo: [
		{
			country: '',
			city: '',
		},
	],
};
const tripRequestReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_TRIP_SUCCESS':
			return {
				...state,
				tripCreated: action.payload,
				error: '',
				message: action.message,
			};
		case 'REQUEST_TRIP_FAILURE':
			return {
				...state,
				error: action.payload,
				tripCreated: '',
				message: action.message,
			};
		case 'GET_LOCATIONS':
			return {
				...state,
				locationsInfo: action.locationsInfo,
			};
		case 'GET_ACCOMODATION_SUCCESS':
			return {
				...state,
				accommodations: action.accommodations,
			};
		default:
			return state;
	}
};
export default tripRequestReducer;
