import configureMockStore from 'redux-mock-store';

import thunk from 'redux-thunk';
import { setTitle } from '../../src/actions/main.layout.action';
import moxios from 'moxios';
import expect from 'expect';
import dotenv from 'dotenv';

dotenv.config();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('should add main layout title', () => {
	it('should add main layout title', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				message: 'success',
				response: {},
			});
		});
		const newStore = mockStore({});
		await newStore.dispatch(setTitle('title')).then(async () => {
			const result = newStore.getActions();
			expect(result).toEqual([{ type: 'GET_TITLE', title: 'title' }]);
		});
	});
});
