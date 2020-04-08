import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
    AccommodationFacility,
    mapStateToProps
} from '../../../src/views/creating_accommodation_facilities/AccommodationFacility.jsx';
import { props } from '../../../__mockData__/accommodationFacility.mock';
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
	const wrapper = mount(<AccommodationFacility {...props} store={store} />);
	return wrapper;
};
describe('Render get accommodation facilities components', () => {
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
	it('should handle change page', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			page: 2,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChangePage');

		wrapper.instance().handleChangePage();
    });
    it('should handle change row per page', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			rowsPerPage: 5,
			page: 0,
		});
		const mockedEvent = { target: { value: 5 } };
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'handleChangeRowsPerPage',
		);

		wrapper.instance().handleChangeRowsPerPage(mockedEvent);
    });
    

	it('should map state to props', () => {
		expect(mapStateToProps);
		const state = {
			accommodationFacilitiesReducer: {
				accommodations:[
                    {
                       name:'marriot',
                       description:'five star hotel',
                        location:{
                            city:'kigali'
                                },
                       category:'hotel',
                        owner:'John',
                        id:2,
                    }
                ]
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});
