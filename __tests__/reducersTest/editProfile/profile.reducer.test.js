import ProfileReducer from '../../../src/reducers/user.profile.reducer';
import {
	startLoader,
	uploadUserImage,
	changeAttribute,
	updateUserProfile,
	GetUserProfileReducer,
	cancelUserUpdate,
	initialState,
	FailuploadUserImage,
} from '../../../__mockData__/redux-mock-data';

describe('edit user profile', () => {
	it('Should change Attribute', () => {
		const getState = ProfileReducer({}, changeAttribute);
		expect(getState).toEqual({
			userProfileInfo: changeAttribute.attribute,
		});
	});
	it('Should  update user profile', () => {
		const getState = ProfileReducer({}, updateUserProfile);
		expect(getState).toEqual({
			UpdateduserProfileInfo: updateUserProfile.updatedProfile,
			userProfileInfo: updateUserProfile.updatedProfile,
		});
	});

	it('Should  start loader', () => {
		const getState = ProfileReducer({}, startLoader);
		expect(getState).toEqual({
			userProfileInfo: startLoader.attribute,
		});
	});

	it('Should  upload a User Image', () => {
		const getState = ProfileReducer({}, uploadUserImage);
		expect(getState).toEqual({
			userProfileInfo: uploadUserImage.attribute,
		});
	});

	it('should fail  to upload User Image', () => {
		const getState = ProfileReducer(
			{ UpdateduserProfileInfo: { profileImage: '' } },
			FailuploadUserImage,
		);
		expect(getState).toBeTruthy();
	});
	it('Should  Get User Profile', () => {
		const getState = ProfileReducer({}, GetUserProfileReducer);
		expect(getState).toEqual({
			userProfileInfo: GetUserProfileReducer.userProfileInfo.data,
			UpdateduserProfileInfo: GetUserProfileReducer.userProfileInfo.data,
		});
	});

	it('Should  cancel Update', () => {
		const getState = ProfileReducer(initialState, cancelUserUpdate);
		expect(getState).toEqual(initialState);
	});

	it('Should  default', () => {
		const getState = ProfileReducer(initialState, initialState);
		expect(getState).toEqual({
			userProfileInfo: initialState.userProfileInfo,
			UpdateduserProfileInfo: initialState.UpdateduserProfileInfo,
			error: [],
		});
	});
});
