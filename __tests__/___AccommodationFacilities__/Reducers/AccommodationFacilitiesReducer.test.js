import accommodationFacilitiesReducer from '../../../src/reducers/AccommodationFacilityReducer';
import {
	getAccommodations,
	getLocations,
	getAccommodationType,
	uploadAccommodationImage,
	uploadRoomImage,
	createAccommodation,
	isLoading,
	getCardClicked,
	deleteAccommodationImageCard
} from '../../../__mockData__/accommodationFacility.mock';

describe('create accommodation  Reducer', () => {
	it('Should  get accomodations', () => {
		const getState = accommodationFacilitiesReducer({}, getAccommodations);
		expect(getState).toEqual({
			accommodations: getAccommodations.payload,
		});
	});
	it('Should  get location success', () => {
		const getState = accommodationFacilitiesReducer({}, getLocations);
		expect(getState).toEqual({
			locations: getLocations.payload,
		});
	});
	it('Should get accommodation type success', () => {
		const getState = accommodationFacilitiesReducer({}, getAccommodationType);
		expect(getState).toEqual({
			accommodationTypes: getAccommodationType.payload,
		});
	});
	it('Should  upload image success', () => {
		const getState = accommodationFacilitiesReducer(
			{ images: [] },
			uploadAccommodationImage,
		);
		expect(getState).toEqual({
			images: [
				[
					{
						Image: 'image1',
					},
				],
			],
		});
	});
	it('Should  upload room image success', () => {
		const getState = accommodationFacilitiesReducer(
			{ roomImages: [] },
			uploadRoomImage,
		);
		expect(getState).toEqual({
			roomImages: [
				[
					{
						Image: 'image1',
					},
				],
			],
		});
	});
	it('Should create accommodation success', () => {
		const getState = accommodationFacilitiesReducer({}, createAccommodation);
		expect(getState).toEqual({
			data: createAccommodation.payload,
		});
	});
	it('Should LOADER', () => {
		const getState = accommodationFacilitiesReducer({}, isLoading);
		expect(getState).toEqual({
			isLoading: isLoading.payload,
		});
	});
	it('Should GET_CARD_CLICKED', () => {
		const getState = accommodationFacilitiesReducer({}, getCardClicked);
		expect(getState).toEqual({
			payload: getCardClicked.payload,
		});
	});

});
