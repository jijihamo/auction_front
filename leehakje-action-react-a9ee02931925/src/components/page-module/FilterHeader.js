import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';


let houseQuery = '';
let ingQuery = '';
class FilterHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			houseState: -1,
			ingState: -1,
			args: {
				hq:'',
				msq:'',
			},
		};
	}
	filterHouseEvent = () => {
		this.setState({
			houseState: this.state.houseState * -1,
			ingState: -1,
		});
	}
	filterIngEvent = () => {
		this.setState({
			houseState: -1,
			ingState: this.state.ingState * -1,
		});
	}
	componentDidMount() {
		$(document).ready(() => {
			// 4
			// $('.input-group input:checkbox[name=house]').each(function () {
			// 	this.checked = true;
			// 	if (this.checked) {
			// 		// checked 처리된 항목의 값
			// 		alert(this.value);
			// 	}
			// });
		});
	}
	filterHouseSubmit = () => {
		this.filterHouseEvent();
		$(document).ready(() => {
			houseQuery = '';
			// $('.input-group input:checkbox[name=house]').on('checked', this.selectChange.bind(this));
			$('.input-group input:checkbox[name=house]').each(function () {
				if (this.checked) {
					// checked 처리된 항목의 값
					// alert(this.value);
						// recordApt: request.data.records,
					houseQuery += `${this.value},`;
				}
			});
			this.state.args.hq = houseQuery;
			this.props.onSearch(this.state.args);
			console.log(houseQuery);
			console.log(this.state.args);
		});
	}
	filterIngSubmin = () => {
		this.filterIngEvent();
		$(document).ready(() => {
			ingQuery = '';
			// $('.input-group input:checkbox[name=house]').on('checked', this.selectChange.bind(this));
			$('.input-group input:checkbox[name=ingFilter]').each(function () {
				if (this.checked) {
					// checked 처리된 항목의 값
					// alert(this.value);
					// recordApt: request.data.records,
					ingQuery += `${this.value},`;
				}
			});
			this.state.args.msq = ingQuery;
			this.props.onSearch(this.state.args);
		});
	}
	render() {
		let filterActive = 'filter-detail filter-kind';
		let filterIngActive = 'filter-detail filter-current';
		if (this.state.houseState === -1) {
			filterActive = 'filter-detail filter-kind hide';
		} else {
			filterActive = 'filter-detail filter-kind';
		}
		if (this.state.ingState === -1) {
			filterIngActive = 'filter-detail filter-current hide';
		} else {
			filterIngActive = 'filter-detail filter-current';
		}
		return (
			<div className="row filter-section clearfix">
				<ul>
					<li>
						<div className={filterActive}>
							<form className="react-form">
								<div className="filter-row hide">
									<input type="checkbox" id="allCheck" className="all-check " />
									<label htmlFor="allCheck">전체선택</label>
								</div>
								<div className="filter-row">
									<h5>주거용</h5>
									<div className="input-group">
										<input type="checkbox" id="apt" name="house" value="apt" />
										<label htmlFor="apt">아파트</label>
										<input type="checkbox" id="housing" name="house" value="housing" />
										<label htmlFor="housing">단독주택</label>
										<input type="checkbox" id="neighborhoodhouse" name="house" value="neighborhoodhouse" />
										<label htmlFor="neighborhoodhouse">연립주택</label>
										<input type="checkbox" id="room" name="house" value="room" />
										<label htmlFor="room">다가구</label>
										<input type="checkbox" id="villa" name="house" value="villa" />
										<label htmlFor="villa">빌라</label>
									</div>
								</div>
								<div className="filter-row">
									<h5>상업용 및 업무용</h5>
									<div className="input-group">
										<input type="checkbox" id="a" name="house" value="mall" />
										<label htmlFor="a">상가</label>
										<input type="checkbox" id="b" name="house" value="facility" />
										<label htmlFor="b">근린시설</label>
										<input type="checkbox" id="d" name="house" value="officetel" />
										<label htmlFor="d">오피스텔</label>
										<input type="checkbox" id="e" name="house" value="office" />
										<label htmlFor="e">사무실</label>
										<input type="checkbox" id="f" />
										<label htmlFor="f">창고</label>
										<input type="checkbox" id="g" />
										<label htmlFor="g">공장</label>
										<input type="checkbox" id="h" />
										<label htmlFor="h">아파트형 공장</label>
										<input type="checkbox" id="i" />
										<label htmlFor="i">숙박시설</label>
										<input type="checkbox" id="j" />
										<label htmlFor="j">숙박(콘도 등)</label>
										<input type="checkbox" id="k" />
										<label htmlFor="k">교육시설</label>
										<input type="checkbox" id="l" />
										<label htmlFor="l">종교시설</label>
										<input type="checkbox" id="m" />
										<label htmlFor="m">농가관련시설</label>
										<input type="checkbox" id="n" />
										<label htmlFor="n">의료시설</label>
										<input type="checkbox" id="o" />
										<label htmlFor="o">주유소(위험물)</label>
										<input type="checkbox" id="p" />
										<label htmlFor="p">목욕탕</label>
										<input type="checkbox" id="q" />
										<label htmlFor="q">노유자시설</label>
										<input type="checkbox" id="r" />
										<label htmlFor="r">분뇨쓰레기처리</label>
										<input type="checkbox" id="s" />
										<label htmlFor="s">자동차관련시설</label>
										<input type="checkbox" id="t" />
										<label htmlFor="t">장례관련시설</label>
										<input type="checkbox" id="u" />
										<label htmlFor="u">문화및집회시설</label>
									</div>
								</div>
								<div className="filter-row hide">
									<h5>토지</h5>
									<input type="checkbox" id="allCheckType" className="all-check-type" />
									<label htmlFor="allCheckType">토지 전체 선택</label>
									<div className="input-group">
										<input type="checkbox" id="aa" />
										<label htmlFor="aa">대지</label>
										<input type="checkbox" id="bb" />
										<label htmlFor="bb">농지</label>
										<input type="checkbox" id="cc" />
										<label htmlFor="cc">임야</label>
										<input type="checkbox" id="dd" />
										<label htmlFor="dd">잡종지</label>
										<input type="checkbox" id="ee" />
										<label htmlFor="ee">과수원</label>
										<input type="checkbox" id="ff" />
										<label htmlFor="ff">도로</label>
										<input type="checkbox" id="gg" />
										<label htmlFor="gg">묘지</label>
										<input type="checkbox" id="hh" />
										<label htmlFor="hh">목장용지</label>
										<input type="checkbox" id="ii" />
										<label htmlFor="ii">공장용지</label>
										<input type="checkbox" id="jj" />
										<label htmlFor="jj">학교용지</label>
										<input type="checkbox" id="kk" />
										<label htmlFor="kk">창고용지</label>
										<input type="checkbox" id="ll" />
										<label htmlFor="ll">체육용지</label>
										<input type="checkbox" id="mm" />
										<label htmlFor="mm">종교용지</label>
										<input type="checkbox" id="nn" />
										<label htmlFor="nn">기타용지</label>
										<input type="checkbox" id="oo" />
										<label htmlFor="oo">구거</label>
										<input type="checkbox" id="pp" />
										<label htmlFor="pp">하천</label>
										<input type="checkbox" id="qq" />
										<label htmlFor="qq">유지</label>
										<input type="checkbox" id="rr" />
										<label htmlFor="rr">제방</label>
										<input type="checkbox" id="ss" />
										<label htmlFor="ss">주차장</label>
									</div>
								</div>
								<div className="filter-row hide">
									<h5>차량 및 선박</h5>
									<input type="checkbox" id="allCheckType" className="all-check-type" />
									<label htmlFor="allCheckType">차량 및 선박 전체 선택</label>
									<div className="input-group">
										<input type="checkbox" id="aaa" />
										<label htmlFor="aaa">승용차</label>
										<input type="checkbox" id="bbb" />
										<label htmlFor="bbb">버스</label>
										<input type="checkbox" id="ccc" />
										<label htmlFor="ccc">화물차</label>
										<input type="checkbox" id="ccc" />
										<label htmlFor="ccc">중장비</label>
										<input type="checkbox" id="eee" />
										<label htmlFor="eee">선박</label>
									</div>
								</div>
								<div className="filter-row">
									<h5>기타</h5>
									<div className="input-group">
										<input type="checkbox" id="fff" />
										<label htmlFor="fff">광업권</label>
										<input type="checkbox" id="ggg" />
										<label htmlFor="ggg">어업권</label>
										<input type="checkbox" id="hhh" />
										<label htmlFor="hhh">염전</label>
										<input type="checkbox" id="iii" />
										<label htmlFor="iii">양어장(축양, 양식)</label>
										<input type="checkbox" id="jjj" />
										<label htmlFor="jjj">기타</label>
									</div>
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset hide-important">초기화</button>
								<button type="button" className="btn apply" onClick={this.filterHouseSubmit}>적용</button>
							</div>
						</div>
						<button type="button" className="btn filter active" onClick={this.filterHouseEvent}>물건종류</button>
					</li>
					<li>
						<div className={filterIngActive}>
							<form className="react-form">
								<div className="filter-row">
									<span className="invisible"> 유찰 </span>
									<input type="text" className="rd-form invisible" />
									<span className="invisible"> ~ </span>
									<input type="text" className="rd-form invisible" />
									<span className="invisible"> 회 </span>
									<button type="button" className="btn apply" onClick={this.filterIngSubmin}>적용</button>
								</div>
								<div className="filter-row">
									<div className="input-group">
										<input type="checkbox" id="kkk" name="ingFilter" value="kkk" />
										<label htmlFor="kkk">진행물건</label>
										<input type="checkbox" id="lll" name="ingFilter" value="lll" />
										<label htmlFor="lll">신건</label>
										<input type="checkbox" id="mmm" name="ingFilter" value="mmm" />
										<label htmlFor="mmm">유찰</label>
										<input type="checkbox" id="nnn" name="ingFilter" value="nnn" />
										<label htmlFor="nnn">매각</label>
										<input type="checkbox" id="ooo" name="ingFilter" value="ooo" />
										<label htmlFor="ooo">매각허가</label>
										<input type="checkbox" id="ppp" name="ingFilter" value="ppp" />
										<label htmlFor="ppp">잔금납부물건</label>
										<input type="checkbox" id="qqq" name="ingFilter" value="qqq" />
										<label htmlFor="qqq">배당기일종결</label>
										<input type="checkbox" id="rrr" name="ingFilter" value="rrr" />
										<label htmlFor="rrr">진행 외 물건</label>
										<input type="checkbox" id="sss" name="ingFilter" value="sss" />
										<label htmlFor="sss">미진행</label>
										<input type="checkbox" id="ttt" name="ingFilter" value="ttt" />
										<label htmlFor="ttt">변경/연기</label>
										<input type="checkbox" id="uuu" name="ingFilter" value="uuu" />
										<label htmlFor="uuu">불허가/허가취소</label>
										<input type="checkbox" id="vvv" name="ingFilter" value="vvv" />
										<label htmlFor="vvv">정지</label>
										<input type="checkbox" id="www" name="ingFilter" value="www" />
										<label htmlFor="www">종국물건</label>
										<input type="checkbox" id="xxx" name="ingFilter" value="xxx" />
										<label htmlFor="xxx">각하</label>
										<input type="checkbox" id="yyy" name="ingFilter" value="yyy" />
										<label htmlFor="yyy">기각</label>
										<input type="checkbox" id="zzz" name="ingFilter" value="zzz" />
										<label htmlFor="zzz">기타</label>
										<input type="checkbox" id="ab" name="ingFilter" value="ab" />
										<label htmlFor="ab">이송</label>
										<input type="checkbox" id="cd" name="ingFilter" value="cd" />
										<label htmlFor="cd">취소</label>
										<input type="checkbox" id="ef" name="ingFilter" value="ef" />
										<label htmlFor="ef">취하</label>
										<input type="checkbox" id="gh" name="ingFilter" value="gh" />
										<label htmlFor="gh">모사건 종결</label>
									</div>
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset hide-important">초기화</button>
							</div>
						</div>
						<button type="button" className="btn filter active" onClick={this.filterIngEvent}>물건현황</button>
					</li>
					<li>
						<div className="filter-detail filter-date hide">
							<form className="react-form">
								<div className="filter-row">
									<input type="text" className="rd-form" />
									~
									<input type="text" className="rd-form" />
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset">초기화</button>
								<button type="button" className="btn apply">적용</button>
							</div>
						</div>
						<button type="button" className="btn filter none-active">매각기일</button>
					</li>
					<li>
						<div className="filter-detail filter-appraisal-price hide">
							<form className="react-form">
								<div className="filter-row">
									<input type="text" className="rd-form" />원
									~
									<input type="text" className="rd-form" />원
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset">초기화</button>
								<button type="button" className="btn apply">적용</button>
							</div>
						</div>
						<button type="button" className="btn filter none-active">감정가</button>
					</li>
					<li>
						<div className="filter-detail filter-appraisal-price hide">
							<form className="react-form">
								<div className="filter-row">
									<input type="text" className="rd-form" />원
									~
									<input type="text" className="rd-form" />원
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset">초기화</button>
								<button type="button" className="btn apply">적용</button>
							</div>
						</div>
						<button type="button" className="btn filter none-active">최저가</button>
					</li>
					<li>
						<div className="filter-detail filter-add hide">
							<form className="react-form">
								<div className="filter-row">
									<h5>대지면적</h5>
									<input type="text" className="rd-form" />㎡
									~
									<input type="text" className="rd-form" />㎡
								</div>
								<div className="filter-row">
									<h5>건물면적</h5>
									<input type="text" className="rd-form" />㎡
									~
									<input type="text" className="rd-form" />㎡
								</div>
								<div className="filter-row">
									<h5>지번범위</h5>
									<form method="get" action="">
										<select name="" className="rd-form rd-select xl">
											<option value="">선택안함</option>
											<option value="1">전체</option>
											<option value="2">일반</option>
											<option value="3">산</option>
										</select>
									</form>
									<input type="text" className="rd-form" />
									~
									<input type="text" className="rd-form" />
								</div>
								<div className="filter-row">
									<h5>특수물건</h5>
									<input type="checkbox" id="allCheckType" className="all-check-type" />
									<label htmlFor="allCheckType">특수물건 전체 선택</label>
									<div className="input-group">
										<input type="checkbox" id="fff" />
										<label htmlFor="fff">오늘 공고된 신건</label>
										<input type="checkbox" id="ggg" />
										<label htmlFor="ggg">재매각 물건 검색</label>
										<input type="checkbox" id="hhh" />
										<label htmlFor="hhh">반값 경매 물건</label>
										<input type="checkbox" id="iii" />
										<label htmlFor="iii">감정일에서 1년이 지난 물건</label>
										<input type="checkbox" id="jjj" />
										<label htmlFor="jjj">위반 건축물</label>
										<input type="checkbox" id="jjj" />
										<label htmlFor="jjj">전세권/임차권 설정</label>
									</div>
								</div>
								<div className="filter-row">
									<h5>경매절차</h5>
									<div className="input-group">
										<input type="checkbox" id="fff" />
										<label htmlFor="fff">전체보기</label>
										<input type="checkbox" id="ggg" />
										<label htmlFor="ggg">임의경매</label>
										<input type="checkbox" id="hhh" />
										<label htmlFor="hhh">강제경매</label>
									</div>
								</div>
							</form>
							<div className="row btn-section clearfix">
								<button type="button" className="btn reset" onClick={this.filterInit}>초기화</button>
							</div>
						</div>
						<button type="button" className="btn filter none-active">필터 추가하기</button>
					</li>
				</ul>
			</div>
		);
	}
}
FilterHeader.propTypes = {
	// status: PropTypes.bool.isRequired,
	onSearch: PropTypes.func.isRequired,
};
export default FilterHeader;
