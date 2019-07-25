import React from 'react';
import { Link } from 'react-router-dom';

import DetailList from '../components/DetailList';

import getMainUrl from '../utils/getMainUrl';
import { backendAPIs } from '../strings/api';

function DetailListPage(props) {
	const url = getMainUrl(props);
	let api,
		title,
		id,
		columns = [];

	if (url === 'blocks') {
		api = backendAPIs.LISTBLOCKS;
		title = 'Blocks';
		columns = [
			{
				name: 'Block Height',
				key: 'number'
			},
			{
				name: 'Age',
				key: 'timestamp'
			},
			{
				name: 'Hash',
				key: 'blockHash',
				render: hash => <div>{hash.substr(0, 24) + '... '}</div>
			},
			{
				name: 'Total Transactions',
				key: 'totalTransactions'
			}
		];
	} else if (url === 'transactions') {
		api = backendAPIs.LISTTRANSACTIONS;
		title = 'Transactions';
		columns = [
			{
				name: 'Hash',
				key: 'transactionHash',
				render: hash => <div>{hash.substr(0, 14) + '...'}</div>
			},
			{
				name: 'Block',
				key: 'blockNumber',
				render: blockNumber => (
					<Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
				)
			},
			{
				name: 'Age',
				key: 'timestamp'
			},
			{
				name: 'From',
				key: 'from',
				render: fromAddress => (
					<Link to={`/address/${fromAddress}`}>
						{fromAddress.substr(0, 14) + '...'}
					</Link>
				)
			},
			{
				name: 'To',
				key: 'to',
				render: toAddress => (
					<Link to={`/address/${toAddress}`}>
						{toAddress.substr(0, 14) + '...'}
					</Link>
				)
			}
		];
	} else {
		id = props.match.params.id;
		api = backendAPIs.LISTADDRESS + id;
		title = 'Address';
		columns = [
			{
				name: 'Txn Hash',
				key: 'transactionHash',
				render: transactionHash => (
					<Link to={`/tx/${transactionHash}`}>
						{transactionHash.substr(0, 14) + '...'}
					</Link>
				)
			},
			{
				name: 'Block',
				key: 'blockNumber',
				render: blockNumber => (
					<Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
				)
			},
			{
				name: 'Age',
				key: 'timestamp'
			},
			{
				name: 'From',
				key: 'from',
				render: fromAddress => {
					if (fromAddress === id) {
						return <div>{fromAddress.substr(0, 14) + '...'}</div>;
					} else {
						return (
							<Link to={`/address/${fromAddress}`}>
								{fromAddress.substr(0, 14) + '...'}
							</Link>
						);
					}
				}
			},
			{
				name: 'To',
				key: 'to',
				render: toAddress => {
					if (toAddress === id) {
						return <div>{toAddress.substr(0, 14) + '...'}</div>;
					} else {
						return (
							<Link to={`/address/${toAddress}`}>
								{toAddress.substr(0, 14) + '...'}
							</Link>
						);
					}
				}
			}
		];
	}

	return <DetailList api={api} title={title} columns={columns} />;
}

export default DetailListPage;
