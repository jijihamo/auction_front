import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId3 = '';
let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getList(args) {
	if (requestId3) {
		axios.cancel(requestId3);
	}
	requestId3 = 'request3';
	try {
		const params = {
			sw_lat: args.sw_lat ? args.sw_lat : vars.sw_lat,
			sw_lng: args.sw_lng ? args.sw_lng : vars.sw_lng,
			ne_lat: args.ne_lat ? args.ne_lat : vars.ne_lat,
			ne_lng: args.ne_lng ? args.ne_lng : vars.ne_lng,
			currentPage: args.currentPage ? args.currentPage : 1,
			keyword: args.keyWord != null ? args.keyWord : vars.keyWord,
			orderby: args.orderby ? args.orderby : '',
			hq : args.hq ? args.hq : '',
			msq : args.msq ? args.msq : '',
		};
		// console.log(params);
		const response = await axios.get('http://13.209.76.116/records_test.php', {
			requestId: requestId3,
			headers: {
				'Content-Type': 'application/json',
			},
			params: params,
		});

		vars = params;
		console.log(response.data);
		return response.data;
	} catch (error) {
		return [];
	}
}

export default getList;
