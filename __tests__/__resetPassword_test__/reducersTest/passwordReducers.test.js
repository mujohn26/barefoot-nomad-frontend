import passwordReducer from '../../../src/reducers/passwordReducer';
import {
	forgotEmailInputAction,
	resetPasswordInputAction,
	forgotPasswordInputActionError,
	resetPasswordInputActionError,
	deleteForgotErrorAction,
	isLoadingAction,
	deleteResetErrorAction 
} from '../../../__mockData__/resetPassword-mock-data';

describe('Reset Password Reducer', () => {
	it('Should  FORGOT_PASSWORD', () => {
		const getState = passwordReducer({}, forgotEmailInputAction);
		expect(getState).toEqual({
			forgotMessage: forgotEmailInputAction.payload,
		});
	});
	it('Should  RESET_PASSWORD', () => {
		const getState = passwordReducer({}, resetPasswordInputAction);
		expect(getState).toEqual({
			resetMessage: resetPasswordInputAction.payload,
		});
	});
	it('Should FORGOT_PASSWORD_ERROR', () => {
		const getState = passwordReducer({}, forgotPasswordInputActionError);
		expect(getState).toEqual({
			forgotMessageError: forgotPasswordInputActionError.message,
		});
	});
	it('Should  RESET_PASSWORD_ERROR', () => {
		const getState = passwordReducer({}, resetPasswordInputActionError);
		expect(getState).toEqual({
			resetMessageError: resetPasswordInputActionError.message,
		});
	});
	it('Should  DELETE_ERROR', () => {
		const getState = passwordReducer({}, deleteForgotErrorAction);
		expect(getState).toEqual({
			forgotMessageError: deleteForgotErrorAction.message,
		});
	});
	it('Should  LOADING', () => {
		const getState = passwordReducer({}, isLoadingAction);
		expect(getState).toEqual({
			IsLoading: isLoadingAction.IsLoading,
		});
	});
	it('Should  DELETE_RESET_ERROR', () => {
		const getState = passwordReducer({}, deleteResetErrorAction );
		expect(getState).toEqual({
			resetMessageError: 	deleteResetErrorAction.resetMessageError,
		});
	});
});
