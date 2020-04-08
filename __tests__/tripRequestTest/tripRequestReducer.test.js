import tripRequestReducer from '../../src/reducers/tripRequestReducer';
describe('Trip Request reducer test ', () => {
	it('should return success message when trip successfully created', () => {
		const action = {
			type: 'REQUEST_TRIP_SUCCESS',
			message: 'trip has been successfully created',
			payload: true,
		};
		const initialState = {
			error: '',
			message: 'trip has been successfully created',
			tripCreated: true,
		};
		expect(tripRequestReducer({}, action)).toEqual(initialState);
	});
	it('should return error when trip is not created', () => {
		const action = {
			type: 'REQUEST_TRIP_FAILURE',
			payload: 'error',
			message: 'error',
		};
		const initialState = {
			error: 'error',
			message: 'error',
			tripCreated: '',
		};
		expect(tripRequestReducer({}, action)).toEqual(initialState);
	});

	it('should return all supported locations', () => {
		const action = { type: 'GET_LOCATIONS' };
		const initialState = {};
		expect(tripRequestReducer({}, action)).toEqual(initialState);
	});
	it('should return all Accommodation facilities located in user destination', () => {
		const action = { type: 'GET_ACCOMODATION_SUCCESS' };
		const initialState = {};
		expect(tripRequestReducer({}, action)).toEqual(initialState);
	});
});
