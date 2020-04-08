const initialState = {
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
		updateStatus: '',
		errorMessage: '',
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
		updateStatus: '',
		errorMessage: '',
	},
	error: [],
};
const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USER_PROFILE':
			const userInfo = action.userProfileInfo.data;

			return {
				...state,
				userProfileInfo: { ...state.userProfileInfo, ...userInfo },
				UpdateduserProfileInfo: {
					...state.UpdateduserProfileInfo,
					...userInfo,
				},
			};
		case 'CHANGE_STATE':
			const changeStateData = action.attribute;
			return {
				...state,
				userProfileInfo: { ...state.userProfileInfo, ...changeStateData },
			};
		case 'UPLOAD_IMAGE_SUCCESS':
			const uploadImageData = action.attribute;
			return {
				...state,
				userProfileInfo: { ...state.userProfileInfo, ...uploadImageData },
			};
		case 'ERROR_UPLOAD_IMAGE':
			const uploadImageError = action.attribute;
			uploadImageError.profileImage = state.UpdateduserProfileInfo.profileImage;
			return {
				...state,
				UpdateduserProfileInfo: {
					...state.userProfileInfo,
					...uploadImageError,
				},
				userProfileInfo: {
					...state.userProfileInfo,
					...uploadImageError,
				},
			};
		case 'HTTP_REQUEST_START':
			const httpRequestData = action.attribute;
			return {
				...state,
				userProfileInfo: { ...state.userProfileInfo, ...httpRequestData },
			};

		case 'UPDATE_USER_PROFILE':
			const userUpdatedInfo = action.updatedProfile;
			userUpdatedInfo.birthdate =
				userUpdatedInfo.birthdate == '1719-01-01'
					? ''
					: userUpdatedInfo.birthdate;
			return {
				...state,
				UpdateduserProfileInfo: {
					...state.UpdateduserProfileInfo,
					...userUpdatedInfo,
				},
				userProfileInfo: { ...state.userProfileInfo, ...userUpdatedInfo },
			};

		case 'CANCEL_USER_UPDATE':
			return {
				...state,
				userProfileInfo: {
					...state.userProfileInfo,
					...state.UpdateduserProfileInfo,
				},
			};

		default:
			return state;
	}
};
export default userProfileReducer;
