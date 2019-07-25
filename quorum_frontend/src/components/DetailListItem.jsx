import React from 'react';
import PropTypes from 'prop-types';

import formatTime from '../utils/formatTime';
import '../styles/components/DetailListItem.css';

function DetailListItem({ data, columns }) {
	return data.map((values, index) => {
		return columns.map(column => {
			let value = data[index][column.key];
			if (column.key === 'timestamp') {
				value = formatTime(value);
			}

			return (
				<div className="detailListItem__row" key={column.key}>
					{value ? (column.render ? column.render(value) : value) : null}
				</div>
			);
		});
	});
}

DetailListItem.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
};

export default DetailListItem;
