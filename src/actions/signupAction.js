import axios from "axios";
import { config } from 'dotenv';

config();

const signupAction = (props) => async dispatch => {
    dispatch({ type: "LOADING", payload: true });
    
    const user = {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        country: props.country,
        password: props.password
    };

    try {
        await axios.post(`${process.env.BACKEND_BASE_URL}/api/v1/auth/signup`, { ...user });
        dispatch({ type: "SIGNUP_ERROR", payload: '' });
        dispatch({ type: "LOADING", payload: false });
        dispatch({ type: "SIGNUP_SUCCESS", payload: true });
    } catch (error) {
        dispatch({ type: "SIGNUP_ERROR", payload: error.response.data.error });
        dispatch({ type: "LOADING", payload: false });
    }

}

export const setErrorAction = (value) => dispatch => {
    dispatch({ type: "SIGNUP_ERROR", payload: value });
}

export default signupAction;
