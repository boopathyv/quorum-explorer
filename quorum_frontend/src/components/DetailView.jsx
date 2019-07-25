import React from 'react';

import '../styles/components/DetailView.css';

import FetchApi from '../container/FetchApi';
import Card from '../components/Card';
import Loading from '../components/Loading';

import formatTime from '../utils/formatTime';

class DetailView extends React.Component {
	componentDidMount() {
		document.title = `Quorum ${this.props.title} ${this.props.id} Info`;
	}

	componentDidUpdate(prevProps) {
		document.title = `Quorum ${this.props.title} ${this.props.id} Info`;
	}

	render() {
		const { api, title, columns } = this.props;
		return (
			<FetchApi api={api}>
				{(data, loading) => {
					if (loading) {
						return <Loading style={{ borderWidth: 4 }} />;
					} else {
						data = data.block || data.transaction;
						return (
							<div>
								<div className="detailView__page__title">
									<div className="detailView__page__title__primary">
										{title}
									</div>
								</div>
								<Card>
									<div className="detailView__card__content">
										{columns.map((item, index) => (
											<React.Fragment key={item.key}>
												<div className="detailView__card__item">
													<div className="detailView__item__name">
														{item.name}:{' '}
													</div>
													<div className="detailView__item__value">
														{item.render
															? item.render(data[item.key])
															: item.key === 'timestamp'
															? formatTime(data[item.key])
															: data[item.key]}
													</div>
												</div>
												{columns.length - 1 === index ? null : (
													<hr className="detailView__line line" />
												)}
											</React.Fragment>
										))}
									</div>
								</Card>
							</div>
						);
					}
				}}
			</FetchApi>
		);
	}
}

export default DetailView;
