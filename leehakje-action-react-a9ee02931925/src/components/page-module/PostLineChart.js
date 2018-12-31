/* eslint-disable jsx-a11y/mouse-events-have-key-events,no-undef,space-before-function-paren,prefer-arrow-callback,function-paren-newline,import/first,import/extensions */
/* 실거래가 라인 그래프 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from '../../../node_modules/react-chartjs-2';

// let listItemObject = null;
class PostLineChart extends Component {
	render() {
		const data = {
			labels: this.props.labels,
			datasets: [
				{
					label: '년도별 가격',
					fill: false,
					lineTension: 0.4,
					backgroundColor: 'rgba(68,48,219,1)',
					borderColor: 'rgba(68,48,219,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(68,48,219,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(68,48,219,1)',
					pointHoverBorderColor: 'rgba(68,48,219,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.props.prices,
				},
			],
		};
		return (
						<div className="chart-wrap">
							<Line data={data} />
						</div>
		);
	}
}

PostLineChart.propTypes = {
	prices: PropTypes.string.isRequired,
	labels: PropTypes.string.isRequired,
};
export default PostLineChart;
