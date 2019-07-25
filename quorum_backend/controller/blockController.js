const express = require('express');
const router = express.Router();
const Block = require('../models/blockSchema');
const Transaction = require('../models/transactionSchema');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.providerUrl);
const web3 = new Web3(provider);

router.get('/listBlocks', (req, res) => {
	let options = {};
	options.limit = req.query.limit;
	options.page = req.query.page;
	let select = 'number blockHash timestamp totalTransactions number';
	Block.reversePaginate({}, options, select)
		.then(blocks => {
			return res.status(200).json({ blocks: blocks });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/getBlock', (req, res) => {
	const blockNumber = req.query.number;
	if (!blockNumber) {
		return res.status(400).json({ error: 'Insufficient data' });
	}
	Block.findOne({ number: blockNumber })
		.then(block => {
			return res.status(200).json({ block: block });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/listTransactions', (req, res) => {
	let options = {};
	options.limit = req.query.limit;
	options.page = req.query.page;
	let select = 'transactionHash from to timestamp value blockNumber';
	Transaction.reversePaginate({}, options, select)
		.then(transactions => {
			return res.status(200).json({ transactions: transactions });
		})
		.catch(err => {
			return res.status(400).json({ error: err.message });
		});
});

router.get('/getTransaction', (req, res) => {
	const transactionHash = req.query.hash;
	let flag = 0;

	if (!transactionHash) {
		return res.status(400).json({ error: 'Insufficient data' });
	} else if (transactionHash.length !== 66) {
		return res.status(400).json({ error: 'Provide Valid TransactionHash' });
	}

	Transaction.findOne({ transactionHash: transactionHash })
		.then(transaction => {
			if (!transaction) {
				flag = 1;
				return web3.eth.getTransaction(transactionHash);
			} else {
				return transaction;
			}
		})
		.then(transaction => {
			if (flag === 1) {
				delete transaction.r;
				delete transaction.v;
				delete transaction.s;
				transaction.value = transaction.value / 10 ** 18;
				delete transaction.input;
				delete transaction.transactionIndex;
				transaction.transactionHash = transaction.hash;
				delete transaction.hash;
			}
			return res.status(200).json({ transaction: transaction });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/listUserTransactions', (req, res) => {
	const user = req.query.user;
	if (!user) {
		return res.status(400).json({ error: 'Insufficient data' });
	} else if (user.length !== 42) {
		return res.status(400).json({ error: 'Provide Valid Address' });
	}

	const select = 'from to transactionHash timestamp blockNumber value';
	let options = {};
	options.limit = req.query.limit;
	options.page = req.query.page;
	let query = {
		$or: [
			{
				from: user
			},
			{
				to: user
			}
		]
	};
	Transaction.reversePaginate(query, options, select)
		.then(transactions => {
			return res.status(200).json({ userTransactions: transactions });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/listBlockTransactions', (req, res) => {
	const blockHash = req.query.blockhash;
	if (!blockHash) {
		return res.status(400).json({ error: 'Insufficient data' });
	}
	const select = 'from to transactionHash timestamp blockNumber value';
	let options = {};
	options.limit = req.query.limit;
	options.page = req.query.page;
	Transaction.reversePaginate({ blockHash: blockHash }, options, select)
		.then(transactions => {
			return res.status(200).json({ transactions: transactions });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/listContracts', (req, res) => {
	const select = 'from to transactionHash timestamp number blockNumber';
	let options = {};
	options.limit = req.query.limit;
	options.page = req.query.page;
	const query = { isContract: true };
	Transaction.reversePaginate(query, options, select)
		.then(transactions => {
			return res.status(200).json({ transactions: transactions });
		})
		.catch(err => {
			return res.status(500).json({ error: err.message });
		});
});

router.get('/searchAll', (req, res) => {
	const search = req.query.search;
	if (!search) {
		return res.status(400).json({ error: 'Insufficient data' });
	} else if (search.length < 42) {
		Block.find({ number: search })
			.then(block => {
				return res.status(200).json({ result: block });
			})
			.catch(err => {
				return res.status(500).json({ err: err.message });
			});
	} else if (search.length == 42) {
		const select = 'from to transactionHash timestamp blockNumber';
		let options = {};
		let query = {
			$or: [
				{
					from: search
				},
				{
					to: search
				}
			]
		};
		Transaction.reversePaginate(query, options, select)
			.then(transactions => {
				return res.status(200).json({ result: transactions });
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	} else {
		let flag = 0;
		Transaction.find({ transactionHash: search })
			.then(transaction => {
				if (!transaction.length) {
					flag = 1;
					return web3.eth.getTransaction(search);
				} else {
					return transaction;
				}
			})
			.then(transaction => {
				if (flag === 1) {
					delete transaction.r;
					delete transaction.v;
					delete transaction.s;
					transaction.value = transaction.value / 10 ** 18;
					delete transaction.input;
					delete transaction.transactionIndex;
					transaction.transactionHash = transaction.hash;
					delete transaction.hash;
				}
				return res.status(200).json({ transaction: transaction });
			})
			.catch(err => {
				return res.status(500).json({ error: err.message });
			});
	}
});

module.exports = router;
