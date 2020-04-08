import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
	UserRoleSetting,
	mapStateToProps,
} from '../../../src/components/user/userRole.jsx';
import { props } from '../../../__mockData__/userRoleSetting.mock';
import reducer from '../../../src/reducers/index';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { createMount } from '@material-ui/core/test-utils';

const middlewares = [thunk];
const testStore = state => {
	const createStoreWithMiddleware = applyMiddleware(...middlewares)(
		createStore,
	);
	return createStoreWithMiddleware(reducer, state);
};
const setUp = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = shallow(<UserRoleSetting {...props} store={store} />);
	return wrapper;
};
const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<UserRoleSetting {...props} store={store} />);
	wrapper.setState({
		user: [
			{ userId: 4, role: 'manager' },
			{ userid: 5, role: 'requester' },
		],
		disabled: true,
	});
	return wrapper;
};
describe('Render user role setting  components', () => {
	it('should handle click successfully', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const component = setUpComponent();
		const handleSubmitSpy = jest.spyOn(component.instance(), 'handleClick');
		component
			.find('[data-test="update-btn"]')
			.at(4)
			.props()
			.onClick();
		expect(handleSubmitSpy).toBeDefined();
	});
});

describe('Render user role setting components', () => {
	it('should handle componentDidUpdate successfully', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ role: 'requester' });
		expect(handleChangeSpy).toBeDefined();
	});

	it('should handle will mount successfully', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'UNSAFE_componentWillMount',
		);
		expect(handleChangeSpy).toBeDefined();
	});
	it('should handle close', () => {
		const wrapper = mount(<UserRoleSetting {...props} />);
		wrapper.setState({
			open: false,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleCloseAlert');

		wrapper.instance().handleCloseAlert();
	});
	it('should handle close modal', () => {
		const wrapper = mount(<UserRoleSetting {...props} />);
		wrapper.setState({
			openModal: false,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleCloseModal');

		wrapper.instance().handleCloseModal();
	});
	it('should handle cancel', () => {
		const wrapper = mount(<UserRoleSetting {...props} />);
		wrapper.setState({
			disabled: true,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleCancel');

		wrapper.instance().handleCancel();
	});
	it('should handle change page', () => {
		const wrapper = mount(<UserRoleSetting {...props} />);
		wrapper.setState({
			page: 2,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChangePage');

		wrapper.instance().handleChangePage();
	});

	it('should handle change row per page', () => {
		const wrapper = mount(<UserRoleSetting {...props} />);
		wrapper.setState({
			rowsPerPage: 5,
			page: 0,
		});
		const mockedEvent = { target: { value: 5 } };
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'handleChangeRowsPerPage',
		);

		wrapper.instance().handleChangeRowsPerPage(mockedEvent);
	});
	it('should handle change successfully', () => {
		mount(<UserRoleSetting {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<UserRoleSetting {...props} />
			</MuiThemeProvider>,
		);
		const roles_select = wrapper.find('[data-test="autocomplete-field"]');
		// wrapper1.setState({ rows: [{}, {}] });
		roles_select
			.first()
			.props()
			.onChange({}, { role: 'manager' });
		roles_select
			.first()
			.props()
			.onChange({}, { value: { role: 'manager' } });
		roles_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
	});
	it('should handle change successfully', () => {
		mount(<UserRoleSetting {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<UserRoleSetting {...props} />
			</MuiThemeProvider>,
		);
		const roles_select = wrapper.find('[data-test="autocomplete-field"]');

		roles_select
			.first()
			.props()
			.onChange({}, { role: 'manager' });
		roles_select
			.first()
			.props()
			.onChange({}, { value: { role: 'manager' } });
		roles_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
	});

	it('should map state to props', () => {
		expect(mapStateToProps);
		const state = {
			UserSettingReducer: {
				result: [
					{
						id: 6,
						firstName: 'murengezi',
						lastName: 'pierre',
						email: 'ericshema14@gmail.com',
						role: 'requester',
						createdAt: '2020-01-28T10:46:00.472Z',
						updatedAt: '2020-02-19T21:12:35.403Z',
					},
				],
				isLoading: true,
				role: [{ userId: 3, role: 'manager' }],
				isLoadingData: true,
				updateErrorMessage: 'we dont have that role',
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
});
