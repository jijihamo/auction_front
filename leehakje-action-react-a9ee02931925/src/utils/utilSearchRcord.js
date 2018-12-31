import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId4 = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getSearchMapXY(keyword) {
	if (requestId4) {
		axios.cancel(requestId4);
	}
	requestId4 = 'request4';

	try {
		const params = {
			q: keyword,
		};
		const response = await axios.get('http://13.209.76.116/search_q_record.php', {
			requestId: requestId4,
			headers: {
				'Content-Type': 'application/json',
			},
			params: params,
		});
		// vars = params;
		// console.log(response);
		return response.data;
	} catch (error) {
		return [];
	}
}

export default getSearchMapXY;
