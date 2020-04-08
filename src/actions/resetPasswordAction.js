export const RESET_PASSWORD_SUCESS= 'RESET_SUCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_SUCCESS';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_ERROR';
export const RESET_PASSWORD_ERROR = 'RESET_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';


import axios from 'axios';


  export const sendResetLink =  (email) => async(dispatch)=> {
    dispatch({ type: "LOADING", payload: true });
      try {
        const response= await axios.post('https://blackninjas-backend-staging.herokuapp.com/api/v1/auth/forgetpassword',{email});

              dispatch(forgotPasswordSuccess(response.data.message));
              dispatch({ type: "LOADING", payload: false });
        
      } catch (error) {    
        const errorMessage = error.response.data.error;
        dispatch(forgotPasswordError(errorMessage));
        dispatch({ type: "LOADING", payload: false });
      }
};
export const resetPassword =  ({token,updatedPassword}) => async(dispatch)=> {
  dispatch({ type: "LOADING", payload: true });

const headers = {
  'Content-Type': 'application/json',
  token: `Bearer ${token}`,
};
  try {
    const response= await axios.patch("https://blackninjas-backend-staging.herokuapp.com/api/v1/auth/resetpassword",updatedPassword, {headers});

    
    dispatch(resetPasswordSuccess(response.data.message));
  } catch (error) {
   
    const errorMessage = error.response.data.error;
  
    dispatch(resetPasswordError(errorMessage));
    dispatch({ type: "LOADING", payload: false });


    
  }
};


export function forgotPasswordSuccess(data){  
  
    return{
        type: FORGOT_PASSWORD_SUCCESS,
        payload:data
    }
}
export function forgotPasswordError (error){  
  return{
      type: FORGOT_PASSWORD_ERROR,
      message:error
  }
}
export function resetPasswordError (error){    
  return{
      type: RESET_PASSWORD_ERROR,
      message:error
  }
}
export function resetPasswordSuccess (data){    
    return{
      type: RESET_PASSWORD_SUCESS,
      payload:data
  }
}

export function deleteForgotError (){  
  return{
      type: DELETE_ERROR
  }
}

  export function deleteResetError (){  
    return{
      type: "DELETE_RESET_ERROR"
    }

}
