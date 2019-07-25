import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import '../styles/components/Card.css';

function Card(props) {
	const { style, className = '', ...rest } = props;
	return (
		<div
			style={{ ...style }}
			{...rest}
			className={classNames('card', className)}
		>
			{props.children}
		</div>
	);
}

Card.propTypes = {
	style: PropTypes.object,
	className: PropTypes.string
};

export default Card;
