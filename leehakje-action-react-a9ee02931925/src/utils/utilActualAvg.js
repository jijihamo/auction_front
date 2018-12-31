import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId7 = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getActualAvg(args) {
	if (requestId7 === 'request7') {
		axios.cancel(requestId7);
	}
	requestId7 = 'request7';
	try {
		const params = {
			postId: args.id ? args.id : '',
			years:  args.years ? args.years : '',
			type: args.type ? args.type : '',
			address: args.address ? args.address : '',
			buildnm: args.buildnm ? args.buildnm : '',
			m2: args.m2 ? args.m2 : '',
		};
		// console.log(params);
		const response = await axios.get('http://13.209.76.116/actual_avg_record.php', {
			requestId: requestId7,
			headers: {
				'Content-Type': 'application/json',
			},
			params: params,
		});
		// vars = params;
		return response.data;
	} catch (error) {
		console.log('error');
		console.log(error);
		return [];
	}
}

export default getActualAvg;
