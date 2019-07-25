import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/DetailListHeader.css';

import '../strings/component';
import { strings } from '../strings/component';

function DetailListHeader({ title, data }) {
	return (
		<div className="detailListHeader">
			{title === 'Blocks' ? (
				<div>{`Block #${data[0].number} to #${data[data.length - 1].number}`}</div>
			) : (
				<div>{strings.DETAILLISTHEADER__TX}</div>
			)}
		</div>
	);
}

DetailListHeader.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.array.isRequired
};

export default DetailListHeader;
