/* eslint-disable jsx-a11y/mouse-events-have-key-events,no-undef,space-before-function-paren,prefer-arrow-callback,function-paren-newline */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getActualpriceData from '../../utils/utilActualRcords';
import getActualAvg from '../../utils/utilActualAvg';
import PostChart from '../page-module/PostChart';
import PostLineChart from '../page-module/PostLineChart';

// import sample1 from '../assets/images/sample01.jpg';

// let listItemObject = null;
class BuildingListItem extends Component {
	constructor(props) {
		super(props);
		this.onFocus = this.onFocus.bind(this);
		// this.state = { focusID : 0 };
		// listItemObject = this;
		this.state = {
			actualPriceRecords: [],
			labels: [],
			prices: [],
			m2s: [],
			maxPrice: 0,
			minPrice: 0,
			sixAvg: 0,
			oneAvg: 0,
			naverGroundUrl: '',
			chartTypeOn: {
				a: 'on',
				b: '',
				c: '',
				d: '',
				chartType: 'a',
			},
			maemaeType: '전월세',
			m2Val: 'All',
			listDrop: {
				type: 'hide',
				m2: 'hide',
			},
		};
		const params = {
			id: '',
			years: this.state.chartTypeOn.chartType,
			type: this.state.maemaeType,
			address: this.props.buildingPopRecord.newPlatPlc,
			buildnm: this.props.buildingPopRecord.bldNm,
			m2: this.state.m2Val,
		};
		this.getActualPrice(params);
		this.getActualAvg(params);
	}
	componentDidMount() {
		//
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
	getActualPrice(params) {
		this.reLoadActualpriceData();
		getActualpriceData(params).then((request) => {
			if ('data' in request) {
				console.log(request);
				this.setState({
					// recordApt: request.data.records,
					actualPriceRecords: request.data.records,
				});
				this.state.actualPriceRecords.forEach((row) => {
					// console.info(row);
					this.setState({
						// recordApt: request.data.records,
						m2Val: params.m2,
						labels: this.state.labels.concat(row.yearsmonth),
						prices: this.state.prices.concat(row.price),
						m2s: this.state.m2s.concat(row.m2),
					});
				});
				if (this.state.prices.length <= 0) {
					this.setState({
						labels: [0, 1],
						prices: [0, 0],
					});
				}
				// console.log(this.state.m2s);
				// const max = Math.max([23000, 29500, 30750, 41800]);
				const max = Math.max.apply(null, this.state.prices);
				const min = Math.min.apply(null, this.state.prices);
				// console.log(max);
				this.setState({
					maxPrice: Number.isInteger(max) ? this.convertToPrice(max) : '',
					minPrice: Number.isInteger(min) ? this.convertToPrice(min) : '',
				});
			}
		});
	}
	getActualAvg(params) {
		getActualAvg(params).then((request) => {
			if ('data' in request) {
				console.log(request);
				this.setState({
					oneAvg: Number.isInteger(request.data.records.oneavg) ? this.convertToPrice(request.data.records.oneavg) : 0,
					sixAvg: Number.isInteger(request.data.records.sixavg) ? this.convertToPrice(request.data.records.sixavg) : 0,
					naverGroundUrl : request.data.records.naver_ground_url,
				});
			}
		});
	}
	reLoadActualpriceData() {
		this.setState({
			labels: [],
			prices: [],
			m2s: [],
		});
	}
	convertToPrice(price) {
		let minPriceStr = '';
		const intPriceHundred = Math.floor(price / 100) % 10;
		const intPriceThousand = Math.floor(price / 1000) % 10;
		const intPriceHundredMillion = Math.floor(price / 10000);
		const chun = intPriceThousand === 0 ? '' : `${intPriceThousand}천`;
		const baek = intPriceHundred === 0 ? '' : `${intPriceHundred}백`;
		// console.log(price);
		// console.log(`${intPriceHundredMillion}억${intPriceThousand}천${intPriceHundred}백`);
		minPriceStr = price >= 10000 ? `${intPriceHundredMillion}억 ${chun}` : `${chun} ${baek}`;
		return minPriceStr;
	}
	handleClickeventDropType = () => {
		if (this.state.listDrop.type === 'hide') {
			this.setState({
				listDrop: {
					type: '',
					m2: 'hide',
				},
			});
		} else if (this.state.listDrop.type === '') {
			this.setState({
				listDrop: {
					type: 'hide',
					m2: 'hide',
				},
			});
		}
	}
	handleClickeventDropM2 = () => {
		if (this.state.listDrop.m2 === 'hide') {
			this.setState({
				listDrop: {
					type: 'hide',
					m2: '',
				},
			});
		} else if (this.state.listDrop.m2 === '') {
			this.setState({
				listDrop: {
					type: 'hide',
					m2: 'hide',
				},
			});
		}
	}
	dropDownHide() {
		this.setState({
			listDrop: {
				type: 'hide',
				m2: 'hide',
			},
		});
	}
	handleClickeventMaeMaeType = (e) => {
		this.dropDownHide();
		this.setState({
			maemaeType: e.target.value,
		});
		const params = {
			id: '',
			years: this.state.chartTypeOn.chartType,
			type: e.target.value,
			address: this.props.buildingPopRecord.newPlatPlc,
			buildnm: this.props.buildingPopRecord.bldNm,
			m2: this.state.m2Val,
		};
		this.getActualPrice(params);
	}
	handleClickeventM2Type = (e) => {
		this.dropDownHide();
		this.setState({
			m2Val: e.target.value,
		});
		const params = {
			id: '',
			years: this.state.chartTypeOn.chartType,
			type: this.state.maemaeType,
			address: this.props.buildingPopRecord.newPlatPlc,
			buildnm: this.props.buildingPopRecord.bldNm,
			m2: e.target.value,
		};
		this.getActualPrice(params);
	}
	handleClickeventYearsType = (e) => {
		this.dropDownHide();
		console.log(e.target.value);
		this.setState({
			chartTypeOn: {
				a: '',
				b: '',
				c: '',
				d: '',
			},
		});
		if (e.target.value === 'a') {
			this.setState({
				chartTypeOn: {
					a: 'on',
					chartType: 'a',
				},
			});
		}
		if (e.target.value === 'b') {
			this.setState({
				chartTypeOn: {
					b: 'on',
					chartType: 'b',
				},
			});
		}
		if (e.target.value === 'c') {
			this.setState({
				chartTypeOn: {
					c: 'on',
					chartType: 'c',
				},
			});
		}
		if (e.target.value === 'd') {
			this.setState({
				chartTypeOn: {
					d: 'on',
					chartType: 'd',
				},
			});
		}
		const params = {
			id: '',
			years: e.target.value,
			type: this.state.maemaeType,
			address: this.props.buildingPopRecord.newPlatPlc,
			buildnm: this.props.buildingPopRecord.bldNm,
			m2: this.state.m2Val,
		};
		this.getActualPrice(params);
	}
	render() {
		return (
			<div className="col-4 info-section actual-section">
				<div className="actual-header">
					<div className="actual-title">{this.props.buildingPopRecord.bldNm !== '' ? this.props.buildingPopRecord.bldNm : '건물 이름 정보 없음'}</div>
					<div><button onClick={this.props.deleteComponent} className="close" ><i className="mdi mdi-close" /></button></div>
					<div className="actual-dropdown dropdown">
						<button className="sale dropdown-toggle" onClick={this.handleClickeventDropType} type="button">
							<button className="dropdown-item">{this.state.maemaeType}</button>
							<ul className={`list-layer ${this.state.listDrop.type}`}>
								<li>
									<button className="btn-chart-type" onClick={this.handleClickeventMaeMaeType} value="전월세">전월세</button>
								</li>
								<li>
									<button className="btn-chart-type" onClick={this.handleClickeventMaeMaeType} value="매매">매매</button>
								</li>
							</ul>
						</button>
						<button className="measure dropdown-toggle" type="button" onClick={this.handleClickeventDropM2}>
							<button className="dropdown-item"> {this.state.m2Val} <span className="status-text"> (m²)</span></button>
							<ul className={`list-layer ${this.state.listDrop.m2}`}>
								<li>
									<button value="All" onClick={this.handleClickeventM2Type}>All</button>
								</li>
								{this.state.m2s.map((row) => {
									return (
										<li>
											<button value={row} onClick={this.handleClickeventM2Type}>
												{row}
												<span className="status-text"> (m²)</span>
											</button>
										</li>
									);
								})}
							</ul>
						</button>
					</div>
				</div>
				<div className="actual-contents">
					<div className="row group">
						<div className="inner">
							<div className="real-price">
								<div className="chart">
									<div className="chart-container">
										<div className="chart-type">
											<div className={`chart-menu-type ${this.state.chartTypeOn.a}`}>
												<button className="btn-chart-type" onClick={this.handleClickeventYearsType} value="a">5년</button>
											</div>
											<div className={`chart-menu-type ${this.state.chartTypeOn.b}`}>
												<button className="btn-chart-type" onClick={this.handleClickeventYearsType} value="b">10년</button>
											</div>
											<div className={`chart-menu-type ${this.state.chartTypeOn.c}`}>
												<button className="btn-chart-type" onClick={this.handleClickeventYearsType} value="c">전세/매매</button>
											</div>
											<div className={`chart-menu-type ${this.state.chartTypeOn.d}`}>
												<button className="btn-chart-type" onClick={this.handleClickeventYearsType} value="d">증감률</button>
											</div>
										</div>
										<div className="chart-status">
											<span className="status-text">최고 {this.state.maxPrice} /</span>
											<span className="status-text">최저  {this.state.minPrice}</span>
											<span className="status-text">총 {this.state.actualPriceRecords.length}건</span>
										</div>
										<PostLineChart prices={this.state.prices} labels={this.state.labels} />
									</div>
								</div>
								<div className="price-group">
									<h3 className="title">6달 전 매매 실거래 평균</h3>
									<div className="price">{this.state.sixAvg}</div>
									<div className="caption">
										<a href="naver.com">국토교통부 평균 가격</a>
									</div>
								</div>
								<div className="trade-price-group">
									<h3 className="title">최근 매물 평균</h3>
									<div className="price">{this.state.oneAvg}</div>
									<div className="caption">
										<a href="naver.com">1개월 평균 가격</a>
									</div>
								</div>
								<PostChart actualPriceRecords={this.state.actualPriceRecords} />
							</div>
						</div>
					</div>
						<div className="row group">
							<div className="inner clearfix">
								<div className="base-info clearfix">
									<ul>
										<li>{this.props.buildingPopRecord.mainPurpsCdNm}</li>
										<li>{this.props.buildingPopRecord.hhldCnt}</li>
										<li>1개동</li>
										<li>최고 {this.props.buildingPopRecord.grndFlrCnt}층</li>
										<li>용적율 {this.props.buildingPopRecord.vlRat}%</li>
										<li>건폐율 {this.props.buildingPopRecord.bcRat}%</li>
										<li>총 주차 {this.props.buildingPopRecord.park_cnt}대 가능</li>
										<li>개별난방(보류)</li>
										<li>도시가스(보류)</li>
										<li>내진설계대상(보류)</li>
									</ul>
								</div>
								<div className="floor-plan clearfix">
									<a href={this.state.naverGroundUrl}>
										{this.state.naverGroundUrl !== '' ? '네이버 평면도 보기' : ''}
									</a>
								</div>
							</div>
						</div>
					<div className="row group hide">
						<div className="inner">
							<h2 className="title">
								아파트 관리비 평균(보류)
								<span className="caption">공동주택관리시스템 제공</span>
							</h2>
							<div className="apt-average-price">
								<ul>
									<li>
										<span className="type">겨울 (12월)</span>
										<p className="cost">40만원</p>
									</li>
									<li>
										<span className="type">여름 (8월)</span>
										<p className="cost">28만원</p>
									</li>
									<li>
										<span className="type">최소 (4월)</span>
										<p className="cost">16만원</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="row group hide">
						<div className="inner">
							<h2 className="title">주변 입주 예정 아파트(보류)</h2>
							<div className="nearby">
								<ul>
									<li>
										<a href="naver.com">
                          <span className="left">
                              <span className="name">모라동 구남역 동원로얄듀크</span>
                              <span className="date">2019년 2월</span>
                              <span className="household">498세대</span>
                              <span className="py">, 37평</span>
                          </span>
											<span className="right">
                            <span className="price">2.9억</span>
                          </span>
										</a>
									</li>
									<li>
										<a href="naver.com">
                        <span className="left">
                            <span className="name">모라동 구남역 동원로얄듀크</span>
                            <span className="date">2019년 2월</span>
                            <span className="household">498세대</span>
                            <span className="py">, 37평</span>
                        </span>
											<span className="right">
                          <span className="price">3.3억</span>
                        </span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
//
BuildingListItem.propTypes = {
	buildingPopRecord: PropTypes.object.isRequired,
	deleteComponent: PropTypes.func.isRequired,
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

export default BuildingListItem;
