const signupReducer =( state = { isSignedup: false, signupError: '' }, action )=>{
    switch (action.type) {
        case 'SIGNUP_SUCCESS': 
        return{
            ...state,
            isSignedup: action.payload,
        }
        case 'SIGNUP_ERROR': 
        return{
            ...state,
            signupError: action.payload
        }
        default: return state
    }
}
export default signupReducer;