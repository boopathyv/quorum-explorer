import React from 'react';
import ErrorIcon from '../images/error.svg';
import NotFoundIcon from '../images/notFound.svg';
import PropTypes from 'prop-types';

import '../styles/components/ErrorPage.css';

function ErrorPage({ error = '' }) {
	return (
		<div className="errorPage">
			<img
				className="errorPage__img"
				src={error ? NotFoundIcon : ErrorIcon}
				alt="error"
			/>
		</div>
	);
}

ErrorPage.propTypes = {
	error: PropTypes.bool
};

export default ErrorPage;
