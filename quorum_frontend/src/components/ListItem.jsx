import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/components/ListItem.css';
import formatTime from '../utils/formatTime';

import { strings } from '../strings/component';

function ListItem(props) {
	const { isBlock, value } = props;
	return (
		<>
			{isBlock ? (
				<>
					<div className="listItem">
						<div className="listItem__header">
							<div className="listItem__title">
								{strings.LISTITEM__BLOCK__TITLE}
							</div>
							<div className="listItem__data">
								<Link
									to={`/block/${value.number}`}
									className="listItem__number"
								>
									{value.number}
								</Link>
								<div className="listItem__timestamp">
									{formatTime(value.timestamp)}
								</div>
							</div>
						</div>
						<div className="listItem__subData">
							<span className="listItem__subData__txns">
								{`${value.totalTransactions} ${strings.LISTITEM__TXNS}`}
							</span>
						</div>
					</div>
					<hr className="listItem__line line" />
				</>
			) : (
				<>
					<div className="listItem">
						<div className="listItem__header">
							<div className="listItem__title listItem__tx">
								{strings.LISTITEM__TX__TITLE}
							</div>
							<div className="listItem__data">
								<Link
									to={`/tx/${value.transactionHash}`}
									className="listItem__number"
								>
									{value.transactionHash.substr(0, 14) + '...'}
								</Link>
								<div className="listItem__timestamp">
									{formatTime(value.timestamp)}
								</div>
							</div>
						</div>
						<div className="listItem__subData">
							<div className="listItem__subData__from">
								<span>{`${strings.LISTITEM__FROM} `}</span>
								<Link
									to={`/address/${value.from}`}
									className="listItem__subData__value"
								>
									{value.from.substr(0, 14) + '...'}
								</Link>
							</div>
							<div className="listItem__subData__to">
								<span>{`${strings.LISTITEM__TO} `}</span>
								<Link
									to={`/address/${value.to}`}
									className="listItem__subData__value"
								>
									{value.to.substr(0, 14) + '...'}
								</Link>
							</div>
						</div>
					</div>
					<hr className="listItem__line line" />
				</>
			)}
		</>
	);
}

ListItem.propTypes = {
	isBlock: PropTypes.bool.isRequired,
	value: PropTypes.object.isRequired
};

export default ListItem;
