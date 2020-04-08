import tripRequestReducers from '../../src/reducers/trip_requests/tripRequestsReducers';
describe('User trip requests reducer tests', () => {
	it('shoult get all trip requests', () => {
		const result = tripRequestReducers(
			{ myTrips: [], trip: {} },
			{
				type: 'GET_USER_TRIP_REQUESTS_SUCCESS',
				payload: {
					requestTrips: [
						{
							id: 1,
							origin: 'Kigali',
							destination: 'Kincasa',
							tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
							tripTripId: 2,
							tripType: 'one way',
							status: 'pending',
							accomodation: 'fgfghftjghv',
							departureDate: '2020-09-12T00:00:00.000Z',
							returnDate: '2020-02-01T22:00:00.000Z',
							createdAt: '2020-02-19T19:58:30.638Z',
							manager: {
								firstName: 'Dominique',
								lastName: 'Nsengimana',
							},
						},
					],
					count: 1,
				},
			},
		);
		expect(result).toEqual({
			myTrips: [
				{
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'fgfghftjghv',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			],
			trip: {},
			myTripsCount: 1,
			searchError: false,
		});
	});
	it('shoult set selected trip request', () => {
		const result = tripRequestReducers(
			{ myTrips: [], trip: {} },
			{
				type: 'SET_SELLECTED_TRIP',
				payload: {
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'fgfghftjghv',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			},
		);
		expect(result).toEqual({
			myTrips: [],
			trip: {
				id: 1,
				origin: 'Kigali',
				destination: 'Kincasa',
				tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
				tripTripId: 2,
				tripType: 'one way',
				status: 'pending',
				accomodation: 'fgfghftjghv',
				departureDate: '2020-09-12T00:00:00.000Z',
				returnDate: '2020-02-01T22:00:00.000Z',
				createdAt: '2020-02-19T19:58:30.638Z',
				manager: { firstName: 'Dominique', lastName: 'Nsengimana' },
			},
		});
	});
	it('should set trip request to be edited', () => {
		const result = tripRequestReducers(
			{ myTrips: [], tripToEdit: {} },
			{
				type: 'SET_TRIP_TO_EDIT',
				payload: {
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'fgfghftjghv',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			},
		);
		expect(result).toEqual({
			myTrips: [],
			tripToEdit: {
				id: 1,
				origin: 'Kigali',
				destination: 'Kincasa',
				tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
				tripTripId: 2,
				tripType: 'one way',
				status: 'pending',
				accomodation: 'fgfghftjghv',
				departureDate: '2020-09-12T00:00:00.000Z',
				returnDate: '2020-02-01T22:00:00.000Z',
				createdAt: '2020-02-19T19:58:30.638Z',
				manager: { firstName: 'Dominique', lastName: 'Nsengimana' },
			},
		});
	});
	it('shoult return default value', () => {
		const result = tripRequestReducers(
			{ myTrips: [], trip: {} },
			{
				type: 'SET_SELLECTED_TRIPR',
				payload: {
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'fgfghftjghv',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			},
		);
		expect(result).toEqual({ myTrips: [], trip: {} });
	});
	it('shoult update trip request', () => {
		const result = tripRequestReducers(
			{
				myTrips: [
					[
						{
							id: 1,
							origin: 'Kigali',
							destination: 'Kincasa',
							tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
							tripTripId: 2,
							tripType: 'one way',
							status: 'pending',
							accomodation: 'fgfghftjghv',
							departureDate: '2020-09-12T00:00:00.000Z',
							returnDate: '2020-02-01T22:00:00.000Z',
							createdAt: '2020-02-19T19:58:30.638Z',
							manager: {
								firstName: 'Dominique',
								lastName: 'Nsengimana',
							},
							booking: [],
						},
					],
				],
				trip: {},
			},
			{
				type: 'UPDATE_TRIP_BOOKING_INFO',
				payload: {
					id: 1,
					accomodation: 'fgfghftjghv',
					name: 'kdkkd',
					roomid: 324,
				},
			},
		);
		expect(result).toEqual({
			myTrips: [
				[
					{
						id: 1,
						origin: 'Kigali',
						destination: 'Kincasa',
						tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
						tripTripId: 2,
						tripType: 'one way',
						status: 'pending',
						accomodation: 'fgfghftjghv',
						departureDate: '2020-09-12T00:00:00.000Z',
						returnDate: '2020-02-01T22:00:00.000Z',
						createdAt: '2020-02-19T19:58:30.638Z',
						manager: {
							firstName: 'Dominique',
							lastName: 'Nsengimana',
						},
						booking: [
							{
								id: 1,
								accomodation: 'fgfghftjghv',
								name: 'kdkkd',
								roomid: 324,
							},
						],
					},
				],
			],
			trip: {},
		});
	});

	it('search should fail to get trip request', () => {
		const getState = tripRequestReducers(
			{ myTrips: [], searchError: false },
			{ type: 'SEARCH_TRIP_REQUESTS_FAIL', searchError: true },
		);
		console.log('getState:', getState);

		expect(getState).toEqual({ myTrips: [], searchError: true });
	});
});
