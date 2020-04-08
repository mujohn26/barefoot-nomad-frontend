const initialState = {
	title: '',
};
const mainLauyoutReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_TITLE':
			return {
				...state,
				title: action.title,
			};

		default:
			return state;
	}
};
export default mainLauyoutReducer;
