/* eslint-disable no-undef,no-else-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getList from '../../utils/utilRcords';
// import getSearchList from '../../utils/utilSearchRcords';
import DaumMap from '../page-module/DaumMapList';
import FilterHeader from '../page-module/FilterHeader';
import List from '../page-module/List';
// import DetailSearch from '../page-module/DetailSearch';

class Home extends Component {
	constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
		// this.setKeyword = this.setKeyword.bind(this);
	}
	// componentDidMount() {
		// $(document).ready(() => {
		// 	$('select').prettyDropdown();
		// });
	// }
	onSearch(args) {
		getList(args).then((request) => {
			this.props.reLoad(request.data);
      // if (!this.state.status) {
				// this.setState({ status: false });
      // }
		});
	}
	// setKeyword(args) {
		// getSearchList(args).then((request) => {
		// 	this.props.reLoad(request.data);
		// });
	// }
	render() {
		return (
			<div className="container">
				<FilterHeader
					onSearch={this.onSearch}
				/>
				<div className="row contents-section clearfix">
					<div className="col-8 list-section">
						<List
							records={this.props.records}
							foundRecord={this.props.foundRecord}
							currentPage={this.props.currentPage}
							recordPerPage={24}
							onChange={this.onSearch}
							// status={this.state.status}
						/>
					</div>
					<div className="col-4 map-section">
						<DaumMap
							lat={this.props.lat}
							lng={this.props.lng}
							records={this.props.records}
							onChange={this.onSearch}
						/>
						<div className="list-marker hide">
							<div className="kind">
								<span>아파트</span>
							</div>
							<div className="col-4 lowest">
								최저
							</div>
							<div className="col-8 price">
								2억 5천
							</div>
							<div className="marker-locate">삼</div>
						</div>
						<div className="list-marker2 hide">
							<div className="number">
								37
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	records: PropTypes.array.isRequired,
	foundRecord: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	reLoad: PropTypes.func.isRequired,
	lat: PropTypes.number.isRequired,
	lng: PropTypes.number.isRequired,
};

function reload(args) {
	return {
		type: '',
		records: args && args.records ? args.records : [],
		foundRecord: args && args.foundRecord ? args.foundRecord : 0,
		currentPage: args && args.currentPage ? args.currentPage : 1,
		hq: args && args.hq ? args.hq : 1,
	};
}

const listStateToProps = function (state) {
	return {
		records: state.listBox.records,
		foundRecord: state.listBox.foundRecord,
		currentPage: state.listBox.currentPage,
		lat: state.listBox.lat,
		lng: state.listBox.lng,
		hq: state.listBox.hq,
	};
};

const listDispatchToProps = dispatch => ({
	reLoad: args => dispatch(reload(args)),
});

Home = connect(listStateToProps, listDispatchToProps)(Home);

export default Home;
