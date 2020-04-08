import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	UPDATE_USER_PROFILE,
	GET_USER_PROFILE,
	CHANGE_STATE,
	CANCEL_USER_UPDATE,
	GetUserProfile,
	updateUserProfile,
	changeAttribute,
	cancelUserUpdate,
	uploadNewImageOnCloud,
	HTTP_REQUEST_START,
	UPLOAD_IMAGE_SUCCESS,
} from '../../../src/actions/user.profile.action';
import userProfileReducer from '../../../src/reducers/user.profile.reducer';
import { data, initialState } from '../../../__mockData__/redux-mock-data';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
import { jssPreset } from '@material-ui/core';
import dotenv from 'dotenv';
dotenv.config();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();
describe('edit user profile', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});

	const succussMockData = {
		status: 200,
		response: {
			status: 200,
			message: 'User Profile',
			data: {
				data: {
					email: 'ricshama@gmail.com',
					firstName: 'shema',
					lastName: 'Eric',
					country: 'United Arab Emirates',
					gender: 'Male',
					birthdate: '2003-07-18',
					preferredlanguage: 'Swahili',
					preferredcurrency: 'dolla ',
					place: 'kigali',
					department: 'software ',
					profileImage:
						'https://res.cloudinary.com/dby88h516/image/upload/v1581418901/barefootnomad/r6qshqeaxqdlyhmnmhtr.jpg',
					appNotification: true,
					emailNotification: false,
				},
			},
		},
	};
	it('should get user information', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith(succussMockData);
		});
		const store = mockStore({});
		await store.dispatch(GetUserProfile()).then(async () => {
			const result = store.getActions();
			expect(result[0].type).toEqual('GET_USER_PROFILE');
		});
	});
	it('should get user who has empty birth date', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith(succussMockData);
		});
		const store = mockStore({});
		await store.dispatch(GetUserProfile()).then(async () => {
			const result = store.getActions();
			expect(result[0].type).toEqual('GET_USER_PROFILE');
		});
	});

	it('should update user profile ', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'User Profile',
				data: {
					email: 'ricshama@gmail.com',
					firstName: 'shema',
					lastName: 'Eric',
					country: 'United Arab Emirates',
					gender: 'Male',
					birthdate: '2003-07-18',
					preferredlanguage: 'Swahili',
					preferredcurrency: 'dolla ',
					place: 'kigali',
					department: 'software ',
					profileImage:
						'https://res.cloudinary.com/dby88h516/image/upload/v1581418901/barefootnomad/r6qshqeaxqdlyhmnmhtr.jpg',
					appNotification: true,
					emailNotification: false,
				},
			});
		});

		const body = {
			email: 'ricshama@gmail.com',
			firstName: 'shema',
			lastName: 'Eric',
			country: 'United Arab Emirates',
			gender: 'Male',
			birthdate: '2003-07-18',
			preferredlanguage: 'Swahili',
			preferredcurrency: 'dolla ',
			place: 'kigali',
			department: 'software ',
			profileImage:
				'https://res.cloudinary.com/dby88h516/image/upload/v1581418901/barefootnomad/r6qshqeaxqdlyhmnmhtr.jpg',
			appNotification: true,
			emailNotification: false,
		};
		const store = mockStore({});
		await store.dispatch(updateUserProfile(body)).then(async () => {
			expect(store.getActions()[0].type).toEqual('UPDATE_USER_PROFILE');
		});
	});
	it('should update user profile  who has authonticated by social media', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'User Profile',
				data: {
					email: 'ricshama@gmail.com',
					firstName: 'shema',
					lastName: 'Eric',
					country: 'United Arab Emirates',
					gender: 'Male',
					birthdate: '',
					preferredlanguage: 'Swahili',
					preferredcurrency: 'dolla ',
					place: 'kigali',
					department: 'software ',
					profileImage:
						'https://res.cloudinary.com/dby88h516/image/upload/v1581418901/barefootnomad/r6qshqeaxqdlyhmnmhtr.jpg',
					appNotification: true,
					emailNotification: false,
				},
			});
		});

		const body = {
			email: 'ricshama@gmail.com',
			firstName: 'shema',
			lastName: 'Eric',
			country: 'United Arab Emirates',
			gender: 'Male',
			birthdate: '',
			preferredlanguage: 'Swahili',
			preferredcurrency: 'dolla ',
			place: 'kigali',
			department: 'software ',
			profileImage:
				'https://res.cloudinary.com/dby88h516/image/upload/v1581418901/barefootnomad/r6qshqeaxqdlyhmnmhtr.jpg',
			appNotification: true,
			emailNotification: false,
		};
		const store = mockStore({});
		await store.dispatch(updateUserProfile(body)).then(async () => {
			expect(store.getActions()[0].type).toEqual('UPDATE_USER_PROFILE');
		});
	});

	beforeEach(() => {
		store.clearActions();
	});
});

const mockedStore = configureStore(middlewares);
const stored = mockedStore();
describe('profile actions test ', () => {
	beforeEach(() => {
		moxios.install(axios);
	});

	afterEach(() => {
		moxios.uninstall(axios);
	});

	it(' should change a state of particular attribute', () => {
		const changeStateActions = [
			{
				type: CHANGE_STATE,
				attribute: data,
			},
		];
		stored.dispatch(changeAttribute(data));
		expect(stored.getActions()).toEqual(changeStateActions);
	});
	it('should change a image state after uploading image', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						message: 'success',
						secure_url: 'image/image.png',
					},
				},
			});
		});
		const files = new File(['(⌐□_□)'], 'chucknorris.png', {
			type: 'image/png',
		});
		const data = {
			target: {
				files,
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions.length).toEqual(2);
		});
	});
	it('should cancel update', () => {
		const cancelActions = [
			{
				type: CANCEL_USER_UPDATE,
			},
		];
		const store = mockStore({});
		store.dispatch(cancelUserUpdate());
		expect(store.getActions()).toEqual(cancelActions);
	});

	it('should get error when uploading image faile', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 400,
				response: {
					message: 'fail',
					secure_url: '',
				},
			});
		});
		const data = {
			target: {
				files: [
					{
						name: 'images (2).jpeg',
						lastModified: 1581063458236,
						webkitRelativePath: '',
						size: 5247,
						type: 'image/jpeg',
					},
				],
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions[1].type).toEqual('ERROR_UPLOAD_IMAGE');
		});
	});
});
