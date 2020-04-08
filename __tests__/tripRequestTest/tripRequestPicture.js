import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	AdsPictures,
	mapStateToProps,
} from '../../src/components/trip-request/adsPictures.jsx';
import { props } from '../../__mockData__/tripRequest-mock-data';
import reducer from '../../src/reducers/index';
import { Provider } from 'react-redux';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const initialSetUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(
		<Provider store={store}>
			<AdsPictures {...props} />
		</Provider>,
	);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<AdsPictures {...props} store={store} />);
	return wrapper;
};
describe('Accommodation Information component tests', () => {
	it('should count div used in component', () => {
		const wrapper = setUpComponent();
		expect(wrapper.find('div').length).toBe(3);
	});
	it('should simulate the change of active card successfully', () => {
		const component = initialSetUp();
		component
			.find('r')
			.at(1)
			.props()
			.requestToChangeActive(1);
	});
	it('should simulate onclick on accomodation card successfully', () => {
		const component = initialSetUp();
		component
			.find('ForwardRef(Card)')
			.at(1)
			.props()
			.onClick();
	});
	it('should handle onclick successfully on accomodation info card. when creating multi city trip request', () => {
		const component = setUpComponent();
		component.setProps({
			index: 1,
		});
		component
			.find('WithStyles(ForwardRef(Card))')
			.at(1)
			.props()
			.onClick();
		expect(component.state('accommodationId')).toEqual(true);
	});
	it('should map state to props', () => {
		const state = props;
		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});
