const tripStatisticsReducer = (state = { statistics: {} }, action) => {

   switch (action.type) {
      case 'GET_STATS':
         return {
            ...state,
            statistics: action.payload
         }

      default:
         return state;
   }
}

export default tripStatisticsReducer;
