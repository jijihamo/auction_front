/* eslint-disable jsx-a11y/mouse-events-have-key-events,no-undef,space-before-function-paren,prefer-arrow-callback,function-paren-newline,import/first,jsx-a11y/no-static-element-interactions */
/* 실거래가 테이블 데이터 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PostChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			number: 4,
		};
	}
	handleIncrease = () => {
		const { number } = this.state;
		this.setState({
			number: number + 4,
		});
	}
	render() {
		return (
			<div className="table table-center"id="detail-1">
				<table>
					<thead>
					<tr>
						<th>계약일</th>
						<th>가격</th>
						<th>타입</th>
						<th>동/층</th>
						<th>확정일</th>
					</tr>
					</thead>
					<tbody>
					{this.props.actualPriceRecords.reduce((result, current, i) => {
						if (i < this.state.number) {
							result.push(<tr>
								<td>{current.yearsmonth}</td>
								<td>{current.price}</td>
								<td>{current.danjinm}</td>
								<td>{current.floor}</td>
								<td>확인중</td></tr>);
						}
						return result;
					}, [])}
					<tr onClick={this.handleIncrease}>
						<td colSpan="5" className={this.props.actualPriceRecords.length <= this.state.number ? 'hide' : ''}><button ><i className="mdi mdi-chevron-down" /></button></td>
					</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
PostChart.propTypes = {
	actualPriceRecords: PropTypes.array.isRequired,
};
export default PostChart;
