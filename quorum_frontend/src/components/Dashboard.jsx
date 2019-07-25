import React from 'react';

import '../styles/components/Dashboard.css';
import blockImg from '../images/blocks.svg';
import transactionImg from '../images/transactions.png';
import contractImg from '../images/contract.png';

import FetchApi from '../container/FetchApi';
import Card from './Card';
import Loading from './Loading';

import { backendAPIs } from '../strings/api';
import { strings } from '../strings/component';

function Dashboard(props) {
	const api = backendAPIs.GETSTATS;

	return (
		<Card>
			<FetchApi api={api}>
				{(data, loading) =>
					loading ? (
						<div
							className="dashboard__stats"
							style={{ justifyContent: 'center' }}
						>
							<Loading />
						</div>
					) : (
						<div className="dashboard__stats">
							<div className="dashboard__blocks">
								<div className="dashboard__image">
									<img src={blockImg} alt="block" height="40" width="40" />
								</div>
								<div className="dashboard__name">
									<div className="dashboard__key">
										{strings.DASHBOARD__BLOCK}
									</div>
									<div className="dashboard__value">{data.totalBlocks}</div>
								</div>
							</div>
							<div className="dashboard__transactions">
								<div className="dashboard__image">
									<img
										src={transactionImg}
										alt="block"
										height="40"
										width="40"
									/>
								</div>
								<div className="dashboard__name">
									<div className="dashboard__key">
										{strings.DASHBOARD__TRANSACTIONS}
									</div>
									<div className="dashboard__value">
										{data.totalTransactions}
									</div>
								</div>
							</div>
							<div className="dashboard__contracts">
								<div className="dashboard__image">
									<img src={contractImg} alt="block" height="40" width="40" />
								</div>
								<div className="dashboard__name">
									<div className="dashboard__key">
										{strings.DASHBOARD__CONTRACTS}
									</div>
									<div className="dashboard__value">{data.totalContracts}</div>
								</div>
							</div>
						</div>
					)
				}
			</FetchApi>
		</Card>
	);
}

export default Dashboard;
