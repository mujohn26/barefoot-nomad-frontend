const getTripRequestCommentsReducer = (state = { comments: [], failed: false, commentsSize: 0 }, action) => {
    switch (action.type) {
        case 'GET_TRIP_REQUESTS_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: action.payload.comments,
                commentsSize: action.payload.commentsSize
            }
        case 'GET_MORE_TRIP_REQUESTS_COMMENTS_SUCCESS':
            return {
                ...state,
                comments: [...state.comments, ...action.payload.comments],
                commentsSize: action.payload.commentsSize
            }
        case 'GET_TRIP_REQUESTS_COMMENTS_FAILED':
            return {
                ...state,
                failed: action.payload,
            }
        case 'SAVE_TRIP_REQUESTS_COMMENT_SUCCESS':
            return {
                ...state,
                comments: [action.payload, ...state.comments],
            }
        case 'SAVE_TRIP_REQUESTS_COMMENT_FAILED':
            return {
                ...state,
                failed: action.payload,
            }
        case 'DELETE_TRIP_REQUESTS_COMMENT_SUCCESS':
            return {
                ...state,
                comments: [...state.comments.filter(item => item.id != action.payload)]
            }
        case 'DELETE_TRIP_REQUESTS_COMMENT_FAILED':
            return {
                ...state,
                failed: action.payload,
            }
        default: return state
    }
}
export default getTripRequestCommentsReducer;