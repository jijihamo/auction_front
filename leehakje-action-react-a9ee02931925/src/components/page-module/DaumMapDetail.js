import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getBuildingData from '../../utils/utilSearchRcords';
import getCenter from '../../utils/utilGetCenter';

// let mapObject = null;
let map = null;
class DaumMapDetail extends Component {
	constructor(props) {
			super(props);
			this.state = {
				disAlert: 'show',
				buildingRecords: [],
				centerLng: '',
				centerLat: '',
			};
			// this.onChangeCenter(this.props.postid);
			// console.info('daum map init');
			// this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		console.log(this.state.centerLat, this.state.centerLng);
		this.daumMap = window.daum.maps;
		const el = document.getElementById('map');
		const level = 3;
		const zoomControl = new this.daumMap.ZoomControl();
		this.obj = this;
		// mapObject = this;
		this.markers = [];
		this.contents = [];
		getCenter(this.props.postid).then((request) => {
			console.log(request);
			if ('data' in request) {
				this.setState({
					centerLat : request.data.records[0].lat,
					centerLng : request.data.records[0].lng,
				});
				console.log(this.state.centerLng);
				map = new this.daumMap.Map(el, {
					center: new this.daumMap.LatLng(this.state.centerLat, this.state.centerLng),
					level: level,
				});
				this.map = map;
				map.addControl(zoomControl, this.daumMap.ControlPosition.RIGHT);
				this.onDetailMapDataChange(this.getLatLng());
				this.daumMap.event.addListener(map, 'dragend', () => {
					this.removeMarker();
					this.args = this.getLatLng();
					this.onDetailMapDataChange(this.args);
				});
				this.daumMap.event.addListener(map, 'zoom_changed', () => {
					this.removeMarker();
					this.args = this.getLatLng();
					this.onDetailMapDataChange(this.args);
				});
			}
		});
		// this.args = this.getLatLng();
		// this.onChange(this.args);
		// this.props.onChange(this.args);
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
	}
	onChangeCenter(params) {
		getCenter(params).then((request) => {
			console.log(request);
			if ('data' in request) {
				this.setState({
					centerLat : request.data.records[0].lat,
					centerLng : request.data.records[0].lng,
				});
				console.log(this.state.centerLng);
			}
		});
	}
	onMouseDown() {
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
	getLatLng() {
		const bounds = this.map.getBounds();
		// 영역의 남서쪽 좌표를 얻어옵니다
		const swLatLng = bounds.getSouthWest();
		// 영역의 북동쪽 좌표를 얻어옵니다
		const neLatLng = bounds.getNorthEast();
		const message = `지도의 남서쪽 좌표는 ${swLatLng.getLat()}, ${swLatLng.getLng()} 이고 <br>
		북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다`;
		const args = {
			sw_lat: swLatLng.getLat(),
			sw_lng: swLatLng.getLng(),
			ne_lat: neLatLng.getLat(),
			ne_lng: neLatLng.getLng(),
			message: message,
		};
		return args;
	}
	onDetailMapDataChange(params) {
		getBuildingData(params).then((request) => {
			console.log(request);
			if ('data' in request) {
				this.setState({
					// recordApt: request.data.records,
					buildingRecords: request.data.records,
				});
			}
			console.log(this.state.buildingRecords);
		});
	}
	addMarker(row) {
		const content = document.createElement('div');
		content.className = 'overlay_info';
		content.setAttribute('record-id', row.ID);
		const minPrice = row.record_Appraisal_min_price ? this.convertToPrice(row.price[0]) : '정보 없음';
		// console.log(row);
		content.innerHTML = `<div class='post-marker'>
							<div class="kind">
								<span>${row.etcPurps}</span>
							</div>
							<div class='average-price'>
								${minPrice}
							</div>
						</div>`;
		// 커스텀 오버레이가 표시될 위치입니다
		const po = new this.daumMap.LatLng(row.lat, row.lng);
		// 커스텀 오버레이를 생성합니다
		const mapCustomOverlay = new this.daumMap.CustomOverlay({
			position: po,
			content: content,
			// xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
			// yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
		});
		// 커스텀 오버레이를 지도에 표시합니다
		mapCustomOverlay.setMap(this.map);
		this.markers.push(mapCustomOverlay);
		this.contents.push(content);
		// this.addEventHandle(content, 'click', this.onMouseDown);\
		content.addEventListener('click', () => {
			this.removeMarker();
			this.props.buildingPushData(row);
			console.log('ttt');
		});
	}
	addCurruntMarker(row) {
		const content = document.createElement('div');
		const minPrice = row.Appraisal_min_price ? this.convertToPrice(row.price[0]) : '정보 없음';
		content.className = 'overlay_info';
		content.setAttribute('record-id', row.ID);
		// console.log(row);
		content.innerHTML = `<div class='current-marker'>
							<div class="kind">
								<span>현재물건</span>
							</div>
							<div class='average-price'>
								${minPrice}
							</div>
						</div>`;
		// 커스텀 오버레이가 표시될 위치입니다
		const po = new this.daumMap.LatLng(row.lat, row.lng);
		// 커스텀 오버레이를 생성합니다
		const mapCustomOverlay = new this.daumMap.CustomOverlay({
			position: po,
			content: content,
			// xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
			// yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
		});
		// 커스텀 오버레이를 지도에 표시합니다
		mapCustomOverlay.setMap(this.map);
		this.markers.push(mapCustomOverlay);
		this.contents.push(content);
		this.addEventHandle(content, 'click', this.onMouseDown);
	}
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
	disAlertHide = () => {
		this.setState({
			disAlert: 'hide',
		});
	};
	// handleClick(event) {
	// 	console.log(event);
	// }
	render() {
		if (this.daumMap) {
			this.removeMarker();
			this.state.buildingRecords.forEach((row) => {
				console.log(row);
				// console.info(row);
				this.addMarker(row);
			});
			this.props.courtData.forEach((row) => {
				// console.info(row);
				this.addCurruntMarker(row);
			});
		// 	this.removeMarker();
		// 	if (this.props.lat !== 0 && this.props.lng !== 0) {
		// 		const coords = new this.daumMap.LatLng(this.props.lat, this.props.lng);
		// // 		this.map.setLevel(3);
		// 		this.map.setCenter(coords);
		// 		this.args = this.getLatLng();
		// 		this.state.onChange(this.args);
		// 	} else {
		// // 		this.props.courtData.forEach((row) => {
		// // 			// console.info(row);
		// // 			this.addMarker(row);
		// // 		});
		// 	}
		}
		// var arr = [];
		// var arr2 = [];
		// this.state.buildingRecords.forEach((row) => {
		// 	// console.info(row);
		// 	if(!arr[row.x][row.y]){
		// 		arr[x][y]++;
		// 		arr2[x][y] = false;
		// 	}else
		// 	{
		// 		arr[x][y] = 0;
		// 	}
		//
		// });
		// this.state.buildingRecords.forEach((row) => {
		// 	// console.info(row);
		// 	if(!arr2[x][y]){
		// 		row[count] = arr[row.x][row.y];
		// 		this.addMarker(row);
		// 		arr2[x][y] = true;
		// 	}
		//
		// });
		return (
			<div className="col-4 map-section">
				<div className="App map" id="map" />
				<div className={`alert alert-dismissible fade ${this.state.disAlert}`}>
				현재 물건 주변 아파트 실거래가 정보를 알아보실 수 있습니다. <button type="button" className="close" aria-label="Close" onClick={this.disAlertHide}>
				<span><i className="mdi mdi-close" /></span>
				</button>
				</div>
			</div>
		);
	}
}
DaumMapDetail.propTypes = {
	postid: PropTypes.number.isRequired,
	courtData: PropTypes.array.isRequired,
	// buildingRecords: PropTypes.array.isRequired,
	buildingPushData: PropTypes.func.isRequired,
	// // foundRecord: PropTypes.number.isRequired,
	// // currentPage: PropTypes.number.isRequired,
	// onChange: PropTypes.func.isRequired,
	// recordPerPage: PropTypes.number.isRequired,
};


export default DaumMapDetail;

