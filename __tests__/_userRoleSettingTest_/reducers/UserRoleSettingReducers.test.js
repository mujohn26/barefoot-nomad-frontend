import userRoleSettingReducer from '../../../src/reducers/UserSettingReducer';
import {
	updateUserRolesSuccess,
	getUsersAction,
	updateUserRolesSuccessError,
	isLoadingAction,
	isLoadingDataAction,
	updatingOneUser,
} from '../../../__mockData__/userRoleSetting.mock';

describe('User role setting  Reducer', () => {
	it('Should  get users', () => {
		const getState = userRoleSettingReducer({}, getUsersAction);
		expect(getState).toEqual({
			users: getUsersAction.payload,
			oldUsersInfo: getUsersAction.payload,
		});
	});
	it('Should  SET ROLES', () => {
		const getState = userRoleSettingReducer({}, updateUserRolesSuccess);
		expect(getState).toEqual({
			role: updateUserRolesSuccess.role,
		});
	});
	it('Should DISPLAY ERROR', () => {
		const getState = userRoleSettingReducer({}, updateUserRolesSuccessError);
		expect(getState).toEqual({
			updateErrorMessage: updateUserRolesSuccessError.updateErrorMessage,
		});
	});
	it('Should  LOADING', () => {
		const getState = userRoleSettingReducer({}, isLoadingAction);
		expect(getState).toEqual({
			IsLoading: isLoadingAction.IsLoading,
		});
	});
	it('Should  LOADING_DATA', () => {
		const getState = userRoleSettingReducer({}, isLoadingDataAction);
		expect(getState).toEqual({
			IsLoading: isLoadingDataAction.IsLoading,
		});
	});
	it('Should  update one user', () => {
		const getState = userRoleSettingReducer({ users: {} }, updatingOneUser);
		expect(getState).toEqual({
            users: {
              '0': { id: 3, role: 'manager' },
              '1': { id: 5, role: 'requester' },
              '2': { id: 15, role: 'admin' }
            }
          }
		);
	});
});
