const listBox = (state = null, action) =>
	Object.assign({}, state, {
		records: action.records ? action.records : [],
		currentPage: action.currentPage ? parseInt(action.currentPage, 10) : 1,
		foundRecord: action.foundRecord >= 0 ? action.foundRecord : 0,
		keyWord: action.keyWord ? action.keyWord : '',
		lat: action.lat ? action.lat : 0,
		lng: action.lng ? action.lng : 0,
		hq: action.hq ? action.hq : '',
	});

export default listBox;
