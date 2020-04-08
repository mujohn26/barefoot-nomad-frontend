import axios from "axios";
import { config } from 'dotenv';

config();

export const getTripRequestCommentsAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${props}/comments/?page=1&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({ type: "GET_TRIP_REQUESTS_COMMENTS_SUCCESS", payload: { comments: results.data.data.rows, commentsSize: results.data.data.count } });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "GET_TRIP_REQUESTS_COMMENTS_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }

}

export const getMoreTripRequestCommentsAction = (props) => async dispatch => {

    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${props.tripId}/comments/?page=${props.page}&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'token': `Bearer ${token}`,
            }
        });
        dispatch({
            type: "GET_MORE_TRIP_REQUESTS_COMMENTS_SUCCESS", payload: { comments: results.data.data.rows, commentsSize: results.data.data.count }
        });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "GET_TRIP_REQUESTS_COMMENTS_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }

}

export const saveTripRequestCommentAction = (props) => async dispatch => {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`,
    };

    dispatch({ type: "LOADING", payload: true });

    try {
        const results = await axios.post(`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${props.tripId}/comments`,
            props.comment, { headers }
        );
        const d = {
            ...results.data.data, user: props.user
        }
        dispatch({ type: "SAVE_TRIP_REQUESTS_COMMENT_SUCCESS", payload: d });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "SAVE_TRIP_REQUESTS_COMMENT_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }

}

export const deleteTripRequestCommentAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'token': `Bearer ${token}`,
    };
    try {
        await axios.delete(`${process.env.BACKEND_BASE_URL}/api/v1/trip-requests/${props.tripId}/comments/${props.id}`, { headers });
        dispatch({ type: "DELETE_TRIP_REQUESTS_COMMENT_SUCCESS", payload: props.id });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "DELETE_TRIP_REQUESTS_COMMENT_FAILED", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }
}

