import React from 'react';
import { mount, shallow } from 'enzyme';
import MainLayout from '../src/layouts/main.layout.jsx';
import { handleDrawerToggle } from '../src/layouts/main.layout.jsx';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../src/reducers/main_layout/main.layout.reducer';
const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<MainLayout store={store} />);
	return wrapper;
};
const setUpComponent = (
	initialState = {
		mainLauyoutReducer: { title: '' },
		NotificationReducer: { Notifications: '' },
		userProfileReducer: { UpdateduserProfileInfo: {} },
		userDashboardReducer: { locations: '' },
		tripStatisticsReducer: { statistics: '' },
	},
) => {
	const store = testStore(initialState);
	const wrapper = mount(
		<Provider store={store}>
			<MainLayout props={{ title: '', container: '' }} />
		</Provider>,
	);
	return wrapper;
};

describe('Render main layout', () => {
	it('should render main layout successfully', () => {
		localStorage.setItem(
			'token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoiam9qb2theWluYW11cmFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiSm9yZGFuIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjl9LCJpYXQiOjE1ODEwMDAzNjQsImV4cCI6OTU4MTA4Njc2NH0.uVWJp20_o2EvZbqMOewulZS3aFcZHbZaPZGYppXsCxk',
		);
		const wrapper = setUpComponent();

		const IconButton = wrapper
			.find('#IconButton')
			.first()
			.simulate('click');
		const Drawer = wrapper
			.find('#Drawer')
			.first()
			.simulate('close');
		const Route = wrapper.find('Route');
		expect(wrapper.find('div').length).toBe(70);
		expect(wrapper.find('main').length).toBe(1);
		expect(wrapper.find('Switch').length).toBe(1);
		expect(wrapper.find('Route').length).toBeGreaterThan(0);
	});
});
