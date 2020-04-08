import signupReducer from '../../src/reducers/signupReducer';

describe('App reducer tests', () => {
    it('shoult set isLoading to true', () => {
        const result = signupReducer({isSignedup: false, signupError: ''}, {type: "SIGNUP_SUCCESS", payload: true});
        expect(result).toEqual({isSignedup: true, signupError: ''});
    })
    it('shoult set isLoading to true', () => {
        const result0 = signupReducer(undefined, {type: "SIGNUP_ERROR", payload: 'Provided email is already registered'});
        expect(result0).toEqual({ isSignedup: false, signupError: 'Provided email is already registered' });
        const result1 = signupReducer({isSignedup: false, signupError: ''}, {type: "NOT_AVAILABLE", payload: 'Provided email is already registered'});
        expect(result1).toEqual({ isSignedup: false, signupError: '' });
        const result2 = signupReducer({isSignedup: false, signupError: ''}, {type: "SIGNUP_ERROR", payload: 'Provided email is already registered'});
        expect(result2).toEqual({isSignedup: false, signupError: 'Provided email is already registered'});
    })
})
