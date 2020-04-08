import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    GET_MOST_TRAVELED_DESTINATION,
    getMostTraveledDestinations
} from '../../../src/actions/dashboardAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Create user dashboard actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('should get accommodation facility successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'destination successfully',
					data: {
						data: [
							{
                                country: "Congo",
                                city: "Kinshasa",
                                travelledTimes: "7"
							},
						],
					},
				},
			});
		});
		const expectedActions = [
	
			{
				   "payload": true,
				 "type": "LOADING",
			 },
			{
				type: GET_MOST_TRAVELED_DESTINATION,
				payload: 
					{
                        data:[
                            {
                        country: "Congo",
                        city: "Kinshasa",
                        travelledTimes: "7"}
                    ]
					},
				
			},
			{
				"payload": false,
			  "type": "LOADING",
		  }
	
		];
		const store = mockStore({});
		await store.dispatch(getMostTraveledDestinations()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});


});