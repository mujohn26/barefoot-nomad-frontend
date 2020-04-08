import mainLayoutReducer from '../../src/reducers/main_layout/main.layout.reducer';

describe('main layout test', () => {
	it('Should get main layout title', () => {
		const getState = mainLayoutReducer(
			{},
			{ type: 'GET_TITLE', title: 'title' },
		);
		expect(getState).toEqual({ title: 'title' });
	});

	it('Should match with  default', () => {
		const getState = mainLayoutReducer({ title: '' }, '');
		expect(getState).toEqual({
			title: '',
		});
	});
});
