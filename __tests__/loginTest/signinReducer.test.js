import signInReducer from '../../src/reducers/signInReducer';
describe('signIn reducer test ', () => {
    it('should return success message', () => {

         const action = { type: 'USER_SIGNIN_SUCCESS'};
         const initialState = { 
            "isLoading": false,
            "loggedIn": true,
            "user": undefined,
            };
         expect(signInReducer({} , action)).toEqual(initialState);
    })
    it('should return error', () => {

        const action = { type: 'USER_SIGNIN_FAILURE' };
        const initialState = { 
             "error": undefined,
            "isLoading": false,
            };
        expect(signInReducer({} , action)).toEqual(initialState);
   })
   
   it('should return initial sate', () => {

    const action = { type: 'USER_LOGOUT' };
    const initialState = {};
    expect(signInReducer({} , action)).toEqual(initialState);
})
})