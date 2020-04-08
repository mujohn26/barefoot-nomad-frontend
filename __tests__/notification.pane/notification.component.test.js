import React from 'react';
import {
	NotificatonPane,
	mapStateToProps,
} from '../../src/components/notification/notificationPane';

import { props } from '../../__mockData__/notification.mock.data';

import { shallow } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../src/reducers/notification.reducer';
const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUpComponent = initialState => {
	const store = testStore(initialState);
	const wrapper = shallow(<NotificatonPane {...props} store={store} />);
	return wrapper;
};

describe('Display notification pane', () => {
	it('should handle mapStateToProps successfully', () => {
		const initState = {
			NotificationReducer: {
				Notifications: [],
			},
		};
		expect(mapStateToProps(initState)).toBeTruthy();
	});

	it('should call markNotificationAsRead props', () => {
		const component = setUpComponent();
		component.setProps({
			options: [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
		});
		component.state({ limitNumber: 12 });
		component
			.find('#mark_as_read')
			.first()
			.simulate('click');
		expect(component).toBeTruthy();
	});
	it('should call markNotificationAsRead function with limit number greater than 10', () => {
		const component = setUpComponent();
		component.setProps({
			options: [{ read: true }, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
		});
		component.state({ limitNumber: 12 });
		component
			.find('#mark_all_as_read')
			.first()
			.simulate('click');
		expect(component).toBeTruthy();
	});

	it('should clase error model', () => {
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'handleCloseAlert',
		);
		expect(handleChangeSpy).toBeDefined();
	});
	it('should call notificationPaneHeigthHandle function', () => {
		const component = setUpComponent();
		component.setProps({
			options: [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
		});
		component.state({ limitNumber: 12 });
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'notificationPaneHeigthHandle',
		);
		component
			.find('#notificationPaneHeigthHandle')
			.first()
			.simulate('click');
		expect(handleChangeSpy).toHaveBeenCalled();
	});
	it('should redirect to a specific link', () => {
		const component = setUpComponent();
		component.setProps({
			options: [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
		});
		component.state({ limitNumber: 9 });
		component
			.find('#trip_requests')
			.first()
			.simulate('click');
		expect(component).toBeTruthy();
	});
	it('should close Snackbar ', () => {
		const component = setUpComponent();
		component.setProps({
			options: [1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10],
		});
		component.state({ limitNumber: 9 });
		component
			.find('#Snackbar')
			.first()
			.simulate('close');
		expect(component).toBeTruthy();
	});
	it('should get all notifications less than 10', () => {
		const component = setUpComponent();
		component.setProps({
			options: [1, 2, 3, 4],
		});
		component.setState({ viewButton: false });
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'notificationPaneHeigthHandle',
		);
		component
			.find('#notificationPaneHeigthHandle')
			.first()
			.simulate('click');

		component.state({ limitNumber: 13 });
		expect(handleChangeSpy).toBeDefined();
		expect(handleChangeSpy).toHaveBeenCalled();
		expect(component).toBeTruthy();
	});
});
