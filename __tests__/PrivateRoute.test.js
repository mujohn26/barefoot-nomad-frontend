import React from 'react';
import { mount, shallow } from 'enzyme';
import { PrivateRoute } from '../src/components/auth/ProtectedRoute.jsx';
import MainLayout from '../src/layouts/main.layout';
import mockData from '../__mockData__/PrivateRoute.mock';
import verifyToken from '../src/helpers/verifyToken.js';

const getToken = () => {
	return mockData.token;
};
const getTokenExpired = () => {
	return mockData.expiredToken;
};
describe('Private Route tests', () => {
	it('should mount the Private Route component', () => {
		const wrapper = mount(
			<PrivateRoute path='/' exact component={MainLayout} />,
		);
		jest.mock('jwt-decode');
		const mock = verifyToken(getTokenExpired());
		expect(mock).toBeFalsy();
		expect(wrapper.find('Route').length).toBe(1);
	});
	it('should be true if token is valid', () => {
		const wrapper = mount(
			<PrivateRoute path='/' exact component={MainLayout} />,
		);
		jest.mock('jwt-decode');
		const mock = verifyToken(getToken());
		expect(mock).toBeTruthy();
		expect(wrapper.find('Route').length).toBe(1);
	});
});
