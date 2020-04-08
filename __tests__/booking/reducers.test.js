import bookingReducer from '../../src/reducers/accommodations/accomodation.reducers';

const initialState = { availableAccommodations: [], accommodation: {}, snackbarMessage: { message: '', type: 'warning' }, userRating: 0, otherInfo: {}, roomTypes: [], isBooking: false, tripInfo: {}, userLikes: { islike: false } };

describe('App booking reducers tests', () => {
    it('should return default', () => {
        bookingReducer(undefined, { type: "SHOW", payload: { message: 'Failed to book an accommodation', type: 'warning' } });
        const result = bookingReducer(initialState, { type: "SHOW", payload: { message: 'Failed to book an accommodation', type: 'warning' } });
        expect(result).toEqual(initialState);
    })

    it('should show snackbar', () => {
        const result = bookingReducer(initialState, { type: "SHOW_SNACKBAR", payload: { message: 'Failed to book an accommodation', type: 'warning' } });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: 'Failed to book an accommodation', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should get available accommodation', () => {
        const result = bookingReducer(initialState, { type: "GET_AVAILABLE_ACCOMMODATIONS_SUCCESS", payload: [] });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should get accommodation', () => {
        const result = bookingReducer(initialState, { type: "GET_ACCOMMODATION_SUCCESS", payload: {} });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should get room types', () => {
        const result = bookingReducer(initialState, { type: "ROOM_TYPES_SUCCESS", payload: [] });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should get user ratting', () => {
        const result = bookingReducer(initialState, { type: "USER_RATING_ACCOMMODATION_SUCCESS", payload: 2 });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 2,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should change isBooking', () => {
        const result = bookingReducer(initialState, { type: "IS_BOOKING", payload: false });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should set otherInfo', () => {
        const result = bookingReducer(initialState, { type: "SET_OTHER_INFO", payload: {} });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should set selected trip', () => {
        const result = bookingReducer(initialState, { type: "SELECT_TRIP", payload: {} });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should set userLikes', () => {
        const result = bookingReducer(initialState, { type: "USER_LIKES_UNLIKES_ACCOMMODATION_SUCCESS", payload: { islike: false } });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {},
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should update user likes', () => {
        const result = bookingReducer({ ...initialState, accommodation: { accommodations: [{ id: 1 }, { id: 2 }] } }, { type: "LIKE_ACCOMMODATION_SUCCESS", payload: { id: 1 } });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {
                accommodations: [{ id: 1 }, { id: 2 }]
            },
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })

    it('should update accommodation rattings', () => {
        const result = bookingReducer({ ...initialState, accommodation: { accommodations: [{ id: 1 }, { id: 2 }] } }, { type: "RATE_ACCOMMODATION_SUCCESS", payload: { id: 1 } });
        expect(result).toEqual({
            availableAccommodations: [],
            accommodation: {
                accommodations: [{ id: 1 }, { id: 2 }]
            },
            snackbarMessage: { message: '', type: 'warning' },
            userRating: 0,
            otherInfo: {},
            roomTypes: [],
            isBooking: false,
            tripInfo: {},
            userLikes: { islike: false }
        });
    })
})