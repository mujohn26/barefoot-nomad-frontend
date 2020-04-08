import userDashboardReducer from '../../../src/reducers/dashboardReducer';
import {
	getMostTraveledDestinations,
} from '../../../__mockData__/dashboard.mock.data';

describe('User dashboard  Reducer', () => {
	it('Should  get destinations', () => {
		const getState = userDashboardReducer({}, getMostTraveledDestinations);
		expect(getState).toEqual({
			locations: getMostTraveledDestinations.payload,
	
		});
	});

});
