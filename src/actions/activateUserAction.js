import axios from "axios";
import { config } from 'dotenv';

config();

const activateUserAction = (props) => async dispatch => {
    dispatch({ type: "MAKEREQUEST", payload: true });
    dispatch({ type: "LOADING", payload: true });
    try {
        const results = await axios.get(`${process.env.BACKEND_BASE_URL}/api/v1/auth/activate/${props}`);
        if (results.status == 200) {
            dispatch({ type: "ACTIVATED_SUCCESS", payload: true });
            dispatch({ type: "ACTIVATE_MESSAGE", payload: results.data.data.message });
            dispatch({ type: "LOADING", payload: false });
        }else{
            dispatch({ type: "ACTIVATE_MESSAGE", payload: results.data.data.message });
            dispatch({ type: "ACTIVATED_SUCCESS", payload: false });
            dispatch({ type: "LOADING", payload: false });
        }
    } catch (error) {
        dispatch({ type: "ACTIVATION_ERROR", payload: true });
        dispatch({ type: "LOADING", payload: false });
    }

}

export default activateUserAction;
