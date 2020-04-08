import React from 'react';
import {
	ApprovalsTable,
	mapStateToProps,
	handleClick,
	statusColor,
	locationManager,
} from '../../src/components/approvals_table/approval.table';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';
import { mount } from 'enzyme';

describe('Display notification pane', () => {
	it('should handle mapStateToProps successfully', () => {
		const initState = {
			approvalsTableReducer: { tripRequests: [[]] },
		};
		expect(mapStateToProps(initState)).toBeTruthy();
	});

	it('should render trip request ui successfully', () => {
		const props = [
			[
				{
					id: 1,
					origin: 'Kigali',
					destination: 'logos',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripId: 2,
					tripType: 'one way',
					status: 'pending',
					accomodation: 'raddison blue',
					departureDate: '2020-09-12T00:00:00.000Z',
					returnDate: '2020-02-01T22:00:00.000Z',
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'shema',
						lastName: 'eric',
					},
				},
			],
		];

		mount(<ApprovalsTable trips={[]} getTripRequests={jest.fn()} />);

		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ApprovalsTable
					trips={props}
					history={{ push: jest.fn() }}
					getTripRequests={jest.fn()}
					count={5}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);

		const cardItem = wrapper.find('#cardItem').at(1);
		cardItem.props().onClick();

		const theme1 = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper1 = createMount()(
			<MuiThemeProvider theme={theme1}>
				<ApprovalsTable
					trips={props}
					count={5}
					history={{ push: jest.fn() }}
					getTripRequests={jest.fn()}
					SearchTripRequests={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const tableRow = wrapper1.find('#tableRow').at(1);
		tableRow.props().onClick({});
		const searchBar = wrapper1.find('#outlined_adornment_weight').at(1);
		searchBar.props().onChange({ target: 'value' });

		const pagination = wrapper.find('#pagination').at(1);
		pagination.props().onChangePage({}, 2);
		pagination.props().onChangeRowsPerPage({ target: 20 });

		handleClick(
			{
				history: { push: jest.fn() },
				setSelectedTripRequestAction: jest.fn(),
			},
			[{ tripId: 1, status: 'approved' }, { tripId: 1 }],
		);
		statusColor([{}, {}]);
		locationManager([{ origin: '' }, { destination: '' }]);
	});
	it('should render trip request ui whitch does not have return date', () => {
		const props = [
			[
				{
					id: 1,
					origin: 'Kigali',
					destination: 'logos',
					tripId: 'b4c99c41-9d2a-42f1-9a4c-65111d48e0d4',
					tripId: 2,
					tripType: 'one way',
					status: 'rejected',
					accomodation: 'raddison blue',
					departureDate: null,
					returnDate: null,
					createdAt: '2020-02-19T19:58:30.638Z',
					manager: {
						firstName: 'shema',
						lastName: 'eric',
					},
				},
			],
		];

		mount(<ApprovalsTable trips={[]} getTripRequests={jest.fn()} />);

		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<ApprovalsTable
					trips={props}
					history={{ push: jest.fn() }}
					getTripRequests={jest.fn()}
					count={5}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);

		const cardItem = wrapper.find('#cardItem').at(1);
		cardItem.props().onClick();

		const theme1 = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper1 = createMount()(
			<MuiThemeProvider theme={theme1}>
				<ApprovalsTable
					trips={props}
					count={5}
					history={{ push: jest.fn() }}
					getTripRequests={jest.fn()}
					SearchTripRequests={jest.fn()}
					setSelectedTripRequestAction={jest.fn()}
				/>
			</MuiThemeProvider>,
		);
		const tableRow = wrapper1.find('#tableRow').at(1);
		tableRow.props().onClick({});
		const searchBar = wrapper1.find('#outlined_adornment_weight').at(1);
		searchBar.props().onChange({ target: 'value' });

		const pagination = wrapper.find('#pagination').at(1);
		pagination.props().onChangePage({}, 2);
		pagination.props().onChangeRowsPerPage({ target: 20 });

		handleClick(
			{
				history: { push: jest.fn() },
				setSelectedTripRequestAction: jest.fn(),
			},
			[{ tripId: 1, status: 'approved' }, { tripId: 1 }],
		);
		statusColor([{}, {}]);
		locationManager([{ origin: '' }, { destination: '' }]);
	});
});
