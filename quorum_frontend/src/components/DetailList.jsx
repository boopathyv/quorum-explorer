import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/DetailList.css';

import FetchApi from '../container/FetchApi';
import Card from '../components/Card';
import DetailListItem from './DetailListItem';
import Pagination from './Pagination';
import DetailListHeader from './DetailListHeader';
import Loading from './Loading';

class DetailList extends React.Component {
	componentDidMount() {
		document.title = `Quorum ${this.props.title}`;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.title !== this.props.title) {
			document.title = `Quorum ${this.props.title}`;
		}
	}

	render() {
		const { api, title, columns } = this.props;
		return (
			<FetchApi api={api}>
				{(apiData, loading) => {
					if (apiData) {
						var { documents: data, pages, page } =
							apiData.blocks ||
							apiData.transactions ||
							apiData.userTransactions;
					}
					return (
						<div>
							<div className="detailList__title">{title}</div>
							<Card>
								<div className="detailList__pagination__container">
									{loading ? (
										<div className="detailList__pagination__loading">
											<Loading style={{ width: 15, height: 15 }} />
											{apiData ? (
												<DetailListHeader title={title} data={data} />
											) : null}
										</div>
									) : (
										<DetailListHeader title={title} data={data} />
									)}
									<Pagination currentPage={page} pages={pages} />
								</div>
								{apiData ? (
									<div
										className="detailList__table"
										style={{
											gridTemplateColumns: `repeat(${columns.length}, 1fr)`
										}}
									>
										{columns.map(item => (
											<div className="detailList__col" key={item.key}>
												{item.name}
											</div>
										))}
										<DetailListItem columns={columns} data={data} />
									</div>
								) : null}
							</Card>
						</div>
					);
				}}
			</FetchApi>
		);
	}
}

DetailList.propTypes = {
	api: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	columns: PropTypes.array.isRequired
};

export default DetailList;
