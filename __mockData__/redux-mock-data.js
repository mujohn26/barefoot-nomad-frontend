import {
	CHANGE_STATE,
	UPDATE_USER_PROFILE,
	GET_USER_PROFILE,
	CANCEL_USER_UPDATE,
	HTTP_REQUEST_START,
	UPLOAD_IMAGE_SUCCESS,
	ERROR_UPLOAD_IMAGE,
} from '../src/actions/user.profile.action';
export const props = {
	classes: { textFild: '' },
	UpdateduserProfileInfo: { successMessage: 'true' },
	socketManagement: jest.fn(),
	userProfileInfo: {},
	goodBye: jest.fn(),
	greeting: jest.fn(),
	changeAttribute: jest.fn(),
	GetUserProfile: jest.fn(),
	UNSAFE_componentWillMount: jest.fn(),
	changeAttribute: jest.fn(),
	updateUserProfile: jest.fn(),
	handleChange: jest.fn(),
	autoCompliteHandleChange: jest.fn(),
	switchHandleChange: jest.fn(),
	cancelUserUpdate: jest.fn(),
	uploadNewImageOnCloud: jest.fn(),
};

export const changeAttribute = {
	type: CHANGE_STATE,
	attribute: {
		firstName: '',
	},
};
export const startLoader = {
	type: HTTP_REQUEST_START,
	attribute: {
		profileImage: '',
	},
};

export const uploadUserImage = {
	type: UPLOAD_IMAGE_SUCCESS,
	attribute: {
		profileImage: '',
	},
};
export const FailuploadUserImage = {
	type: ERROR_UPLOAD_IMAGE,
	attribute: {
		uploadImageError: '',
	},
};

export const updateUserProfile = {
	type: UPDATE_USER_PROFILE,
	updatedProfile: {
		email: '',
		firstName: '',
		lastName: '',
		country: '',
		gender: '',
		birthdate: '',
		preferredlanguage: '',
		preferredcurrency: '',
		place: '',
		department: '',
		profileImage:
			'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
		appNotification: false,
		emailNotification: false,
		successMessage: '',
	},
};

export const GetUserProfile = {
	type: GET_USER_PROFILE,
	userProfileInfo: {
		email: '',
		firstName: '',
		lastName: '',
		country: '',
		gender: '',
		birthdate: '',
		preferredlanguage: '',
		preferredcurrency: '',
		place: '',
		department: '',
		profileImage:
			'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
		appNotification: false,
		emailNotification: false,
		successMessage: '',
	},
};

export const GetUserProfileReducer = {
	type: GET_USER_PROFILE,
	userProfileInfo: {
		data: {
			email: '',
			firstName: '',
			lastName: '',
			country: '',
			gender: '',
			birthdate: '',
			preferredlanguage: '',
			preferredcurrency: '',
			place: '',
			department: '',
			profileImage:
				'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
			appNotification: false,
			emailNotification: false,
			successMessage: '',
		},
	},
};
export const cancelUserUpdate = {
	type: CANCEL_USER_UPDATE,
	UpdateduserProfileInfo: {
		email: '',
		firstName: '',
		lastName: '',
		country: '',
		gender: '',
		birthdate: '',
		preferredlanguage: '',
		preferredcurrency: '',
		place: '',
		department: '',
		profileImage:
			'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
		appNotification: false,
		emailNotification: false,
		successMessage: '',
	},
};

export const initialState = {
	userProfileInfo: {
		email: '',
		firstName: '',
		lastName: '',
		country: '',
		gender: '',
		birthdate: '',
		preferredlanguage: '',
		preferredcurrency: '',
		place: '',
		department: '',
		profileImage:
			'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
		appNotification: false,
		emailNotification: false,
		successMessage: '',
	},
	UpdateduserProfileInfo: {
		email: '',
		firstName: '',
		lastName: '',
		country: '',
		gender: '',
		birthdate: '',
		preferredlanguage: '',
		preferredcurrency: '',
		place: '',
		department: '',
		profileImage:
			'https://res.cloudinary.com/dby88h516/image/upload/v1580575657/download_mimbni.png',
		appNotification: false,
		emailNotification: false,
		successMessage: '',
	},
	error: [],
};

export const data = {
	firstName: 'shema',
};
