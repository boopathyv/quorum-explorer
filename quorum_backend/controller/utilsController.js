const express = require('express');
const router = express.Router();
const Block = require('../models/blockSchema');
const Transaction = require('../models/transactionSchema');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.providerUrl);
const web3 = new Web3(provider);

router.get('/getLastBlock', (req, res) => {
	Block.getLastSavedBlock()
		.then(block => {
			if (!block) {
				return res.json({ block: [] });
			} else {
				return res.json({ block: block });
			}
		})
		.catch(err => {
			return res.json({ error: err.message });
		});
});

router.get('/totalTransactions', (req, res) => {
	Transaction.countDocuments()
		.then(count => {
			return res.json({ count: count });
		})
		.catch(err => {
			return res.json({ error: err.message });
		});
});

router.get('/totalBlocks', (req, res) => {
	Block.countDocuments()
		.then(count => {
			return res.json({ count: count });
		})
		.catch(err => {
			return res.json({ error: err.message });
		});
});

router.get('/totalContracts', (req, res) => {
	Transaction.countDocuments({ isContract: true })
		.then(count => {
			return res.json({ count: count });
		})
		.catch(err => {
			return res.json({ error: err.message });
		});
});

router.get('/getStats', (req, res) => {
	let totalTransactions = Transaction.countDocuments();
	let totalBlocks = Block.countDocuments();
	let totalContracts = Transaction.countDocuments({ isContract: true });

	Promise.all([totalBlocks, totalTransactions, totalContracts])
		.then(result => {
			return res.json({
				totalBlocks: result[0],
				totalTransactions: result[1],
				totalContracts: result[2]
			});
		})
		.catch(err => {
			return res.json({ error: err.message });
		});
});
module.exports = router;
