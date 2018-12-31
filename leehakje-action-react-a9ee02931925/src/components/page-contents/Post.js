/* eslint-disable jsx-quotes,react/no-unescaped-entities,jsx-a11y/img-redundant-alt */
/* 상세페이지 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getDetail from '../../utils/utilRcord';
// import sample2 from '../assets/images/sample02.jpg';
// import sample3 from '../assets/images/sample03.jpg';
import errorp from '../assets/images/none-select.png';
import DaumMapDetail from '../page-module/DaumMapDetail';
import PostChart from '../page-module/PostChart';
import getActualpriceData from '../../utils/utilActualRcords';
import getActualAvg from '../../utils/utilActualAvg';
import PostLineChart from '../page-module/PostLineChart';
import BuildingList from '../page-module/BuildingList';

class Post extends Component {
	constructor(props, { match }) {
		super(props, { match });
		this.state = {
			match: props.match,
			record: [],
			gil: [],
			thumb: '',
			buildingPopup: [],
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
		this.setData();
		const params = {
			id : this.state.match.params.id,
			years : this.state.chartTypeOn.chartType,
			type : this.state.maemaeType,
			address : '',
			buildnm : '',
			m2 : this.state.m2Val,
		};
		this.getActualPrice(params);
		this.getActualAvg(params);
	}
	componentDidMount() {
	//
	}
	calcelAlert() {
		alert('준비중입니다.');
	}
	handleBuildingPush = (data) => {
		this.setState({
			buildingPopup: this.state.buildingPopup.concat(data),
		});
	}
	handleBuildingPop = () => {
		const le = this.state.buildingPopup.length;
		console.log(le - 1);
		console.log(this.state.buildingPopup);
		this.setState({
			buildingPopup: this.state.buildingPopup.slice(0, -1),
		});
	}
	setData() {
		getDetail(this.state.match.params.id).then((request) => {
			console.log(request);
			if ('data' in request) {
				this.setState({
					record: request.data.records,
					gil: request.data.records[0].gil,
					thumb: request.data.records[0].title_thumb,
				});
			}
			// console.log(this.state.lng);
			// console.log(this.state.lat);
			/* params.id값을 기준으로 경매데이터 서치 -> 서치한 경매데이터 주소로 건물데이터 서치  */
			// record 0번 데이터는 무조건 경매데이터, 그 이후 데이터는 건물데이터
		});
	}
	getActualPrice(params) {
		this.reLoadActualpriceData();
		getActualpriceData(params).then((request) => {
			if ('data' in request) {
				// console.log(request);
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
						m2s: this.state.m2s.concat(row.m2).filter(info => info !== row.m2),
					});
				});
				if (this.state.prices.length <= 0) {
					this.setState({
						labels:[0, 1],
						prices:[0, 0],
					});
				}
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
		console.log(params);
		getActualAvg(params).then((request) => {
			if ('data' in request) {
				console.log(request);
				this.setState({
					oneAvg: Number.isInteger(request.data.records.oneavg) ? this.convertToPrice(request.data.records.oneavg) : 0,
					sixAvg: Number.isInteger(request.data.records.sixavg) ? this.convertToPrice(request.data.records.sixavg) : 0,
					naverGroundUrl: request.data.records.naver_ground_url,
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
			id : this.state.match.params.id,
			years : this.state.chartTypeOn.chartType,
			type : this.state.maemaeType,
			address : '',
			buildnm : '',
			m2 : this.state.m2Val,
		};
		this.getActualPrice(params);
	}
	handleClickeventM2Type = (e) => {
		this.dropDownHide();
		this.setState({
			m2Val: e.target.value,
		});
		const params = {
			id : this.state.match.params.id,
			years : this.state.chartTypeOn.chartType,
			type : e.target.value,
			address : '',
			buildnm : '',
			m2 : e.target.value,
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
		// const targetCN = `${e.target.parentNode.className} ${this.state.chartTyepOn.a}`;
		// e.target.parentNode.className = targetCN;
		// console.log(targetCN);
		const params = {
			id : this.state.match.params.id,
			years : e.target.value,
			type : this.state.maemaeType,
			address : '',
			buildnm : '',
			m2: this.state.m2Val,
		};
		this.getActualPrice(params);
	}
	render() {
		return (
			<div className='container'>
				<div className='row title-section clearfix text-left'>
					{this.state.record.map((row) => {
						return (
							<h2>[{row.type}] {row.detail_address}</h2>
						);
					})}
					<a href='/'><i className='mdi mdi-arrow-left' /></a>
				</div>
				<div className='row contents-section clearfix'>
					<div className='col-4 info-section'>
						<div className='img-fluid'>
							<button type='button' id='prev_btn' className='slide-btn'>
								<i className='mdi mdi-chevron-left' />
							</button>
							<button type='button' id='next_btn' className='slide-btn'>
								<i className='mdi mdi-chevron-right' />
							</button>
							<ul id='slider'>
								<li>
									<img src={this.state.thumb} alt='image' />
								</li>
							</ul>
							<div className='bg-gr absolute' />
							<button type='button' onClick={this.calcelAlert} className='view-image btn-sm absolute' data-toggle='modal' data-target='#exampleModal'>사진 크게 보기 <i className='mdi mdi-magnify-plus' /></button>
							<span className='like absolute hide'>
                <a href='naver.com'>
                    <i className='mdi mdi-heart' />
                </a>
            </span>
								{this.state.record.map((row) => {
									return (
										<div className='btn-group absolute'>
											<button className='btn-sm none-active' href='naver.com'>건물등기</button>
											<a className='btn-sm active' href={row.pyeonggaseo}>감정평가서</a>
											<button className='btn-sm none-active' href='naver.com'>현황조사서</button>
											<button className='btn-sm none-active' href='naver.com'>매각물건명세서</button>
											<button className='btn-sm none-active' href='naver.com'>세대열람내역서</button>
											<button className='btn-sm none-active' href='naver.com'>부동산표시목록</button>
											<button className='btn-sm none-active' href='naver.com'>기일내역</button>
											<button className='btn-sm none-active' href='naver.com'>문건/송달내역</button>
											<button className='btn-sm none-active' href='naver.com'>사건내역</button>
											<button className='btn-sm none-active' href='naver.com'>전자지도</button>
											<button className='btn-sm none-active' href='naver.com'>전자지적도</button>
											<button className='btn-sm none-active' href='naver.com'>로드뷰</button>
											<button className='btn-sm none-active' href='naver.com'>온나라지도</button>
										</div>
								);
								})}
						</div>
						<div className='row group'>
							{this.state.record.map((row) => {
								return (
									<div className='inner'>
										<h2 className='title number'>사건번호 {row.title}</h2>
										<div className='address'>[{row.type}] {row.detail_address}</div>
										<div className='court'><strong>법원</strong>{row.bubwon} </div>
										<div className='date'><strong>매각기일</strong>{row.gildata} <span
											className='badge'
										> 입찰 {row.gildata ? row.gil_dday : '정보 없음'}</span>
										</div>
										<div className='table table-left'>
											<table>
												<tbody>
												<tr>
													<th>대지권</th>
													<td>(보류)</td>
												</tr>
												<tr>
													<th>건물면적</th>
													<td>{row.archArea}㎡ (25.6평)</td>
												</tr>
												<tr>
													<th>감정가</th>
													<td>{row.Appraisal_price}</td>
												</tr>
												<tr>
													<th>최저가</th>
													<td>({row.Appraisal_price_percent}%){row.Appraisal_min_price}</td>
												</tr>
												<tr>
													<th>보증금</th>
													<td>(보류)</td>
												</tr>
												<tr>
													<th>매각물건</th>
													<td>(보류)</td>
												</tr>
												<tr>
													<th>{row.user1_type}</th>
													<td>{row.user1_name}</td>
												</tr>
												<tr>
													<th>{row.user2_type}</th>
													<td>{row.user2_name}</td>
												</tr>
												<tr>
													<th>{row.user3_type}</th>
													<td>{row.user3_name}</td>
												</tr>
												<tr>
													<th>사건접수</th>
													<td>{row.jub_date}</td>
												</tr>
												<tr>
													<th>사건명</th>
													<td>{row.sa_title}</td>
												</tr>
												<tr>
													<th>입찰방법</th>
													<td>{row.auction_how}</td>
												</tr>
												</tbody>
											</table>
										</div>
									</div>

								);
							})}
						</div>
						<div className='row group'>
							<div className='inner'>
								<h2 className='title'>입찰 진행 내용</h2>
								<div className='table table-center'>
									<table>
										<thead>
										<tr>
											<th>구분</th>
											<th>입찰기일</th>
											<th>최저매각가격</th>
											<th>결과</th>
										</tr>
										</thead>
										<tbody>
										{this.state.gil.map((row) => {
											return (
												<tr>
													<td>{row.MulGeonBunHo}</td>
													<td>{row.Gil}</td>
													<td>{row.GamJeongPyeongGaAek}</td>
													<td>{row.GilGyeolGwa}</td>
												</tr>
											);
										})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className='row group'>
							<div className='inner'>
								<h2 className='title'>매각 물건 현황(보류)</h2>
								<div className='title-meta'>
									<div className='appraise-charge'>
										<strong>감정원</strong>한솔감정평가
									</div>
									<div className='appraise-date'>
										<strong>가격시점</strong>2016.11.17
									</div>
									<div className='appraise-date'>
										<strong>보존등기일</strong>1999.08.12
									</div>
								</div>
								<div className='table table-left'>
									<table>
										<tbody>
										<tr>
											<th rowSpan='5'>건물</th>
											<th>위치</th>
											<td>23층 중 8층</td>
										</tr>
										<tr>
											<th>사용승인</th>
											<td>1999.08.27</td>
										</tr>
										<tr>
											<th>면적</th>
											<td>84.772㎡ (25.64평)</td>
										</tr>
										<tr>
											<th>이용상태</th>
											<td>방3, 거실, 주방/식당, 욕실2, 창고, 발코니 등</td>
										</tr>
										<tr>
											<th>감정가격</th>
											<td>255,300,000원</td>
										</tr>
										<tr>
											<th rowSpan='2'>토지</th>
											<th>대지권</th>
											<td>191659.9㎡(57977.12평) 중
												35.1121㎡(10.62평)
											</td>
										</tr>
										<tr>
											<th>감정가격</th>
											<td>89,700,000원</td>
										</tr>
										<tr>
											<th colSpan='2'>기타</th>
											<td>남동향, 개별난방</td>
										</tr>
										</tbody>
									</table>
								</div>
								<div className='environment'>
									<strong>현황·위치·주변환경</strong>
									<ul>
										{this.state.record.map((row) => {
											return (
												<li>{row.Bigo}</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
						<div className='row group'>
							<div className='inner'>
								<h2 className='title'>임차인 현황</h2>
								<div className='title-meta'>
									<div className='delete-date'>
										<strong>말소기준권리</strong>2003.12.18
									</div>
									<div className='ask-date'>
										<strong>배당요구종기일</strong>2017.01.09
									</div>
								</div>
								<div className='table table-left'>
									<table>
										<tbody>
										<tr>
											<th>임대차정보</th>
											<td>=== 채무자(소유자)점유 ===</td>
										</tr>
										<tr>
											<th>기타 참고</th>
											<td>
												<ul>
													<li>폐문부재로 안내문을 게첨함.</li>
													<li>안내문을 보고 채무자겸소유자의 배우자가 전화를 걸어와 채무자겸소유자의 가족만
														거주하고 있음을 진술함.
													</li>
													<li>동사무소에서 발급받은 전입세대열람내역소유자 가족만 전입신고되어 있음.</li>
												</ul>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className='row group '>
							<div className='inner'>
								<h2 className='title'>등기부 현황(보류)</h2>
								<div className='title-meta'>
									<strong>채권액 합계</strong>237,000,000원
								</div>
								<div className='table table-center'>
									<table>
										<thead>
										<tr>
											<th>접수일자</th>
											<th>등기목적</th>
											<th>권리자</th>
											<th>채권금액</th>
											<th>기타 등기사항</th>
											<th>소멸여부</th>
										</tr>
										</thead>
										<tbody>
										<tr>
											<td>99.12.04 (157485)</td>
											<td>소유권 이전 (매매)</td>
											<td>안병진</td>
											<td />
											<td />
											<td />
										</tr>
										<tr>
											<td>03.12.18 (72366)</td>
											<td>근저당</td>
											<td>(주)광림</td>
											<td>100,000,000</td>
											<td>말소기준등기</td>
											<td>소멸</td>
										</tr>
										<tr>
											<td>07.03.19 (11064)</td>
											<td>근저당</td>
											<td>(주)굿모닝캐피탈대부</td>
											<td>204,000,000</td>
											<td />
											<td>소멸</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						{this.state.record.map((row) => {
							return (
								<div className='row group'>
									<div className='inner'>
										<h2 className='title'>건물 정보 및 현장 조사</h2>
										<div className='table table-left'>
											<table>
												<tbody>
												<tr>
													<th>건설사(보류)</th>
													<td colSpan='3'>대림산업(주)</td>
												</tr>
												<tr>
													<th>총동수</th>
													<td>8개동</td>
													<th>총세대수</th>
													<td>{row.hhldCnt}</td>
												</tr>
												<tr>
													<th>최고층</th>
													<td>{row.grndFlrCnt}층</td>
													<th>최저층</th>
													<td>{row.ugrndFlrCnt}층</td>
												</tr>
												<tr>
													<th>총주차대수</th>
													<td colSpan='3'>{row.park_cnt}대</td>
												</tr>
												<tr>
													<th>난방방식(보류)</th>
													<td>개별난방</td>
													<th>난방연료(보류)</th>
													<td>도시가스</td>
												</tr>
												<tr>
													<th>면적유형</th>
													<td colSpan='3'>{row.archArea}㎡, {row.totArea}㎡, {row.vlRatEstmTotArea}㎡</td>
												</tr>
												<tr>
													<th>사용승인</th>
													<td colSpan='3'>{row.useAprDay}</td>
												</tr>
												<tr>
													<th>관리소(보류)</th>
													<td colSpan='3'>051-232-0849</td>
												</tr>
												<tr>
													<th>체납내역(보류)</th>
													<td colSpan='3'>
														<ul>
															<li>관리비 : 금 723,290원</li>
															<li>체납기간 : 2017.10 ~ 2018.04</li>
														</ul>
													</td>
												</tr>
												<tr>
													<th>주변환경(보류)</th>
													<td colSpan='3'>국제 코오롱 쇼핑, 부민초, 화랑초, 경남중, 대신
														여중, 경남고, 서여고, 동아대, 부민산체육공원,
														대청공원, 용두산공원, 암남공원, 부산대, 동아대
														부속병원
													</td>
												</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							);
						})}
						<div className='row group'>
							<div className='inner'>
								<h2 className='title'>지자체 정보 및 기타 현황(보류)</h2>
								<div className='table table-left'>
									<table>
										<tbody>
										<tr>
											<th>인근역과의 거리 (반경 1km 이내)</th>
											<td>1호선 토성역 502m, 1호선 동대신역 709m, 1호선 서대신역 834m</td>
										</tr>
										<tr>
											<th>부민동 주민센터 <a href='naver.com'><i className='mdi mdi-home' /></a></th>
											<td>
												<ul>
													<li>(602-842) 부산 서구 임시수도기념로 22-11</li>
													<li>전화 : 051-393-4049</li>
													<li>팩스 : 051-393-4049</li>
												</ul>
											</td>
										</tr>
										<tr>
											<th>관련 사이트</th>
											<td>
												<a href='naver.com'>부산정비사업</a>
												<a href='naver.com'>부산진해경제자유구역</a>
												<a href='naver.com'>부산도시공사</a>
											</td>
										</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					{this.state.record.map((row) => {
						return (row.type === '아파트') ? (
									<div className='col-4 info-section actual-section'>
										<div className='actual-header'>
											<div className='actual-title'>실시간 거래 정보</div>
											<div className='actual-dropdown dropdown'>
												<button className='sale dropdown-toggle' onClick={this.handleClickeventDropType} type='button'>
													<button className='dropdown-item'>{this.state.maemaeType}</button>
													<ul className={`list-layer ${this.state.listDrop.type}`}>
														<li>
															<button className="btn-chart-type" onClick={this.handleClickeventMaeMaeType} value="전월세">전월세</button>
														</li>
														<li>
															<button className="btn-chart-type" onClick={this.handleClickeventMaeMaeType} value="매매">매매</button>
														</li>
													</ul>
												</button>
												<button className='measure dropdown-toggle' type='button' onClick={this.handleClickeventDropM2}>
													<button className="dropdown-item">{this.state.m2Val} <span className="status-text"> (m²)</span></button>
													<ul className={`list-layer ${this.state.listDrop.m2}`}>
														<button value="All" onClick={this.handleClickeventM2Type}>All</button>
														{this.state.m2s.map((innerRow) => {
															return (
																<li>
																	<button value={innerRow} onClick={this.handleClickeventM2Type}>
																		{innerRow}
																		<span className="status-text"> (m²)</span>
																	</button>
																</li>
															);
														})}
													</ul>
												</button>
											</div>
										</div>
										<div className='actual-contents'>
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
													</div>
													<PostChart actualPriceRecords={this.state.actualPriceRecords} />
												</div>
											</div>
											{this.state.record.map((innerRow) => {
												return (
													<div className='row group'>
														<div className='inner clearfix'>
															<div className='base-info clearfix'>
																<ul>
																	<li>{innerRow.mainPurpsCdNm}</li>
																	<li>{innerRow.hhldCnt}</li>
																	<li>1개동</li>
																	<li>최고 {innerRow.grndFlrCnt}층</li>
																	<li>용적율 {innerRow.vlRat}%</li>
																	<li>건폐율 {innerRow.bcRat}%</li>
																	<li>총 주차 {innerRow.park_cnt}대 가능</li>
																	<li>개별난방(보류)</li>
																	<li>도시가스(보류)</li>
																	<li>내진설계대상(보류)</li>
																</ul>
															</div>
															<div className='floor-plan clearfix'>
																<a href={this.state.naverGroundUrl}>
																	{this.state.naverGroundUrl !== '' ? '네이버 평면도 보기' : ''}
																</a>
															</div>
														</div>
													</div>
												);
											})}
											<div className='row group hide'>
												<div className='inner'>
													<h2 className='title'>
														아파트 관리비 평균(보류)
														<span className='caption'>공동주택관리시스템 제공</span>
													</h2>
													<div className='apt-average-price'>
														<ul>
															<li>
																<span className='type'>겨울 (12월)</span>
																<p className='cost'>40만원</p>
															</li>
															<li>
																<span className='type'>여름 (8월)</span>
																<p className='cost'>28만원</p>
															</li>
															<li>
																<span className='type'>최소 (4월)</span>
																<p className='cost'>16만원</p>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className='row group hide'>
												<div className='inner'>
													<h2 className='title'>주변 입주 예정 아파트(보류)</h2>
													<div className='nearby'>
														<ul>
															<li>
																<a href='naver.com'>
                          <span className='left'>
                              <span className='name'>모라동 구남역 동원로얄듀크</span>
                              <span className='date'>2019년 2월</span>
                              <span className='household'>498세대</span>
                              <span className='py'>, 37평</span>
                          </span>
																	<span className='right'>
                            <span className='price'>2.9억</span>
                          </span>
																</a>
															</li>
															<li>
																<a href='naver.com'>
                        <span className='left'>
                            <span className='name'>모라동 구남역 동원로얄듀크</span>
                            <span className='date'>2019년 2월</span>
                            <span className='household'>498세대</span>
                            <span className='py'>, 37평</span>
                        </span>
																	<span className='right'>
                          <span className='price'>3.3억</span>
                        </span>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
						: (
							<div className='none-section'>
								<div className='announce'>
									<img src={errorp} alt='error' />
									<p className='d01'>죄송합니다.</p>
									<p className='d02'><span>물건 종류가 [아파트]</span>가 아닌 경우 실시간 거래 정보를 볼 수 없습니다.</p>
									<p className='d02'>빠른 시일 내에 좋은 서비스를 제공하도록 노력하겠습니다.</p>
								</div>
							</div>
						);
					})}
					<BuildingList
						buildingPopData={this.handleBuildingPop}
						buildingRecords={this.state.buildingPopup}
					/>
					<DaumMapDetail
						postid={this.state.match.params.id}
						courtData={this.state.record}
						buildingPushData={this.handleBuildingPush}
					/>
					<div className='modal' aria-labelledby='exampleModalLabel'>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title'>물건 부가 정보</h5>
									<button type='button' className='close'>
										<span><i className='mdi mdi-close' /></span>
									</button>
								</div>
								<div className='modal-body'>
									<div className='meta-list'>
										<ul>
											<li className='active'>사진</li>
											<li>건물등기</li>
											<li>감정평가서</li>
											<li>현황조사서</li>
											<li>매각물건명세서</li>
											<li>세대열람내역서</li>
											<li>부동산표시목록</li>
											<li>기일내역</li>
											<li>문건/송달내역</li>
											<li>사건내역</li>
											<li>전자지도</li>
											<li>전자지적도</li>
											<li>로드뷰</li>
											<li>온나라지도</li>
										</ul>
									</div>
									<div className='list-photo'>
										<li>
											<img src={this.state.thumb} alt='image' />
										</li>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	match: PropTypes.object.isRequired,
};

export default Post;
