const focusBox = (state = null, action) =>
	Object.assign({}, state, {
		focusID: action.focusID ? action.focusID : '0',
	});

export default focusBox;
