/* eslint-disable react/prop-types */
// file: src/components/PhoneForm.js
import React, { Component } from 'react';

let object = '';

class DetailSearch extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleSubmit.bind(this);
		object = this;
	}
  handleSubmit(event) {
    // 페이지 리로딩 방지
		event.preventDefault();
		const args = {
			keyword: '서울특별시 강동구 아리수로 308',
			currentPage: '1',
		};
		object.props.onKeywordSearch(args);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
            placeholder="Search"
						// eslint-disable-next-line arrow-parens
            ref={ref => { this.keyword = ref; }}
            name="keyword"
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default DetailSearch;
