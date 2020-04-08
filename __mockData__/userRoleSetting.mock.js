import {GET_USERS,SETTING_ROLES_SUCESS,SETTING_ROLES_FAILURE} from '../src/actions/UserRoleSettingAction';

export const props = {
	result: 
			  [
				{
					id: 2,
					firstName: 'john',
					lastName: 'rukundi',
					email: 'mujohn26@gmail.com',
					role: 'manager',
					createdAt: '2020-01-28T10:46:00.472Z',
					updatedAt: '2020-02-19T18:37:03.240Z',
				},
			 ],
	
	isLoading: false,
	role:'manager',
	classes: {
		paper: '',
	},
user:{
	payload:{
		role:'admin'
	}
},
	handleClick: jest.fn(),
	handleCancel: jest.fn(),
	shouldBeDisabled: jest.fn(),
	handleChangePage: jest.fn(),
	handleChangeRowsPerPage: jest.fn(),
	componentDidUpdate: jest.fn(),
	getUsers: jest.fn(),
	updateUserRole:jest.fn(),
	updateOneUser:jest.fn()
};

export const getUsersAction = {
	type: GET_USERS,
	payload: [
		{
			id: 6,
			firstName: 'murengezi',
			lastName: 'pierre',
			email: 'ericshema14@gmail.com',
			role: 'requester',
			createdAt: '2020-01-28T10:46:00.472Z',
			updatedAt: '2020-02-19T21:12:35.403Z',
		},
		{
			id: 7,
			firstName: 'murengezi',
			lastName: 'pierre',
			email: 'ericshema144@gmail.com',
			role: 'requester',
			createdAt: '2020-01-28T10:46:00.472Z',
			updatedAt: '2020-02-19T21:12:35.403Z',
		}
	]
  };
  export const updateUserRolesSuccess = {
	type:SETTING_ROLES_SUCESS,
	role: [{userId:12,role:'manager'},{userId:16,role:'requester'}]
  };

  export const updateUserRolesSuccessError = {
	type:SETTING_ROLES_FAILURE,
	updateErrorMessage: 'we dont have that role'
  };
  export const isLoadingAction = {
	type: 'LOADING',
	isLoading:true
  };
  export const isLoadingDataAction = {
	type: 'LOADING_DATA',
	isLoadingData:true
  };
  export const updatingOneUser = {
	type: 'GET_ONE_UPDATE',
	updatedUsers: [{id:3,role:'manager'},{id:5,role:'requester'},{id:15,role:'admin'}]
  };