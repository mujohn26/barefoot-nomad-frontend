import React from 'react';
import { shallow } from 'enzyme';
import {
	TopNavBar,
	mapStateToProps,
} from '../../../../src/components/profile/top.nav.bar';
import { props } from '../../../../__mockData__/notification.mock.data';

describe('Top navigation bar component', () => {
	it('should handle mapStateToProps successfully', () => {
		const initState = {
			NotificationReducer: {
				Notifications: [],
				markNotificationAsRead: [],
				limitNumber: [10],
				notificationPaneHeight: [500],
				viewButton: [true],
				buttonTitle: 'more',
			},
		};
		expect(mapStateToProps(initState)).toBeTruthy();
	});

	it('should render the top navigation bar  component successfully', () => {
		const wrapper = shallow(<TopNavBar {...props} />);
		expect(wrapper).toMatchSnapshot();
	});
	it('should render notifications', () => {
		const wrapper = shallow(<TopNavBar {...props} />);
		const findNotifications = jest.spyOn(wrapper.instance(), 'count');
		wrapper.instance().count(props.notifications);
		expect(findNotifications).toHaveBeenCalled();
	});
	it('should render notifications which is equal to zero', () => {
		const wrapper = shallow(<TopNavBar {...props} />);
		const findNotifications = jest.spyOn(wrapper.instance(), 'count');
		wrapper.instance().count(props.notification);
		expect(findNotifications).toHaveBeenCalled();
	});
	it('should render notifications greater than nine', () => {
		const wrapper = shallow(<TopNavBar {...props} />);
		const findNotifications = jest.spyOn(wrapper.instance(), 'count');
		wrapper.instance().count(props.notificationGreaterThanNine);
		expect(findNotifications).toHaveBeenCalled();
	});
});
