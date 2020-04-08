const getUserTripRequestsReducer = (
	state = { myTrips: [], trip: [], myTripsCount: 0, searchError: false },
	action,
) => {
	switch (action.type) {
		case 'GET_USER_TRIP_REQUESTS_SUCCESS':
			return {
				...state,
				myTrips: action.payload.requestTrips,
				myTripsCount: action.payload.count,
				searchError: false,
			};
		case 'SET_SELLECTED_TRIP':
			return {
				...state,
				trip: action.payload,
			};
		case 'SET_TRIP_TO_EDIT':
			return {
				...state,
				tripToEdit: action.payload,
			};
		case 'UPDATE_TRIP_BOOKING_INFO':
			return {
				...state,
				myTrips: [
					...state.myTrips.map(item => {
						return item.map(trip => {
							if (trip.id == action.payload.id) {
								trip.accomodation = action.payload.accomodation;
								trip.booking.push(action.payload);
							}
							return trip;
						});
					}),
				],
			};
		case 'SEARCH_TRIP_REQUESTS_FAIL':
			return {
				...state,
				searchError: action.searchError,
			};
		default:
			return state;
	}
};
export default getUserTripRequestsReducer;
