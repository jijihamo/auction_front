import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getDetail(postId) {
	if (requestId) {
		axios.cancel(requestId);
	}
	requestId = 'request1';
	try {
		const params = {
			postId: postId,
		};
		const response = await axios.get('http://13.209.76.116/record_test.php', {
			requestId: requestId,
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

export default getDetail;
