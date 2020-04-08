export const props = {
    signInReducer: {
        user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…A0MH0.oMzzh3sFKmdHNp0izkG5aoiaKdn47GOg1vXho1ELy5Q',
        error: 'user not found!',
    },
    appReducer: {
        isLoading: false,
    },
    user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…A0MH0.oMzzh3sFKmdHNp0izkG5aoiaKdn47GOg1vXho1ELy5Q',
    message: {
        loggingIn: {
            signInReducer: {
                user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…A0MH0.oMzzh3sFKmdHNp0izkG5aoiaKdn47GOg1vXho1ELy5Q',
                error: 'user not found!',
            },
        },
    },
	stateObject: {
		signInReducer: {
            user: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…A0MH0.oMzzh3sFKmdHNp0izkG5aoiaKdn47GOg1vXho1ELy5Q',
			error: 'user not found!',
		},
    },

	classes: {
        paper: "",
        form: "",
        submit: "",
        link: "",
        socialauth: "",
        aanchor_tags_class: ""
    },
    signIn: jest.fn(),
    logout: jest.fn()

};
export const success = {
	type: 'USER_SIGNIN_SUCCESS',
	user: {status: 200, message: "user has logged in successfully", data: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkI…2OTl9.qXCLeAzSBOBN3AYa0x6t-Ncisbo2qX3me6lZquJWHfM"},
  };
export const failure = {
	type: 'USER_SIGNIN_FAILURE',
	error: {status: 404, error: "Email or password does not match"},
  };
export const logout = {
    type: 'USER_LOGOUT'
}
