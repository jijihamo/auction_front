/* eslint-disable jsx-a11y/mouse-events-have-key-events,no-undef,space-before-function-paren,prefer-arrow-callback,function-paren-newline */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sample1 from '../assets/images/sample01.jpg';

// let listItemObject = null;
class ListItem extends Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		// this.state = { focusID : 0 };
		// listItemObject = this;
	}
	onFocus(event) {
		const tempObj = event.target;
		console.log(tempObj);
		// // console.log(focusID);
		// if (listItemObject.state.focusID !== focusID) {
		// 	this.setState({ focusID: focusID });
		// 	listItemObject.props.reLoad({ focusID: this.state.focusID });
		// }
		// listItemObject.props.reLoad({ focusID: '2010-45459' });
	}
	render() {
		return (
			<div className="col col-3 post" record-id={this.props.data.ID}>
				<Link to={`/post/${this.props.data.ID}`}>
					<div className="list">
						<div className="list-thumbnail">
							<img src={this.props.data.record_thumb ? this.props.data.record_thumb : sample1} className="img-fluid" alt="이미지" />
                            <span className="dday-bx absolute"><em>{this.props.data.record_gil_dday < 0 ? `D${this.props.data.record_gil_dday}` : this.props.data.record_MulGeonStatus}</em>
							</span>
							<span className="like absolute hide">
								<i className="mdi mdi-heart" />
							</span>
						</div>
						<div className="list-meta">
							<div className="title">사건번호 {this.props.data.record_title}</div>
							<div className="address">[{this.props.data.record_type}] {this.props.data.record_address}</div>
							<div className="row price-section clearfix">
								<div className="col-3 appraise">
									<span className="badge">감정가</span>
								</div>
								<div className="col-9">
									<div className="appraise-price price">{this.props.data.record_Appraisal_price}</div>
								</div>
							</div>
							<div className="row price-section clearfix">
								<div className="col-3 lowest">
									<span className="badge">최저가</span>
								</div>
								<div className="col-9">
									<div className="lowest-price price"><span>{this.props.data.record_Appraisal_price_percent ? `(${this.props.data.record_Appraisal_price_percent}%)` : '최저가 정보 없음'}</span>{this.props.data.record_Appraisal_min_price}</div>
								</div>
							</div>
						</div>
					</div>
				</Link>
			</div>
		);
	}
}

ListItem.propTypes = {
	data: PropTypes.object.isRequired,
};

// function reload(args) {
// 	return {
// 		type: '',
// 		focusID: args.focusID ? args.focusID : '0',
// 	};
// }
//
// const listItemStateToProps = function (state) {
// 	return {
// 		focusID: state.focusBox.focusID,
// 	};
// };
//
// const listItemDispatchToProps = dispatch => ({
// 	reLoad: args => dispatch(reload(args)),
// });
//
// ListItem = connect(listItemStateToProps, listItemDispatchToProps)(ListItem);

export default ListItem;
