import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	GET_ACCOMMODATION_SUCCES,
	GET_LOCATIONS_SUCCES,
	CREATE_ACCOMMODATION_SUCCES,
	GET_ACCOMMODATION_TYPES_SUCCES,
	getAccommodations,
	getLocations,
	getAccommodationType,
	createAccomodationFacility,
	uploadNewImageOnCloud,
	uploadNewRoomImageOnCloud,
	cardClicked,
	handleDeleteAccommodation
} from '../../../src/actions/accommodationFacilitiesActions';
import moxios from 'moxios';
import axios from 'axios';
import expect from 'expect';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
describe('Create accomodation facility  actions', () => {
	beforeEach(() => {
		moxios.install(axios);
	});
	afterEach(() => {
		moxios.uninstall(axios);
	});
	it('should get accommodation facility successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'accommodation successfully',
					data: {
						rows: [
							{
								name: 'marriot',
								location: 'kigali',
								owner: 'john',
							},
						],
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'LOADING_DATA',
				payload: true,
			},
			{
				type: GET_ACCOMMODATION_SUCCES,
				payload: [
					{
						name: 'marriot',
						location: 'kigali',
						owner: 'john',
					},
				],
			},
			{
				type: 'LOADING_DATA',
				payload: false,
			},
		];
		const store = mockStore({});
		await store.dispatch(getAccommodations()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should get location successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'location  successfully',
					data: {
						rows: [
							{
								id: 1,
								city: 'kigali',
							},
							{
								id: 2,
								city: 'Nairobi',
							},
						],
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'LOADING_DATA',
				payload: true,
			},
			{
				type: GET_LOCATIONS_SUCCES,
				payload: {
					rows: [
						{
							id: 1,
							city: 'kigali',
						},
						{
							id: 2,
							city: 'Nairobi',
						},
					],
				},
			},
			{
				type: 'LOADING_DATA',
				payload: false,
			},
		];
		const store = mockStore({});
		await store.dispatch(getLocations()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});
	it('should get error accommodation facility successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 404,
				error: 'not found',
			});
		});
		const expectedActions = [
			{
				type: 'LOADING_DATA',
				payload: true,
			},
			{
				type: 'GET_ACCOMODATION_ERROR',
				payload: {
					status: 404,
					error: 'not found',
				},
			},
		];
		const store = mockStore({});
		await store.dispatch(getAccommodations()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should get location successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					status: 200,
					message: 'location  successfully',
					data: {
						rows: [
							{
								id: 1,
								name: 'one bed room',
							},
							{
								id: 2,
								name: 'two bed room',
							},
						],
					},
				},
			});
		});
		const expectedActions = [
			{
				type: 'LOADING_DATA',
				payload: true,
			},
			{
				type: GET_ACCOMMODATION_TYPES_SUCCES,
				payload: {
					rows: [
						{
							id: 1,
							name: 'one bed room',
						},
						{
							id: 2,
							name: 'two bed room',
						},
					],
				},
			},
			{
				type: 'LOADING_DATA',
				payload: false,
			},
		];
		const store = mockStore({});
		await store.dispatch(getAccommodationType()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should create accommodation successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 201,
				response: {
					status: 201,
					message: 'accomodationcreated  successfully',
				},
			});
		});
		const expectedActions = [
			{
				type: 'LOADING',
				payload: true,
			},
			{
				type: CREATE_ACCOMMODATION_SUCCES,
				payload: 'accomodationcreated  successfully',
			},
			{
				type: 'LOADING',
				payload: false,
			},
		];
		const data = {
			accommodationName: 'mariott',
			description: 'four star',
			locationId: 1,
			owner: 'John',
			category: 'hotel',
			images: [{ imageUrls: 'image1' }],
			rooms: [
				{
					numberOfRoom: '1',
					typeId: '1',
					price: '100',
					currency: 'USD',
					roomTypeImageUrl: 'image1',
				},
			],
			services: [{ serviceName: 'breakfast' }],
			amenities: [{ amenityName: 'parking' }],
		};
		const store = mockStore({});
		await store.dispatch(createAccomodationFacility(data)).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should not create accommodation successfully', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.reject({
				status: 404,
				error: 'not found',
			});
		});
		const expectedActions = [
			{
				type: 'LOADING',
				payload: true,
			},
			{
				type: 'LOADING',
				payload: false,
			},
			{
				type: 'CREATE_ACCOMODATION_ERROR',
				payload: {
					error: 'not found',
					status: 404,
				},
			},
		];
		const store = mockStore({});
		await store.dispatch(createAccomodationFacility()).then(async () => {
			expect(store.getActions()).toEqual(expectedActions);
		});
	});

	it('should upload accomodation image on cloud', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						message: 'success',
						secure_url: 'image/image.png',
					},
				},
			});
		});
		const files = new File(['(⌐□_□)'], 'chucknorris.png', {
			type: 'image/png',
		});
		const data = {
			target: {
				files,
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions.length).toEqual(3);
		});
	});

	it('should get error when uploading accommodation image', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 400,
				response: {
					message: 'fail',
					secure_url: '',
				},
			});
		});
		const data = {
			target: {
				files: [
					{
						name: 'images (2).jpeg',
						lastModified: 1581063458236,
						webkitRelativePath: '',
						size: 5247,
						type: 'image/jpeg',
					},
				],
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions[0].type).toEqual('LOADING');
		});
	});

	it('should upload room image on cloud', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: {
					data: {
						message: 'success',
						secure_url: 'image/image.png',
					},
				},
			});
		});
		const files = new File(['(⌐□_□)'], 'chucknorris.png', {
			type: 'image/png',
		});
		const data = {
			target: {
				files,
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewRoomImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions.length).toEqual(2);
		});
	});

	it('should get error when uploading room image', async () => {
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 400,
				response: {
					message: 'fail',
					secure_url: '',
				},
			});
		});
		const data = {
			target: {
				files: [
					{
						name: 'images (2).jpeg',
						lastModified: 1581063458236,
						webkitRelativePath: '',
						size: 5247,
						type: 'image/jpeg',
					},
				],
			},
		};

		const store = mockStore({});
		await store.dispatch(uploadNewRoomImageOnCloud(data)).then(async () => {
			const actions = store.getActions();
			expect(actions[0].type).toEqual('ERROR_UPLOAD_IMAGE');
		});
	});

	it('should get card clicked', async () => {
		const expectedActions = [
			{
				type: 'GET_CARD_CLICKED',
				payload: 1,
			},
		];
		const id = 1;
		const store = mockStore({});
		await store.dispatch(cardClicked(id));
		const result = store.getActions();

		expect(result).toEqual(expectedActions);
	});


	it('should delete accomodation facility chip', async () => {
		const data=[{key:2,imageUrls:'image1'}]
		const expectedActions = [
			{
				type: 'DELETE_ACCOMMODATION_CHIP',
				payload: data,
			},
		];
		const store = mockStore({});
		await store.dispatch(handleDeleteAccommodation(data));
		const result = store.getActions();

		expect(result).toEqual(expectedActions);
	});
});
