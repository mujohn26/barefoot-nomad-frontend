import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as actions from '../../src/actions/userManagementAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User managements actions', () => {
	beforeEach(function () {
		moxios.install();
	});

	afterEach(function () {
		moxios.uninstall();
	});

	it('should fetch users and their managers', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						data: {
							id: 3,
							firstName: 'benit',
							lastName: 'havuga',
							email: 'mujohn25@gmail.com',
							role: 'requester',
							manager: 'London Steff',
						},
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'USER_MANAGER',
				payload: {
					data: {
						id: 3,
						firstName: 'benit',
						lastName: 'havuga',
						email: 'mujohn25@gmail.com',
						role: 'requester',
						manager: 'London Steff',
					},
				},
			},
		];
		const store = mockStore({ userData: {} });
		return store.dispatch(actions.getUsersManagers(1, 5)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	it('should handle change state', () => {
		const expectedActions = [
			{
				type: 'ON_CHANGE',
				payload: {
					data: {
						id: 3,
						firstName: 'benit',
						lastName: 'havuga',
						email: 'mujohn25@gmail.com',
						role: 'requester',
						manager: 'London Steff',
					},
				},
			},
		];
		const store = mockStore({});
		store.dispatch(actions.onChangeState([{
			id: 3,
			firstName: 'benit',
			lastName: 'havuga',
			email: 'mujohn25@gmail.com',
			role: 'requester',
			manager: 'London Steff',
		}], {
			id: 3,
			firstName: 'benit',
			lastName: 'havuga',
			email: 'mujohn25@gmail.com',
			role: 'requester',
			manager: 'John Rukundi',
		}));
		expect(store.getActions()).not.toEqual(expectedActions);
	});
	it('should handle change state error', () => {
		const expectedActions = [
			{
				type: 'ON_CHANGE',
				payload: {
					data: {
						id: 4,
						firstName: 'benit',
						lastName: 'havuga',
						email: 'mujohn25@gmail.com',
						role: 'requester',
						manager: 'London Steff',
					},
				},
			},
		];
		const store = mockStore({});
		store.dispatch(actions.onChangeState([expectedActions], {
			id: 3,
			firstName: 'benit',
			lastName: 'havuga',
			email: 'mujohn25@gmail.com',
			role: 'requester',
			manager: 'John Rukundi',
		}));
		expect(store.getActions()).not.toEqual(expectedActions);
	});
	it('should fetch all managers', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						data: {
							id: 10,
							firstName: 'john',
							lastName: 'rukundi',
						},
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'GET_MANAGERS',
				payload: {
					data: {
						id: 10,
						firstName: 'john',
						lastName: 'rukundi',
					},
				},
			},
		];
		const store = mockStore({ managerData: {} });
		return store.dispatch(actions.getManagers()).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	it('should assign user a manager ', () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						id: 4,
						userId: 106,
						managerId: 94,
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'UPDATE_USERS_MANAGERS',
				payload: {
					data: {
						id: 4,
						userId: 106,
						managerId: 94,
					},
				},
			},
		];
		const store = mockStore({});
		return store.dispatch(actions.updateUserManager(9, 99)).then(() => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
});
