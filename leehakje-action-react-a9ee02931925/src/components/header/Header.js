/* eslint-disable prefer-arrow-callback */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/images/logo.png';
import getSearchMapXY from '../../utils/utilSearchRcord';
// import getList from '../../utils/utilRcords';

let object = null;
let mapObject = null;
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { keyword: '', enter: false };
		object = this;
		mapObject = window.daum.maps;
		// console.log(mapObject);
		// this.inputSearch = React.createRef();
		// ref={this.inputSearch}
		this.handleChange = this.handleChange.bind(this);
		this.keyUp = this.keyUp.bind(this);
		this.testHandle = this.testHandle.bind(this);
	}
	static contextTypes = {
		router: PropTypes.object,
	}
	testHandle(event) {
		event.preventDefault();
		object.context.router.history.goBack();
	}
	handleChange(event) {
		this.setState({ keyword: event.target.value, enter: false });
	}
	keyUp(event) {
		if (event.key !== 'Enter') {
			return;
		}
		object.context.router.history.push('/');
		if (!this.state.enter) {
			this.setState({ enter: true });
			// 주소-좌표 변환 객체를 생성합니다
			const keword = object.state.keyword;
			const geocoder = new mapObject.services.Geocoder();
			// 주소로 좌표를 검색합니다
			geocoder.addressSearch(keword, function (result, status) {
				if (status === mapObject.services.Status.OK) {
					const args = {
						lat : Number(result[0].y),
						lng : Number(result[0].x),
					};
					object.props.reLoad(args);
					// const coords = new daum.maps.LatLng(result[0].y, result[0].x);
					// 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
					// 이게 지도 받은 위치로 이동 시키는 건데 ... 드래그앤 드랍문제가 발생되서 임시방편으로 정렬로 처리함 보류
					// map.setCenter(coords);
					// bounds = new this.daumMap.LatLngBounds();
					// bounds.extend(po);
					// let bounds = null;
					// this.map.setBounds(bounds);
				} else {
					getSearchMapXY(keword).then((request) => {
						if (request.data.x && request.data.y) {
							const args = {
								lat : Number(request.data.x),
								lng : Number(request.data.y),
							};
							object.props.reLoad(args);
						} else {
							alert('검색 결과가 없습니다.');
						}
					});
				}
			});
		}
	}
	render() {
		return (
			<nav className="navbar">
				<div className="row clearfix">
					<div className="col-8">
						<div className="logo">
							<a href="/            ">
								<img src={logo} alt="logo" />
							</a>
						</div>
						<div className="search-bx">
							<div className="search-group">
								<button type="submit" className="btn-search">
									<i className="mdi mdi-magnify" />
								</button>
								<input
									type="text"
									className="form-control"
									name="inputSearch"
									onChange={this.handleChange}
									onKeyUp={this.keyUp}
									value={this.state.keyword}
									placeholder="법원, 사건번호로 검색해 보세요."
								/>
							</div>
						</div>
					</div>
					<div className="col-4">
						<div className="navbar-nav">
							<ul>
								<li>
									<Link to="/">
										홈
									</Link>
								</li>
								<li>
									<Link to="/login">
										로그인
									</Link>
								</li>
								<li>
									<Link to="/resister">
										회원가입
									</Link>
								</li>
								<li>
									<a href="http://naver.com" onClick={this.testHandle}>
										뒤로가기 테스트
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

function reload(args) {
	return {
		type: '',
		lat: args.lat ? args.lat : 0,
		lng: args.lng ? args.lng : 0,
	};
}

const headerDispatchToProps = dispatch => ({
	reLoad: args => dispatch(reload(args)),
});

Header = connect(undefined, headerDispatchToProps)(Header);

export default Header;
