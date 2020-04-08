import {RESET_PASSWORD_SUCESS,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_ERROR,RESET_PASSWORD_ERROR,DELETE_ERROR } from '../src/actions/resetPasswordAction';

export const props = {
	stateObject: {
		passwordReducer: {
			message: 'user not found!',
		},
	},
	classes: {
		paper:""
	},
	forgotMessage:'Email sent please ',
	resetMessage:'Password has successfuly changed',
	forgotMessageError:'user not found',
	state:{
		email:'mujohn25@gmail.com'
	},
	
	sendResetLink:jest.fn(),
	forgotPassword:jest.fn(),
	forgotPasswordError:jest.fn(),
	deleteForgotError:jest.fn(),
	resetPassword:jest.fn(),
	deleteResetError:jest.fn()
	
};
export const forgotEmailInputAction = {
	type: FORGOT_PASSWORD_SUCCESS,
	payload: 'reset link sent',
  };
  export const resetPasswordInputAction = {
	type:  RESET_PASSWORD_SUCESS,
	payload:{  
	status: 200,
    message: "Password has successfuly changed",
    data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibXVqb2huMjZAZ21haWwuY29tIiwiaXNWZXJpZmllZCI6dHJ1ZSwiaWQiOjJ9LCJpYXQiOjE1ODA5MzczNTksImV4cCI6MTU4MTAyMzc1OX0.3IUkdzh7WxLyLYBi6hYNke_9ySu3l81yD7YR5mqCiYA",}
  };
  export const forgotPasswordInputActionError = {
	type: FORGOT_PASSWORD_ERROR,
	message:'user not found'
  };
  export const resetPasswordInputActionError = {
	type: RESET_PASSWORD_ERROR,
	message: [
		   "Password should be provided and must be alphanumeric with atleast 8 charactors.",
		    "conform Password should be provided and must be alphanumeric with atleast 8 charactors."
	            ]
  };
  export const deleteForgotErrorAction = {
	type: DELETE_ERROR,
	message: '',
  };
  export const deleteResetErrorAction = {
	type:'DELETE_RESET_ERROR',
	resetMessageError: ''
  };
  export const isLoadingAction = {
	type: 'LOADING',
	isLoading:true
  };
