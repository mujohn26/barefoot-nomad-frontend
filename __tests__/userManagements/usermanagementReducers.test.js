import reducer from '../../src/reducers/userManagementReducers';
import * as types from '../../src/actions/userManagementAction';
import expect from 'expect';

describe('user management reducers tests', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			userData: [],
			managerData: [],
			previousUserData: [],
			cancelledUpdateManagers: [],
		});
	});
	it('should handle USER_MANAGER action', () => {
		const userAction = {
			type: 'USER_MANAGER',
		};
		expect(reducer({}, userAction)).toEqual({});
	});
	it('should handle GET_MANAGERS', () => {
		const managerAction = {
			type: 'GET_MANAGERS',
		};
		expect(reducer({}, managerAction)).toEqual({});
	});
	it('should handle UPDATE_USERS_MANAGERS', () => {
		const updateUserManagerAction = {
			type: 'UPDATE_USERS_MANAGERS',
		};
		expect(reducer({}, updateUserManagerAction)).toEqual({});
	});
	it('should handle ON_CHANGE action', () => {
		const onChangeManagerAction = {
			type: 'ON_CHANGE',
		};
		expect(reducer({}, onChangeManagerAction)).toEqual({});
	});
});
