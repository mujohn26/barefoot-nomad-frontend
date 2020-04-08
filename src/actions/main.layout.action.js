export const GET_TITLE = 'GET_TITLE';

export const setTitle = title => async dispatch => {
	dispatch({
		type: GET_TITLE,
		title: title,
	});
};
