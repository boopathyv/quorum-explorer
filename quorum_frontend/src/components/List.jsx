import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/components/List.css';

import FetchApi from '../container/FetchApi';
import ListItem from './ListItem';
import Card from './Card';
import Loading from './Loading';

import { strings } from '../strings/component';

function List({ title, isBlock, api }) {
	const titleLink = title.toLowerCase();
	return (
		<FetchApi api={api}>
			{(apiData, loading) => {
				if (apiData) {
					var { documents: data } = apiData.blocks || apiData.transactions;
				}
				return loading ? (
					<div
						className="list"
						style={{ alignItems: 'center', justifyContent: 'center' }}
					>
						<Loading />
					</div>
				) : (
					<div className="list">
						<Card>
							<div className="list__title">{title}</div>
							<hr className="list__line line" />
							<div className="list__content">
								{data.map(item => (
									<ListItem
										key={item._id}
										title={title}
										value={item}
										isBlock={isBlock}
									/>
								))}
							</div>
							<div className="list__wrapper">
								<Link className="list__button" to={`/${titleLink}`}>
									{`${strings.LIST__BUTTON} ${title}`}
								</Link>
							</div>
						</Card>
					</div>
				);
			}}
		</FetchApi>
	);
}

List.propTypes = {
	title: PropTypes.string.isRequired,
	isBlock: PropTypes.bool.isRequired,
	api: PropTypes.string.isRequired
};

export default List;
