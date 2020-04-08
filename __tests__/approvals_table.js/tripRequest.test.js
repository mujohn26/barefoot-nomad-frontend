import React from 'react';
import { mount, shallow } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from '../../src/reducers/approval.table.reducer';
import {
	Request,
	mapStateToProps,
	normalizeType,
} from '../../src/components/approvals_table/trip.request';
import { token } from '../../__mockData__/approval.table';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};

describe('Render trip request ui', () => {
	localStorage.setItem('token', token);
	const theme = createMuiTheme({
		props: { MuiWithWidth: { initialWidth: 'xs' } },
	});
	const props = [
		{
			id: 0,
			origin: 'Kigali',
			destination: 'Kincasa',
			tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
			tripTripId: 2,
			tripType: 'one way',
			status: 'pending',
			accomodation: 'fgfghftjghv',
			departureDate: '2020-09-12T00:00:00.000Z',
			returnDate: '2020-02-01T22:00:00.000Z',
			createdAt: '2020-02-19T19:58:30.638Z',
			manager: {
				firstName: 'uwineza',
				lastName: 'aime',
			},
		},
	];

	const user = {
		firstName: 'shema',
		lastName: 'eric',
	};
	const prop = {};

	const store = testStore({
		tripRequestCommentsReducer: { comments: [{}] },
		userProfileReducer: {
			userProfileInfo: {
				profileImage: '',
			},
		},
	});
	shallow(
		<Provider store={store}>
			<Request trip={props} user={user} />
		</Provider>,
	);
	mount(
		<Provider store={store}>
			<Request trip={props} history={{ push: jest.fn() }} user={user} />
		</Provider>,
	);
	it('should handle mapStateToProps successfully', () => {
		const initState = {
			approvalsTableReducer: {
				tripRequests: [],
				trip: [],
				tripRequestsError: '',
				successMessage: false,
				errorMessage: false,
				message: '',
				user: {},
			},
			tripRequestsReducers: { trip: [] },
			userProfileReducer: { userProfileInfo: {} },
		};
		expect(mapStateToProps(initState)).toBeTruthy();
	});

	it('should render all components successfully', () => {
		shallow(
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Request trip={props} history={{ push: jest.fn() }} user={user} />
				</Provider>
			</MuiThemeProvider>,
		);
		const wrapper = shallow(
			<Request
				trip={props}
				history={{ push: jest.fn() }}
				closeErrorMessageAlert={jest.fn()}
				editTripRequestStatus={jest.fn()}
				user={user}
			/>,
		);
		const cancelBtn = wrapper.find('#cancelBtn').simulate('click');
		expect(cancelBtn).toBeTruthy();
		const modelPop = wrapper.find('#modelPop').simulate('close');
		expect(modelPop).toBeTruthy();
		const Snackbar1 = wrapper.find('#Snackbar1').simulate('close');
		expect(Snackbar1).toBeTruthy();
		const Snackbar2 = wrapper.find('#Snackbar2').simulate('close');
		expect(Snackbar2).toBeTruthy();
		const Snackbar3 = wrapper.find('#Snackbar3').simulate('close');
		expect(Snackbar3).toBeTruthy();
		const Snackbar4 = wrapper.find('#Snackbar4').simulate('close');
		expect(Snackbar4).toBeTruthy();
		const accept = wrapper.find('#accept').simulate('click');
		expect(accept).toBeTruthy();
		const reject = wrapper.find('#reject').simulate('click');
		expect(reject).toBeTruthy();
		const finalDeleteBtn = wrapper.find('#finalDeleteBtn').simulate('click');
		expect(finalDeleteBtn).toBeTruthy();
	});
	it('should render all components successfully with not return date and manager name', () => {
		const secondProps = [
			{
				id: 0,
				origin: 'Kigali',
				destination: 'Kincasa',
				tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
				tripTripId: 2,
				tripType: 'one way',
				status: 'approved',
				accomodation: 'fgfghftjghv',
				departureDate: '2020-09-12T00:00:00.000Z',
				returnDate: '2020-02-01T22:00:00.000Z',
				createdAt: '2020-02-19T19:58:30.638Z',
				manager: null,
			},
		];
		shallow(
			<MuiThemeProvider theme={theme}>
				<Provider store={store}>
					<Request
						trip={secondProps}
						history={{ push: jest.fn() }}
						user={user}
					/>
				</Provider>
			</MuiThemeProvider>,
		);
		const wrapper = shallow(
			<Request
				trip={secondProps}
				history={{ push: jest.fn() }}
				closeErrorMessageAlert={jest.fn()}
				editTripRequestStatus={jest.fn()}
				user={user}
			/>,
		);
		let accept = wrapper.find('#accept').simulate('click');
		accept = wrapper.find('#accept').simulate('click');
		expect(accept).toBeTruthy();
	});

	it('should return collect trip type', () => {
		expect(normalizeType('multi-city')).toEqual('Multiple cities trip');
		expect(normalizeType('one way')).toEqual('One way trip');
		expect(normalizeType('return trip')).toEqual('Return trip');
		normalizeType('eturn trip');
	});
});
