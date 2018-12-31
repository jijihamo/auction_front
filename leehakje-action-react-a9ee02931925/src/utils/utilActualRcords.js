import axios from 'axios';
import axiosCancel from 'axios-cancel';

let requestId2 = '';
// let vars = [];

axiosCancel(axios, {
	debug: false,
});

async function getActualpriceData(args) {
	if (requestId2 === 'request2') {
		axios.cancel(requestId2);
	}
	requestId2 = 'request2';
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
		const response = await axios.get('http://13.209.76.116/actualprice_records.php', {
			requestId: requestId2,
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

export default getActualpriceData;
