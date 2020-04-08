export const userManagementProps = {
	userData: [
		{
			id: 3,
			firstName: 'benit',
			lastName: 'havuga',
			email: 'mujohn25@gmail.com',
			role: 'requester',
			manager: 'London Steff',
		},
	],
	managerData: [
		{
			id: 10,
			firstName: 'john',
			lastName: 'rukundi',
		},
	],
	handleCancel: jest.fn(),
	handleChangePage: jest.fn(),
	handleChangeRowsPerPage: jest.fn(),
	getOptionLabel: jest.fn(),
};
