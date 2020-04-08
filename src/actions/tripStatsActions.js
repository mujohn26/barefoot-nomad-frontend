import axios from "axios";
const GET_STATS = "GET_STATS";
export const getStats = startDate => async dispatch => {
  const headers = {
    "Content-type": "application/json",
    token: `Bearer ${localStorage.getItem("token")}`
  };
  const tripStats = await axios.get(
    `${process.env.BACKEND_BASE_URL}/api/v1/trip-statistics?startDate=${startDate}`,
    { headers }
  );
  dispatch({
    type: GET_STATS,
    payload: tripStats.data.data
  });
};
