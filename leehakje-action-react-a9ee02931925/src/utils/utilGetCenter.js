import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId6 = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getCenter(postid) {
	if (requestId6) {
		axios.cancel(requestId6);
	}
	requestId6 = 'request6';
	try {
		const params = {
			postId: postid,
		};
		const response = await axios.get('http://13.209.76.116/map_record_center.php', {
			requestId: requestId6,
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

export default getCenter;
