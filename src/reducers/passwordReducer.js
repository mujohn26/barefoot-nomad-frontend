

const passwordReducer =(state={},action)=>{      

          
    switch (action.type) {
       case 'FORGOT_SUCCESS': 
       return{
           ...state,
           forgotMessage: action.payload
           
      }
        case 'RESET_SUCESS': 
        return{
            ...state,
            resetMessage: action.payload
        }
        case 'FORGOT_ERROR': 
        return{
            ...state,
            forgotMessageError: action.message
        }
        case 'RESET_ERROR': 
        return{
            ...state,
            resetMessageError: action.message
        }
        case 'DELETE_ERROR':
                return{
                    ...state,
                    forgotMessageError: ''
                }
                case 'DELETE_RESET_ERROR':
                    return{
                        ...state,
                        resetMessageError: ''
                    }
        case 'LOADING':
        return{
        ...state,
        isLoading:action.payload
        }
        default: return state
            

    }
}
export default  passwordReducer;