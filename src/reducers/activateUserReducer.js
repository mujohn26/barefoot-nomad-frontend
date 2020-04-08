const activateUserReducer =( state = { isActivated: false, activateMessage: '', activationFailed: false, hasRequestMade: false }, action )=>{
    switch (action.type) {
        case 'ACTIVATE_MESSAGE': 
        return{
            ...state,
            activateMessage: action.payload,
        }
        case 'ACTIVATED_SUCCESS': 
        return{
            ...state,
            isActivated: action.payload
        }
        case 'ACTIVATION_ERROR': 
        return{
            ...state,
            activationFailed: action.payload
        }
        case 'MAKEREQUEST': 
        return{
            ...state,
            hasRequestMade: action.payload
        }
        default: return state
    }
}
export default activateUserReducer;