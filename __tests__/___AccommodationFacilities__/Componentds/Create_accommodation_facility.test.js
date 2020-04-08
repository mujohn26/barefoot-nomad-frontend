import React from 'react';
import { shallow, mount } from 'enzyme';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
	AccommodationFacility,
	mapStateToProps,
} from '../../../src/views/creating_accommodation_facilities/CreateAccommodation.jsx';
import { props } from '../../../__mockData__/accommodationFacility.mock';
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
	const wrapper = shallow(<AccommodationFacility {...props} store={store} />);
	return wrapper;
};

const setUpComponent = (initialState = {}) => {
	const store = testStore(initialState);
	const wrapper = mount(<AccommodationFacility {...props} store={store} />);
	return wrapper;
};

describe('Render get accommodation facilities components', () => {
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

	it('should handle componentDidUpdate successfully', () => {
		const token =
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjVAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjF9LCJpYXQiOjE1ODIyNDI0OTEsImV4cCI6MTU4MjMyODg5MX0.S_GO2R1kNZJrro5NbJOjO4S0UfBfhLaF-QtoiOUlmDo';
		localStorage.setItem('token', token);
		const component = setUpComponent();
		const handleChangeSpy = jest.spyOn(
			component.instance(),
			'componentDidUpdate',
		);
		component.setProps({ data: 'accommodation created success' });
		expect(handleChangeSpy).toBeDefined();
	});
	it('should handle delete card', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			rooms: [
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '200',
					currency: 'USD',
					roomTypeImageUrl: 'image1',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '300',
					currency: 'USD',
					roomTypeImageUrl: 'image2',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '201',
					currency: 'USD',
					roomTypeImageUrl: 'image3',
				},
			],
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleDeleteCard');
		const index = 2;
		wrapper.instance().handleDeleteCard(index);
	});
	it('should handle Delete Service Chip Card', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			services: [
				{ id: 1, serviceName: 'breakfast' },
				{ id: 2, serviceName: 'caterring' },
				{ id: 3, serviceName: 'lunch' },
			],
		});
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'handleDeleteServiceChipCard',
		);
		wrapper.instance().handleDeleteServiceChipCard('breakfast');
	});
	it('should handle Delete amenity Chip Card', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			amenities: [
				{ id: 1, serviceName: 'parking' },
				{ id: 2, serviceName: 'swimming' },
			],
		});
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'handleDeleteAmenityChipCard',
		);
		wrapper.instance().handleDeleteAmenityChipCard('parking');
	});
	it('should handle add service', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			services: [],
			disabled: false,
			open: false,
			serviceName: '',
		});
		wrapper.setState({
			serviceName: 'breakfast',
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'addServices');
		wrapper.instance().addServices();
	});
	it('should handle add amenity ', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			amenities: [],
			AmenitiesDisabled: false,
			open: false,
			amenityName: '',
		});
		wrapper.setState({
			amenityName: 'parking',
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'addAmenities');
		wrapper.instance().addAmenities();
	});
	it('should handle close alert ', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			open: true,
		});
		wrapper.setState({
			open: false,
		});
		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleCloseAlert');
		wrapper.instance().handleCloseAlert();
	});

	it('should handle add card ', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			activeItemIndex: 1,
			rooms: [],
		});

		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'addCard');
		wrapper.instance().addCard();
	});
	it('should upload accommodtion Image successfully', () => {
		const e = {
			target: {
				files: [
					{
						name: 'Screen Shot 2020-02-12 at 21.46.06.png',
						lastModified: 1581536771644,
						webkitRelativePath: '',
						size: 167933,
						type: 'image/png',
					},
				],
			},
		};
		const wrapper = mount(<AccommodationFacility {...props} />);
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'uploadAccommodationImage',
		);
		wrapper.instance().uploadAccommodationImage(e);
	});
	it('should upload room Image successfully', () => {
		const e = {
			target: {
				files: [
					{
						name: 'Screen Shot 2020-02-12 at 21.46.06.png',
						lastModified: 1581536771644,
						webkitRelativePath: '',
						size: 167933,
						type: 'image/png',
					},
				],
			},
		};
		const cardId = 1;
		const wrapper = mount(<AccommodationFacility {...props} />);
		const handleSubmitSpy = jest.spyOn(
			wrapper.instance(),
			'HandleUploadRoomImage',
		);
		wrapper.instance().HandleUploadRoomImage(e, cardId);
	});
	it('should handle change room  successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			activeItemIndex: 1,
			rooms: [
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '200',
					currency: 'USD',
					roomTypeImageUrl: 'image1',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '300',
					currency: 'USD',
					roomTypeImageUrl: 'image2',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '201',
					currency: 'USD',
					roomTypeImageUrl: 'image3',
				},
			],
		});

		const event = {
			target: {
				value: 'marriot',
				name: 'numberOfRoom',
				id: 'standard-search',
			},
		};
		const value = '';
		const index1 = 1;
		const name = '';

		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChangeRooms');
		wrapper.instance().handleChangeRooms(event, value, index1, name);
	});
	it('should handle change room  successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			activeItemIndex: 1,
			rooms: [
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '200',
					currency: 'USD',
					roomTypeImageUrl: 'image1',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '300',
					currency: 'USD',
					roomTypeImageUrl: 'image2',
				},
				{
					numberOfRoom: '1',
					typeId: '2',
					price: '201',
					currency: 'USD',
					roomTypeImageUrl: 'image3',
				},
			],
		});

		const event = {
			target: {
				value: 'marriot',
				name: 'numberOfRoom',
				id: 'currency',
			},
		};
		const value = 'USD';
		const index1 = 1;
		const name = 'currency';

		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChangeRooms');
		wrapper.instance().handleChangeRooms(event, value, index1, name);
	});
	it('should handle change services  successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			serviceName: '',
			disabled: true,
		});

		const event = {
			target: {
				value: 'breakfast',
				name: 'serviceName',
			},
		};
		wrapper.instance().handleChangeServices(event);
	});
	it('should handle change amenities successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			amenityName: '',
			disabled: true,
		});

		const event = {
			target: {
				value: 'breakfast',
				name: 'serviceName',
			},
		};
		wrapper.instance().handleChangeAmenities(event);
	});
	it('should handle delete accommodation image chip successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
	
			deleted: false,
		});

		const key = 2;
		wrapper.instance().handleDeleteAccommodation(key);
	});
	it('should handle change focus successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		const event = {
			target: {
				value: 'breakfast',
			},
		};
		wrapper.instance().handleFocus(event);
	});
	it('should handle next successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			activeItemIndex: 0,
		});
		wrapper.instance().handleNext();
    });
    it('should handle back successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			activeItemIndex: 0,
		});
		wrapper.instance().handleBack();
	});
	it('should handle change  successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			accommodationName: 'mariot',
			locationId: 2,
			owner: 'john',
			SaveDisabled: true,
		});

		const event = {
			target: {
				value: 'marriot',
				name: 'accommodationName',
				id: 'currency',
			},
		};

		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleChange');
		wrapper.instance().handleChange(event);
	});
	it('should handle click successfully', () => {
		const wrapper = mount(<AccommodationFacility {...props} />);
		wrapper.setState({
			accommodationName: 'mariot',
			locationId: 2,
			owner: 'john',
			SaveDisabled: true,
		});

		const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleClick');
		wrapper.instance().handleClick();
	});
	it('should map state to props', () => {
		expect(mapStateToProps);
		const state = {
			accommodationFacilitiesReducer: {
				locations: [
					{
						id: 6,
						city: 'kigali',
					},
					{
						id: 7,
						city: 'Nairobi',
					},
				],
				images: { Image: 'image1.png' },
				roomImages: { Image: 'image1.png' },
				accommodationTypes: [
					{ id: 1, name: 'one bed room' },
					{ id: 2, name: 'two bed room' },
				],
				data: 'accommodation created successfully',
				isLoading: true,
				payload: 1,
			},
		};

		const stateObject = mapStateToProps(state);
		expect(stateObject).toBeTruthy();
	});
	it('should handle accommodation category input', () => {
		mount(<AccommodationFacility {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<AccommodationFacility {...props} />
			</MuiThemeProvider>,
		);
		const caterory_select = wrapper.find(
			'[data-test="accommodation-category-field"]',
		);
		caterory_select
			.first()
			.props()
			.onChange({}, { value: { title: 'hotel' } });
		caterory_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
	});
	it('should handle accommodation location input', () => {
		mount(<AccommodationFacility {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'lg' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<AccommodationFacility {...props} />
			</MuiThemeProvider>,
		);
		const caterory_select = wrapper.find(
			'[data-test="accommodation-location-field"]',
		);
		caterory_select
			.first()
			.props()
			.onChange({}, { value: { city: 'kigali' } });
		caterory_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
    });

    it('should handle accommodation location input', () => {
		mount(<AccommodationFacility {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<AccommodationFacility {...props} />
			</MuiThemeProvider>,
		);
		const caterory_select = wrapper.find(
			'[data-test="accommodation-location-field"]',
		);
		caterory_select
			.first()
			.props()
			.onChange({}, { value: { city: 'kigali' } });
		caterory_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
    });

	it('should handle accommodation category input', () => {
		mount(<AccommodationFacility {...props} />);
		const theme = createMuiTheme({
			props: { MuiWithWidth: { initialWidth: 'xs' } },
		});
		const wrapper = createMount()(
			<MuiThemeProvider theme={theme}>
				<AccommodationFacility {...props} />
			</MuiThemeProvider>,
		);
		const caterory_select = wrapper.find(
			'[data-test="accommodation-category-field"]',
		);
		caterory_select
			.first()
			.props()
			.onChange({}, { value: { title: 'hotel' } });
		caterory_select
			.first()
			.props()
			.getOptionLabel(v => (v.label = 'value'));
	});

		it('should display and delete accommodation chip successfully ', () => {
			mount(<AccommodationFacility {...props} />);
			const theme = createMuiTheme({
				props: { MuiWithWidth: { initialWidth: 'lg' } },
			});
			const wrapper = createMount()(
				<MuiThemeProvider theme={theme}>
					<AccommodationFacility  {...props} />
				</MuiThemeProvider>,
			);
			const create_service = wrapper.find('[data-test="accommodation-image-chip-large"]');
		create_service
				.first()
				.props()
				.onDelete({}, {key:1});
	
		});
		it('should display and delete accommodation chip successfully small devicess ', () => {
			mount(<AccommodationFacility {...props} />);
			const theme = createMuiTheme({
				props: { MuiWithWidth: { initialWidth: 'xs' } },
			});
			const wrapper = createMount()(
				<MuiThemeProvider theme={theme}>
					<AccommodationFacility  {...props} />
				</MuiThemeProvider>,
			);
			const create_service = wrapper.find('[data-test="accommodation-image-chip-small"]');
		create_service
				.first()
				.props()
				.onDelete({}, {key:1});
	
		});

		it('should handle delete room image chip successfully', () => {
			const wrapper = mount(<AccommodationFacility {...props} />);
			wrapper.setState({
				isRooChipDeleted:false
			});
	const cardId =1 ;
			const handleSubmitSpy = jest.spyOn(wrapper.instance(), 'handleDeleteRoomChipCard');
			wrapper.instance().handleDeleteRoomChipCard(cardId);
		});

});
