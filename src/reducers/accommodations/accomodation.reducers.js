const accommodationsReducer = (state = { availableAccommodations: [], accommodation: {}, snackbarMessage: { message: '', type: 'warning' }, userRating: 0, otherInfo: {}, roomTypes: [], isBooking: false, tripInfo: {}, userLikes: { islike: false } }, action) => {
    switch (action.type) {
        case 'SHOW_SNACKBAR':
            return {
                ...state,
                snackbarMessage: action.payload,
            }
        case 'GET_AVAILABLE_ACCOMMODATIONS_SUCCESS':
            return {
                ...state,
                availableAccommodations: action.payload,
            }
        case 'GET_ACCOMMODATION_SUCCESS':
            return {
                ...state,
                accommodation: action.payload,
            }
        case 'ROOM_TYPES_SUCCESS':
            return {
                ...state,
                roomTypes: action.payload,
            }
        case 'USER_RATING_ACCOMMODATION_SUCCESS':
            return {
                ...state,
                userRating: action.payload,
            }
        case 'IS_BOOKING':
            return {
                ...state,
                isBooking: action.payload,
            }
        case 'SET_OTHER_INFO':
            return {
                ...state,
                otherInfo: { ...state.otherInfo, ...action.payload },
            }
        case 'SELECT_TRIP':
            return {
                ...state,
                tripInfo: action.payload,
            }
        case 'USER_LIKES_UNLIKES_ACCOMMODATION_SUCCESS':
            return {
                ...state,
                userLikes: action.payload,
            }
        case 'LIKE_ACCOMMODATION_SUCCESS':
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    accommodations: [...state.accommodation.accommodations.map(item => {
                        if (item.id === action.payload.id) {
                            return action.payload;
                        }
                        return item;
                    })]
                },
            }
        case 'RATE_ACCOMMODATION_SUCCESS':
            return {
                ...state,
                accommodation: {
                    ...state.accommodation,
                    accommodations: [...state.accommodation.accommodations.map(item => {
                        if (item.id === action.payload.id) {
                            return action.payload;
                        }
                        return item;
                    })]
                },
            }
        default: return state
    }
}
export default accommodationsReducer;