import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	Dashboard,
	mapStateToProps,
} from '../../../src/views/dashboard/userDashboard.view.jsx';
import { props } from '../../../__mockData__/dashboard.mock.data';
import reducer from '../../../src/reducers/index';


const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<Dashboard {...props} store={store} />);
	wrapper.setState({
lastName:''
	});
	return wrapper;
};
describe('Render user dashboad  components', () => {

    	it('should handle will mount successfully', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'UNSAFE_componentWillMount',
		);
		expect(handleChangeSpy).toBeDefined();
    });
    it('should map state to props', () => {
		expect(mapStateToProps);
		const state = {
			userDashboardReducer: {
				locations: [
					{
                        country: "Congo",
                        city: "Kinshasa",
                        travelledTimes: "7"
					},
				],
		
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});

