/* eslint-disable prefer-arrow-callback,space-before-function-paren,quotes,import/no-duplicates */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import $ from "jquery";
import sample1 from '../assets/images/sample01.jpg';

// let mapObject = null;
class DaumMapList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disAlert: 'show',
		};
		// this.onChangeCenter(this.props.postid);
		// console.info('daum map init');
		// this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		this.daumMap = window.daum.maps;
		const el = document.getElementById('map');
		const level = 7;
		const centerLat = 37.4981646;
		const centerLng = 127.028307;
		const zoomControl = new this.daumMap.ZoomControl();
		this.obj = this;
		// mapObject = this;
		this.markers = [];
		this.contents = [];
		this.infoMarker = [];
		this.infoContents = [];
		const map = new this.daumMap.Map(el, {
			center: new this.daumMap.LatLng(centerLat, centerLng),
			level: level,
		});
		this.map = map;
		this.map.setMinLevel(4);
		map.addControl(zoomControl, this.daumMap.ControlPosition.RIGHT);

		this.args = this.getLatLng();
		this.props.onChange(this.args);
		// 주소-좌표 변환 객체를 생성합니다
		// const geocoder = new this.daumMap.services.Geocoder();
		// const addressStart = '부산';
		// 주소로 좌표를 검색합니다
		// geocoder.addressSearch(addressStart, function(result, status) {
		// 	// 정상적으로 검색이 완료됐으면
		// 	if (status === mapObject.daumMap.services.Status.OK) {
		// 		console.log(result);
		// 		// const coords = new daum.maps.LatLng(result[0].y, result[0].x);
		// 		// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
		// 		// this.map.setCenter(coords);
		// 	}
		// });
		$(document).ready(() => {
			$(document).bind('mouseup', '.overlay_info_post', this.onMouseDown.bind(this));
			// $(document).bind('mouseup', '.overlay_info_post', function(item) {
			// // 	const w = $(this);
			// 	const object = item.target.parentElement;
			// 	console.log(object.className);
			// // 	// this.props.history.push(`/post/${w.attr('record-id')}`);
			// 	if (object.classList.contains('goto_')) {
			// 		console.log(object.getAttribute('record-id'));
			// 		this.props.history.push(`/post/${object.getAttribute('record-id')}`);
			// 	}
			// });
		});
		this.daumMap.event.addListener(map, 'dragend', () => {
			this.removeMarker();
			this.removeInfoMarker();
			this.args = this.getLatLng();
			this.props.onChange(this.args);
		});
		this.daumMap.event.addListener(map, 'zoom_changed', () => {
			this.removeMarker();
			this.removeInfoMarker();
			this.args = this.getLatLng();
			this.props.onChange(this.args);
		});
		this.daumMap.event.addListener(map, 'click', () => {
			this.removeInfoMarker();
		});
		// $(document).ready(() => {
		// 	if (this.state.disInfoPost === 'show') {
		// 		$('#map').on('click', this.onMouseDown.bind(this));
		// 	}
		// 	// $(document).on('click', 'div.overlay_info_post', function() {
		// 	// 	const w = $(this);
		// 	// 	w.attr('record-id');
		// 	// 	this.props.history.push(`/post/${w.attr('record-id')}`);
		// 	// });
		// });
	}
	onMouseDown(item) {
		// 	const w = $(this);
		const object = item.target.parentElement;
		console.log(object.className);
		// 	// this.props.history.push(`/post/${w.attr('record-id')}`);
		if (object.classList.contains('goto_')) {
			console.log(object.getAttribute('record-id'));
			this.props.history.push(`/post/${object.getAttribute('record-id')}`);
		}
		// // console.log(mapObject);
		// item.attr('record-id');
		// this.props.history.push(`/post/${item.attr('record-id')}`);
		// let object = event.target;
		// if (event.target.className !== 'desc') {
		// 	object = event.target.parentElement;
		// }
		// object = object.parentElement;
		// mapObject.props.history.push(`/post/${object.getAttribute('record-id')}`);
	}
	addEventHandle(target, type, callback) {
		// target node에 이벤트 핸들러를 등록하는 함수힙니다
		if (target.addEventListener) {
			target.addEventListener(type, callback);
		} else {
			target.attachEvent(`on${type}`, callback);
		}
	}
	removeEventHandle(target, type, callback) {
		// target node에 등록된 이벤트 핸들러를 제거하는 함수힙니다
		if (target.removeEventListener) {
			target.removeEventListener(type, callback);
		} else {
			target.detachEvent(`on${type}`, callback);
		}
	}
	removeMarker() {
		if (this.markers) {
			if (this.markers.length > 0) {
				for (let i = 0; i < this.markers.length; i += 1) {
					this.markers[i].setMap(null);
					this.removeEventHandle(this.contents[i], 'mousemove', this.onMouseDown);
				}
				this.markers = [];
				this.contents = [];
			}
		}
	}
	removeInfoMarker() {
		if (this.infoMarker) {
			if (this.infoMarker.length > 0) {
				for (let i = 0; i < this.infoMarker.length; i += 1) {
					this.infoMarker[i].setMap(null);
					// this.removeEventHandle(this.infoContents[i], 'click', this.onMouseDown);
				}
				this.infoMarker = [];
			}
		}
	}
	getLatLng() {
		const boundsPercent = 0.03;
		const subBounds = this.map.getBounds();
		// 영역의 남서쪽 좌표를 얻어옵니다
		const swLatLng = subBounds.getSouthWest();
		// 영역의 북동쪽 좌표를 얻어옵니다
		const neLatLng = subBounds.getNorthEast();
		const message = `지도의 남서쪽 좌표는 ${swLatLng.getLat() * 0.01}, ${swLatLng.getLng() * 0.01} 이고 <br>
		북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다`;
		const args = {
			sw_lat: swLatLng.getLat() - boundsPercent,
			sw_lng: swLatLng.getLng() - boundsPercent,
			ne_lat: neLatLng.getLat() - boundsPercent,
			ne_lng: neLatLng.getLng() - boundsPercent,
			message: message,
		};
		return args;
	}
	addMarker(row) {
		const content = document.createElement('div');
		const minPrice = row.record_Appraisal_min_price ? this.convertToPrice(row.record_price[0]) : '정보 없음';
		content.className = 'overlay_info';
		content.setAttribute('record-id', row.ID);
		// console.log(row);
		// let w = '';
		// if (row.ID === '2018-917') {
		// 	w = `<div class='col col-3 post' record-id='2010-16856' style='width: 200px;'><a href='/post/2010-16856'><div class='list' style='margin-bottom: 0px;'><div class='list-thumbnail'><img src='/static/media/sample01.e7e86d00.jpg' class='img-fluid' alt='이미지'><span class='dday-bx absolute'><em></em></span><span class='like absolute'><i class='mdi mdi-heart'></i></span></div><div class='list-meta'><div class='title'>사건번호 2010-16856</div><div class='address'>[근린시설] 경기도 성남시 분당구 야탑동 382-8 광명조합상가 2층 4호</div><div class='row price-section clearfix'><div class='col-3 appraise'><span class='badge'>감정가</span></div><div class='col-9'><div class='appraise-price price'>2,040,000,000</div></div></div><div class='row price-section clearfix'><div class='col-3 lowest'><span class='badge'>최저가</span></div><div class='col-9'><div class='lowest-price price'><span>최저가 정보 없음</span></div></div></div></div></div></a></div>`;
		// }
		// ${w}
		content.innerHTML = `
						<div class="list-marker" onClick={this.handleClick}>
							<div class="kind">
								<span>${row.record_type}</span>
							</div>
							<div class="col-4 lowest">
								최저
							</div>
							<div class="col-8 price">
								${minPrice}
							</div>
							<div class="marker-locate">삼</div>
						</div>`;
		// 커스텀 오버레이가 표시될 위치입니다
		const po = new this.daumMap.LatLng(row.lat, row.lng);
		// 커스텀 오버레이를 생성합니다
		const mapCustomOverlay = new this.daumMap.CustomOverlay({
			position: po,
			content: content,
		});

		mapCustomOverlay.setMap(this.map);
		this.markers.push(mapCustomOverlay);
		this.contents.push(content);
		// // 커스텀 오버레이를 지도에 표시합니다
		// const w = `<div class='col col-3 post' record-id='2010-16856' style='width: 200px;'><a href='/post/2010-16856'><div class='list' style='margin-bottom: 0px;'><div class='list-thumbnail'><img src='/static/media/sample01.e7e86d00.jpg' class='img-fluid' alt='이미지'><span class='dday-bx absolute'><em></em></span><span class='like absolute'><i class='mdi mdi-heart'></i></span></div><div class='list-meta'><div class='title'>사건번호 2010-16856</div><div class='address'>[근린시설] 경기도 성남시 분당구 야탑동 382-8 광명조합상가 2층 4호</div><div class='row price-section clearfix'><div class='col-3 appraise'><span class='badge'>감정가</span></div><div class='col-9'><div class='appraise-price price'>2,040,000,000</div></div></div><div class='row price-section clearfix'><div class='col-3 lowest'><span class='badge'>최저가</span></div><div class='col-9'><div class='lowest-price price'><span>최저가 정보 없음</span></div></div></div></div></div></a></div>`;
		// const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
		// // 커스텀 오버레이를 생성합니다
		// const infowindow = new this.daumMap.CustomOverlay({
		// 	ZIndex: 3,
		// 	content: w,
		// 	removable: iwRemoveable,
		// });
		// // this.daumMap.event.addListener(mapCustomOverlay, 'click', () => {
		// 	console.log(event);
		// 	infowindow.open(this.map);
		// 	// if (!this.state.status) {
		// 	// this.setState({ status: false });
		// 	// }
		// // });
		// // 커스텀 오버레이를 지도에 표시합니다
		// this.addEventHandle(content, 'click', this.onMouseDown);
		// if (type === 'click') {
		// console.log(target);
		content.addEventListener('click', () => {
			this.removeInfoMarker();
			const w = document.createElement('div');
			w.innerHTML = `<div class='overlay_info_post col col-3 post' style='width: 200px;'>
											<div class='list' style='margin-bottom: 0px;'>
											<div class='list-thumbnail goto_' record-id=${row.ID}>
											<img src=${row.record_thumb ? row.record_thumb : sample1} class='img-fluid' alt='이미지'>
											<span class='dday-bx absolute'>
											<em>${row.record_gil_dday < 0 ? `D${row.record_gil_dday}` : row.record_MulGeonStatus}</em>
											</span>
											<span class='like absolute hide'>
											<i class='mdi mdi-heart'></i>
											</span>
											</div><div class='list-meta goto_' record-id=${row.ID}><div class='title'>사건번호 ${row.ID}
											</div>
											<div class='address'>[${row.record_type}] ${row.record_address}</div>
											<div class='row price-section clearfix'>
											<div class='col-3 appraise'><span class='badge'>감정가</span></div>
											<div class='col-9'><div class='appraise-price price'>${row.record_Appraisal_price}</div></div></div>
											<div class='row price-section clearfix'><div class='col-3 lowest'>
											<span class='badge'>최저가</span></div>
											<div class='col-9'><div class='lowest-price price'>
											<span>${row.record_Appraisal_min_price ? row.record_Appraisal_min_price : '최저가 정보 없음'}</span></div></div></div></div></div></div>`;
			const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
			// 커스텀 오버레이를 생성합니다
			const infoMarkerOverlay = new this.daumMap.CustomOverlay({
				// ZIndex: 3,
				position: po,
				content: w,
				removable: iwRemoveable,
			});
			infoMarkerOverlay.setMap(this.map);
			this.infoMarker.push(infoMarkerOverlay);
			this.infoContents.push(w);
			// if (!this.state.status) {
			// this.setState({ status: false });
			// }
			w.addEventListener('click', () => {
				this.props.history.push(`/post/${row.ID}`);
			});
		});
		// }
		// this.markers.forEach((marker) => {
		// 	// console.info(row);
		//
		// });
	}
	disAlertHide = () => {
		this.setState({
			disAlert: 'hide',
		});
	};
	convertToPrice(price) {
		let minPriceStr = '';
		const intPriceHundred = Math.floor(price / 1000000) % 10;
		const intPriceThousand = Math.floor(price / 10000000) % 10;
		const intPriceHundredMillion = Math.floor(price / 100000000);
		const chun = intPriceThousand === 0 ? '' : `${intPriceThousand}천`;
		const baek = intPriceHundred === 0 ? '' : `${intPriceHundred}백`;
		// console.log(price);
		// console.log(`${intPriceHundredMillion}억${intPriceThousand}천${intPriceHundred}백`);
		minPriceStr = price >= 100000000 ? `${intPriceHundredMillion}억 ${chun}` : `${chun} ${baek}`;
		return minPriceStr;
	}
	// handleClick(event) {
	// 	console.log(event);
	// }
	render() {
		if (this.daumMap) {
			this.removeMarker();
			if (this.props.lat !== 0 && this.props.lng !== 0) {
				const coords = new this.daumMap.LatLng(this.props.lat, this.props.lng);
				this.map.setCenter(coords);
				this.args = this.getLatLng();
				this.props.onChange(this.args);
			} else {
				this.props.records.forEach((row) => {
					// console.info(row);
					this.addMarker(row);
				});
			}
		}
		return (
			<div className="col-4 map-section">
			<div className="App map" id="map" />
			<div className={`alert alert-dismissible fade ${this.state.disAlert}`}>
				지도를 드래그하여 다른 매물을 볼 수 있습니다. <button type="button" className="close" aria-label="Close" onClick={this.disAlertHide}>
			<span><i className="mdi mdi-close" /></span>
		</button>
		</div>
	</div>
		);
	}
}

DaumMapList.propTypes = {
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
	records: PropTypes.array.isRequired,
	// foundRecord: PropTypes.number.isRequired,
	// currentPage: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	history: PropTypes.func.isRequired,
	// recordPerPage: PropTypes.number.isRequired,
};

// export default DaumMap;
export default withRouter(DaumMapList);

