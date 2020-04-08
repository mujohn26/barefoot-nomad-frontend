import React from 'react';
import { mount } from 'enzyme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';
import {
	Requests,
	mapStateToProps,
	handleClick,
} from '../../src/views/trip_requests/userTripRequests.view.jsx';

describe('Trip request test', () => {
	it('should render trip request ui successfully', () => {
		const props = [
			[
				{
					id: 1,
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
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			],
		];
		mount(<Requests trips={[[]]} getUserTripRequestsAction={jest.fn()} />);
		mount(<Requests trips={[]} getUserTripRequestsAction={jest.fn()} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<Requests
					trips={props}
					history={{ push: jest.fn() }}
					getUserTripRequestsAction={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
					SearchTripRequests={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const cardItem = wrapper.find('#cardItem').at(1);
		cardItem.props().onClick();
		expect(cardItem).toBeTruthy();
		const searchBar = wrapper.find('#outlined_adornment_weight').at(1);
		searchBar.props().onChange({ target: { value: 'value' } });
		expect(searchBar).toBeTruthy();

		const theme1 = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper1 = createMount()(
			<MuiThemeProvider theme={theme1}>
				<Requests
					trips={props}
					history={{ push: jest.fn() }}
					getUserTripRequestsAction={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const tableRow = wrapper1.find('#tableRow').at(1);
		tableRow.props().onClick({});
		expect(tableRow).toBeTruthy();

		const pagination = wrapper.find('#pagination').at(1);
		pagination.props().onChangePage({}, 2);
		pagination.props().onChangeRowsPerPage({ target: 20 });
		handleClick(
			{
				history: { push: jest.fn() },
				setSelectedTripRequestAction: jest.fn(),
			},
			[{ id: 2 }],
		);
	});
	it('should render trip request ui successfully when some attribute are null', () => {
		const props = [
			[
				{
					id: 1,
					origin: 'Kigali',
					destination: 'Kincasa',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripTripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'fgfghftjghv',
					departureDate: null,
					returnDate: null,
					createdAt: null,
					manager: {},
				},
			],
		];
		mount(<Requests trips={[[]]} getUserTripRequestsAction={jest.fn()} />);
		mount(<Requests trips={[]} getUserTripRequestsAction={jest.fn()} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<Requests
					trips={props}
					history={{ push: jest.fn() }}
					getUserTripRequestsAction={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
					SearchTripRequests={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const cardItem = wrapper.find('#cardItem').at(1);
		cardItem.props().onClick();
		expect(cardItem).toBeTruthy();
		const searchBar = wrapper.find('#outlined_adornment_weight').at(1);
		searchBar.props().onChange({ target: { value: 'value' } });
		expect(searchBar).toBeTruthy();

		const theme1 = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper1 = createMount()(
			<MuiThemeProvider theme={theme1}>
				<Requests
					trips={props}
					history={{ push: jest.fn() }}
					getUserTripRequestsAction={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const tableRow = wrapper1.find('#tableRow').at(1);
		tableRow.props().onClick({});
		expect(tableRow).toBeTruthy();

		const pagination = wrapper.find('#pagination').at(1);
		pagination.props().onChangePage({}, 2);
		pagination.props().onChangeRowsPerPage({ target: 20 });
		handleClick(
			{
				history: { push: jest.fn() },
				setSelectedTripRequestAction: jest.fn(),
			},
			[{ id: 2 }],
		);
	});
	it('should return trips object from store', () => {
		const mapState = mapStateToProps({
			tripRequestsReducers: {
				myTrips: {
					id: 1,
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
						firstName: 'Dominique',
						lastName: 'Nsengimana',
					},
				},
			},
			userProfileReducer: {
				userProfileInfo: {
					firstName: 'Dominique',
					lastName: 'Veda',
				},
			},
		});
		expect(mapState).toEqual({
			trips: {
				id: 1,
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
				manager: { firstName: 'Dominique', lastName: 'Nsengimana' },
			},
		});
	});
});
