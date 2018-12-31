/* eslint-disable no-undef,prefer-destructuring,space-before-function-paren,function-paren-newline,prefer-arrow-callback,import/first */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuildingListItem from '../page-module/BuildingListItem';

class BuildingList extends Component {
	constructor(props) {
		super(props);
		console.info('');
	}
	handleDeleteComponent = () => {
		console.log('d');
		this.props.buildingPopData();
	}
	render() {
		return (
			<div className="col col-3 post">
					{this.props.buildingRecords.map((row) => {
						// return <ListItem key={row.ID} data={row} reactkey={index} ref={`item${index}`} obj={this} />;
						return <BuildingListItem buildingPopRecord={row} deleteComponent={this.handleDeleteComponent} />;
					})}
			</div>
		);
	}
}

BuildingList.propTypes = {
	buildingRecords: PropTypes.array.isRequired,
	buildingPopData: PropTypes.func.isRequired,
	// status: PropTypes.bool.isRequired,
};

export default BuildingList;
