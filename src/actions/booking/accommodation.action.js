import axios from "axios";
import { config } from 'dotenv';

config();

export const getAvailableAccommodationsAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/${props.accommodationId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch(getAvailableAccommodationsOnDestinationAction(results));
    }
    catch (error) {
        dispatch({ type: "GET_AVAILABLE_ACCOMMODATIONS_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

export const getAvailableAccommodationsOnDestinationAction = (results) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const images = results.data.data.accommodationImages.find(i => i.imageType == "accomodation");

        const accomodation = {
            id: results.data.data.accommodations[0].id,
            name: results.data.data.accommodations[0].name,
            availableRooms: results.data.data.accommodations[0].availableRooms,
            averageRate: results.data.data.accommodations[0].averageRate,
            firstImage: images ? images.imageUrl : ''
        }
        const results1 = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/located/${results.data.data.accommodations[0].locationId}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        let isFound = false;
        const data = results1.data.data.sort((a, b) => a.id - b.id).filter(i => {
            if (i.id != results.data.data.accommodations[0].id) {
                return i;
            }
            isFound = true;
        });
        dispatch({ type: "GET_AVAILABLE_ACCOMMODATIONS_SUCCESS", payload: isFound ? [accomodation, ...data] : data });
        dispatch({ type: "LOADING", payload: false });
        if (isFound) {
            dispatch(getAccommodationDetailsAction(accomodation.id));
        } else {
            dispatch(getAccommodationDetailsAction(data[0].id));
        }
        dispatch({ type: "LOADING", payload: false });
    }
    catch (error) {
        dispatch({ type: "GET_AVAILABLE_ACCOMMODATIONS_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

export const getAccommodationDetailsAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/${props}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "GET_ACCOMMODATION_SUCCESS", payload: results.data.data });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "GET_ACCOMMODATION_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

export const getAccommodationCommentsAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/${props}/comments`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "GET_TRIP_REQUESTS_COMMENTS_SUCCESS", payload: results.data.data });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "GET_ACCOMMODATION_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

export const rateAccommodationAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.post(`https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodations/${props.id}/ratings`, { rate: props.rate }, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "RATE_ACCOMMODATION_SUCCESS", payload: results.data.data });
    } catch (error) {
        dispatch({ type: "SHOW_SNACKBAR", payload: { message: "You have not booked that accomodation", type: 'warning' } });
    }
}

export const getUserRatingsAccommodationAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodations/${props}/ratings`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "USER_RATING_ACCOMMODATION_SUCCESS", payload: results.data.data.rate });
    } catch (error) {
        dispatch({ type: "USER_RATING_ACCOMMODATION_SUCCESS", payload: 0 });
    }
}

export const getUserLikeStatusAccommodationAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodations/${props}/like-status`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "USER_LIKES_UNLIKES_ACCOMMODATION_SUCCESS", payload: { islike: results.data.data.islike } });
    } catch (error) {
    }
}

export const getAccommodationRoomTypeAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`https://blackninjas-backend-staging.herokuapp.com/api/v1/accommodationType/${props}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "ROOM_TYPES_SUCCESS", payload: results.data.data });
    } catch (error) {
    }
}

export const updateRateAccommodationAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.patch(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/${props.item.id}/ratings`, {
            rate: props.rate
        }, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        props.item.averageRate = results.data.data.rate;
        dispatch({ type: "RATE_ACCOMMODATION_SUCCESS", payload: props.item });
        dispatch({ type: "USER_RATING_ACCOMMODATION_SUCCESS", payload: props.rate });
    } catch (error) {
        dispatch({ type: "RATE_ACCOMMODATION_FAILED", payload: true });
    }
}

export const likeAccommodationAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    try {
        const results = await axios.patch(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/${props.id}`, {
            isLike: props.isLike
        }, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "LIKE_ACCOMMODATION_SUCCESS", payload: results.data.data });
        dispatch(getUserLikeStatusAccommodationAction(props.id));
        // dispatch({ type: "USER_LIKES_UNLIKES_ACCOMMODATION_SUCCESS", payload: { islike: props.isLike } });
    } catch (error) {
        dispatch({ type: "LIKE_ACCOMMODATION_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

export const bookAccommodationAction = (props) => async dispatch => {
    dispatch({ type: "IS_BOOKING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.post(`${process.env.BACKEND_BASE_URL}/api/v1/accommodations/booking`, props.booking, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        const data = {
            id: props.booking.tripId,
            accomodation: props.accommodation,
            roomid: results.data.data.roomid,
            name: props.name
        }
        dispatch({ type: "UPDATE_TRIP_BOOKING_INFO", payload: data });
        dispatch({ type: "SHOW_SNACKBAR", payload: { message: results.data.message, type: 'success' } });
        dispatch({ type: "IS_BOOKING", payload: false });
    } catch (error) {
        dispatch({ type: "SHOW_SNACKBAR", payload: { message: 'There\'s no rooms available for accommodation facility provided.', type: 'warning' } });
        dispatch({ type: "IS_BOOKING", payload: false });
    }
}

export const setSnackBarMessageAction = (props) => dispatch => {
    dispatch({ type: "SHOW_SNACKBAR", payload: props });
}

export const setOtherInfoAction = (props) => dispatch => {
    dispatch({ type: "SET_OTHER_INFO", payload: props });
}

export const selectTripToBookAccommodationAction = (props) => dispatch => {
    dispatch({ type: "SELECT_TRIP", payload: props });
}
