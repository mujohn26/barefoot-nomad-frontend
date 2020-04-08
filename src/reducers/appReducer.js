const appReducer =(state={isLoading: false}, action)=>{
    switch (action.type) {
        case 'LOADING': 
        return{
            isLoading: action.payload
        }
        default: 
            return state;
    }
}
export default appReducer;
