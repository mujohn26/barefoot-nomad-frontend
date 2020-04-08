import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	FORGOT_PASSWORD_SUCCESS,
	sendResetLink,
	resetPassword,
	deleteForgotError,
	FORGOT_PASSWORD_ERROR,
	RESET_PASSWORD_SUCESS,
	RESET_PASSWORD_ERROR,
	DELETE_ERROR,
	deleteResetError 
} from '../../../src/actions/resetPasswordAction';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Reset password  actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('should send reset link when email is registered', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'Email sent please check you email to reset your password',
					data:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…A0MH0.oMzzh3sFKmdHNp0izkG5aoiaKdn47GOg1vXho1ELy5Q',
				},
			});
		});
		const expectedActions = [
			{
				type: "LOADING",
				payload: true,  
				},
			{
				type: FORGOT_PASSWORD_SUCCESS,
				payload: 'Email sent please check you email to reset your password',
			},
			{
				type: "LOADING",
				payload:false,  
				}
			
		];
		const store = mockStore({});
		await store.dispatch(sendResetLink('me@you.com')).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	it('should not send reset link when email is not registered in the database', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 404,
				response: {
					error: 'errror user not found!',
				},
			});
		});
		const expectedActions = [
			{
				payload: true,
				type: 'LOADING',
			},
			{
				message: 'errror user not found!',
				type: 'FORGOT_ERROR',
			},
			{
				payload: false,
				type: 'LOADING',
			},
		];
		const store = mockStore({});
		await store.dispatch(sendResetLink('me34@you.com')).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	it('should reset password successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'Password has successfuly changed',
					data:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
				},
			});
		});
		const headers = {
			'Content-Type': 'application/json',
			token:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
		};
		const newPassword = {
			password: '0788787273m',
			confirmPassword: '0788787273m',
		};
		const expectedActions = [
		{
				"payload": true,
		  "type": "LOADING",
		   },
		   {
		    "payload": "Password has successfuly changed",
				"type": "RESET_SUCESS",
			  },




		];
		const store = mockStore({});
		await store
			.dispatch(resetPassword({ newPassword, headers }))
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
	it('should not reset password when password are not valid', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 422,
				response: {
					data: {
						status: 422,
						error: [
							'Password should be provided and must be alphanumeric with atleast 8 charactors.',
							'conform Password should be provided and must be alphanumeric with atleast 8 charactors.',
						],
					},
				},
			});
		});
		const headers = {
			'Content-Type': 'application/json',
			token:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…c1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA',
		};
		const wrongPassword = {
			password: '123',
			confirmPassword: '123',
		};
		const expectedActions = [
		
				 {
					    "payload": true,
					     "type": "LOADING",
					   },
				    {
						  "message": [
							"Password should be provided and must be alphanumeric with atleast 8 charactors.",
							"conform Password should be provided and must be alphanumeric with atleast 8 charactors.",
						  ],
						  "type": "RESET_ERROR",
				  },
				 {
					    "payload": false,
					    "type": "LOADING",
						},
	
		];
		const store = mockStore({});
		await store
			.dispatch(resetPassword({ wrongPassword, headers }))
			.then(async () => {
				expect(store.getActions()).toEqual(expectedActions);
			});
	});
	it('should delete forgot error', () => {
		const deleteForgotErrorAction = [
			{
				type: DELETE_ERROR,
			},
		];
		const store = mockStore({});
		store.dispatch(deleteForgotError());
		expect(store.getActions()).toEqual(deleteForgotErrorAction);
	});
	it('should delete reset error', () => {
		const deleteForgotErrorAction = [
			{
				type: 'DELETE_RESET_ERROR'
			},
		];
		const store = mockStore({});
		store.dispatch(deleteResetError ());
		expect(store.getActions()).toEqual(deleteForgotErrorAction);
	});
});
