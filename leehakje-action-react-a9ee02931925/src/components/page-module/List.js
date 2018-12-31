/* eslint-disable no-undef,prefer-destructuring,space-before-function-paren,function-paren-newline,prefer-arrow-callback,import/first */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';
import ListItem from '../page-module/ListItem';
import $ from 'jquery';

let object;
let gFocusId = '';
class List extends Component {
	constructor(props) {
    super(props);
    object = this;
    this.selectRef = React.createRef();
    this.onPaged = this.onPaged.bind(this);
    this.selectChange = this.selectChange.bind(this);
  }
  componentDidMount() {
		$(document).ready(() => {
			// $('select.pretty').prettyDropdown();
			$('select.rd-select').on('change', this.selectChange.bind(this));
			$(document).on('mouseover', 'div.post', function() {
				let focusID = '0';
				if ($(this).hasClass('post')) {
					focusID = $(this).attr('record-id');
				} else {
					let tempObj = $(this);
					while (!tempObj.hasClass('post')) {
						tempObj = $(this).parent();
					}
					focusID = tempObj.attr('record-id');
				}
				if (focusID !== gFocusId) {
					$('div.overlay_info .list-marker, div.overlay_info .marker-locate').removeClass('current-list-marker');
					$('div').removeClass('current-focus');
					$(`div.overlay_info[record-id='${focusID}'] .list-marker, div.overlay_info[record-id='${focusID}'] .list-marker .marker-locate`).addClass('current-list-marker');
					$(`div.overlay_info[record-id='${focusID}']`).parent().addClass('current-focus');
					gFocusId = focusID;
				}
			});
    });
  }
  selectChange(event) {
    console.log(event.target.value);
    console.log(object);
    const args = [];
    args.orderby = event.target.value;
    this.props.onChange(args);
    // const args = [];
    // args.orderBy = event.target.value;
    // args.currentPage = this.props.currentPage;
    // this.onPaged(args);
    // object.context.router.history.push({
    // 	pathname: '/',
    // 	search: '?color=blue',
    // });
    // console.log(this.selectRef);
  }
  onPaged(currentPage) {
    const args = [];
    // args.orderBy = orderBy;
    args.currentPage = currentPage;
    this.props.onChange(args);
  }
  render() {
    let active = 'row text-right';
		if (this.props.foundRecord === 0) {
			active += ' hide';
		}
    return (
      <div>
        <div className={active}>
					<div className="sort-bx">
						<form method="get" action="">
							<select name="" className="rd-form rd-select xl">
								<option value="">선택안함</option>
								<option value="b">사건번호↑</option>
								<option value="c">사건번호↓</option>
								<option value="a">매각기일↑</option>
								<option value="ab">매각기일↓</option>
								<option value="d">감정가↑</option>
								<option value="e">감정가↓</option>
								<option value="f">최저가↑</option>
								<option value="g">최저가↓</option>
								<option value="j">유찰횟수↑</option>
								<option value="k">유찰횟수↓</option>
							</select>
						</form>
					</div>
			</div>
        {this.props.foundRecord === 0 ?
          <div className="no-result list-section text-center">
            <h2>
                <span>'검색한 키워드'</span>로 검색한 결과가 없습니다.
            </h2>
            <a className="back" href="/">리스트로 되돌아가기</a>
          </div>
          :
          <div>
            <div className="row gutter-sm clearfix">
              {this.props.records.map((row, index) => {
                  return <ListItem key={row.ID} data={row} reactkey={index} ref={`item${index}`} obj={this} />;
              })}
            </div>
            <div className="page">
              <Pagination
                  activePage={this.props.currentPage}
                  itemsCountPerPage={this.props.recordPerPage}
                  totalItemsCount={this.props.foundRecord}
                  pageRangeDisplayed={5}
                  onChange={this.onPaged}
                  linkClass="page-link"
                  innerClass="pagination text-center"
                  itemClass="page-item"
                  activeClass="current"
                  linkClassNext="next"
                  linkClassPrev="pre"
                  linkClassFirst="pre"
                  linkClassLast="next"
                  hideDisabled="true"
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

List.propTypes = {
  records: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  recordPerPage: PropTypes.number.isRequired,
  foundRecord: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // status: PropTypes.bool.isRequired,
};

export default List;
