import React from 'react';
import { Link } from 'react-router-dom';

import DetailView from '../components/DetailView';

import getMainUrl from '../utils/getMainUrl';
import { backendAPIs } from '../strings/api';

function DetailViewPage(props) {
	const id = props.match.params.id;
	const url = getMainUrl(props);
	let api,
		title,
		columns = [];

	if (url === 'block') {
		api = backendAPIs.GETBLOCK + id;
		title = 'Block';
		columns = [
			{
				name: 'Block Height',
				key: 'number'
			},
			{
				name: 'Hash',
				key: 'blockHash'
			},
			{
				name: 'Timestamp',
				key: 'timestamp'
			},
			{
				name: 'Total Transactions',
				key: 'totalTransactions'
			},
			{
				name: 'Difficulty',
				key: 'difficulty'
			},
			{
				name: 'Total Difficulty',
				key: 'totalDifficulty'
			},
			{
				name: 'Sha3Uncles',
				key: 'sha3Uncles'
			}
		];
	} else {
		api = backendAPIs.GETTRANSACTION + id;
		title = 'Transaction';
		columns = [
			{
				name: 'Block Hash',
				key: 'blockHash'
			},
			{
				name: 'Number',
				key: 'blockNumber',
				render: blockNumber => (
					<Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
				)
			},
			{
				name: 'Hash',
				key: 'transactionHash'
			},
			{
				name: 'Nonce',
				key: 'nonce'
			},
			{
				name: 'From',
				key: 'from',
				render: fromAddress => (
					<Link to={`/address/${fromAddress}`}>{fromAddress}</Link>
				)
			},
			{
				name: 'To',
				key: 'to',
				render: toAddress => (
					<Link to={`/address/${toAddress}`}>{toAddress}</Link>
				)
			},
			{
				name: 'Timestamp',
				key: 'timestamp'
			}
		];
	}
	return <DetailView title={title} api={api} columns={columns} id={id} />;
}

export default DetailViewPage;
