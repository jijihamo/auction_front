import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId5 = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getBuildingData(args) {
	if (requestId5 === 'request5') {
		axios.cancel(requestId5);
	}
	requestId5 = 'request5';
	try {
		const params = {
			postId: args.postId ? args.postId : '',
			sw_lat: args.sw_lat ? args.sw_lat : '',
			sw_lng: args.sw_lng ? args.sw_lng : '',
			ne_lat: args.ne_lat ? args.ne_lat : '',
			ne_lng: args.ne_lng ? args.ne_lng : '',
		};
		const response = await axios.get('http://13.209.76.116/building_records.php', {
			requestId: requestId5,
			headers: {
				'Content-Type': 'application/json',
			},
			params: params,
		});
		// vars = params;
		return response.data;
	} catch (error) {
		return [];
	}
}

export default getBuildingData;
