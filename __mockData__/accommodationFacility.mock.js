import {
	GET_ACCOMMODATION_SUCCES,
	GET_LOCATIONS_SUCCES,
	CREATE_ACCOMMODATION_SUCCES,
	GET_ACCOMMODATION_TYPES_SUCCES,
} from '../src/actions/accommodationFacilitiesActions';

export const props = {
	locations: [
		{ id: 1, city: 'kigali' },
		{ id: 2, city: 'kigali' },
		{ id: 3, city: 'kampala' },
	],
	RoomImagesResult: [{ Image: 'hello' }],
	amenities: [{ amenityName: 'swimming' }, { amenityName: 'parking' }],
	services: [{ serviceName: 'breakfast' }, { serviceName: 'cattering' }],
	result: [
		{
			name: 'marriot',
			description: 'five star hotel',
			location: {
				city: 'kigali',
			},
			category: 'hotel',
			owner: 'John',
			id: 2,
		},
	],
	RoomImagesResult: [{ Image: 'image1', cardId:0 }, { Image: 'image2', cardId:1 }],
	accommodationTypes: [
		{ id: 1, name: 'one bed room' },
		{ id: 2, name: 'two bed room' },
	],
	classes: {
		root: '',
	},
	rooms: [
		{
			numberOfRoom: '',
			typeId: '',
			price: '',
			currency: '',
			roomTypeImageUrl: '',
		},
		{
			numberOfRoom: '',
			typeId: '',
			price: '',
			currency: '',
			roomTypeImageUrl: '',
		}],
	images: [{ key:2, imageUrl: 'image1' }, { key:1,imageUrl: 'image2' }],
	index: 1,
	open: true,
	data: 'accommodation created successfully',
	handleDeleteCard: jest.fn(),
	handleChangeRooms: jest.fn(),
	handleChange: jest.fn(),
	getAccommodations: jest.fn(),
	getAccommodationsSuccess: jest.fn(),
	getLocations: jest.fn(),
	getlocationsSuccess: jest.fn(),
	uploadNewImageOnCloud: jest.fn(),
	getAccommodationType: jest.fn(),
	getaccommodationTypesSuccess: jest.fn(),
	uploadNewRoomImageOnCloud: jest.fn(),
	createAccomodationFacility: jest.fn(),
	createAccommodationSuccess: jest.fn(),
	cardClicked: jest.fn(),
	handleDeleteServiceChipCard: jest.fn(),
  handleDeleteAmenityChipCard: jest.fn(),
  handleDelete:jest.fn(),
  handleDeleteAccommodation:jest.fn(),
  handleDeleteRoomChipCard:jest.fn()
};

export const getAccommodations = {
	type: GET_ACCOMMODATION_SUCCES,
	payload: [
		{ id: 12, name: 'marriot' },
		{ id: 16, name: 'serena' },
	],
};

export const getLocations = {
	type: GET_LOCATIONS_SUCCES,
	payload: [
		{ id: 12, city: 'kigali' },
		{ id: 16, city: 'nairobi' },
	],
};
export const getAccommodationType = {
	type: GET_ACCOMMODATION_TYPES_SUCCES,
	payload: [
		{ id: 12, name: 'one bed room' },
		{ id: 16, name: 'two bed room' },
	],
};
export const uploadAccommodationImage = {
	type: 'UPLOAD_IMAGE_SUCCESS',
	attribute: [{ Image: 'image1' }],
};
export const uploadRoomImage = {
	type: 'UPLOAD_ROOM_IMAGE',
	attribute: [{ Image: 'image1' }],
};
export const createAccommodation = {
	type: CREATE_ACCOMMODATION_SUCCES,
	payload: 'accomodation created successfully',
};
export const isLoading = {
	type: 'LOADING',
	payload: true,

		};
export const getCardClicked = {
	type: 'GET_CARD_CLICKED',
	payload: 0,
};

