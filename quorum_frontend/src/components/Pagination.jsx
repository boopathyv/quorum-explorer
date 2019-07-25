import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan, faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import Proptypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import '../styles/components/Pagination.css';

import { strings } from '../strings/component';

function Pagination(props) {
	const {
		className = '',
		style,
		getPage,
		pages = 1,
		currentPage = 1,
		staticContext,
		...rest
	} = props;
	const url = props.match.url;

	return (
		<div
			className={classNames('pagination', className)}
			style={{ ...style }}
			{...rest}
		>
			<Link
				className={`pagination__first ${currentPage === 1 ? 'inactive' : ''}`}
				to={`${url}?page=${1}`}
			>
				{strings.PAGINATION__FIRST}
			</Link>
			<Link
				className={`pagination__prev ${currentPage === 1 ? 'inactive' : ''}`}
				to={`${url}?page=${currentPage - 1}`}
			>
				<FontAwesomeIcon icon={faLessThan} />
			</Link>
			<div className="pagination__pages">
				<span className="pagination__text">{strings.PAGINATION__PAGE} </span>
				<span>{currentPage} </span>
				<span className="pagination__text">{strings.PAGINATION__PAGE_OF} </span>
				<span>{pages}</span>
			</div>
			<Link
				className={`pagination__next ${
					currentPage === pages ? 'inactive' : ''
				}`}
				to={`${url}?page=${currentPage + 1}`}
			>
				<FontAwesomeIcon icon={faGreaterThan} />
			</Link>
			<Link
				className={`pagination__last ${
					currentPage === pages ? 'inactive' : ''
				}`}
				to={`${url}?page=${pages}`}
			>
				{strings.PAGINATION__LAST}
			</Link>
		</div>
	);
}

Pagination.propTypes = {
	className: Proptypes.string,
	style: Proptypes.string,
	pages: Proptypes.number,
	currentPage: Proptypes.number
};

export default withRouter(Pagination);
