const initalState = {
	images: [],
	roomImages: [],
	images_last:[]
};

const accommodationFacilitiesReducer = (state = initalState, action) => {
	switch (action.type) {
		case 'GET_ACCOMMODATION':
			return {
				...state,
				accommodations: action.payload,
			};
		case 'GET_LOCATIONS':
			return {
				...state,
				locations: action.payload,
			};
		case 'GET_ACCOMMODATION_TYPES':
			return {
				...state,
				accommodationTypes: action.payload,
			};
		case 'UPLOAD_IMAGE_SUCCESS':
			const uploadImageData = action.attribute;


			return {
				...state,
				images: [...state.images, uploadImageData],
			};

			case 'DELETE_ACCOMMODATION_CHIP':
			return {
				...state,
				images: action.payload,
			};

		case 'UPLOAD_ROOM_IMAGE':
			const uploadRoomImageData = action.attribute;
			return {
				...state,
				roomImages: [...state.roomImages, uploadRoomImageData],
			};
		case 'CREATE_ACCOMMODATION':
			return {
				...state,
				data: action.payload,
			};
		case 'LOADING':
			return {
				...state,
				isLoading: action.payload,
			};
		case 'GET_CARD_CLICKED':
			return {
				...state,
				payload: action.payload,
			};
		default:
			return state;
	}
};
export default accommodationFacilitiesReducer;
