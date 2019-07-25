const mongoose = require('mongoose');
const reversePagination = require('../database/reversePagination');
const Web3 = require('web3');
const provider = new Web3.providers.HttpProvider(process.env.providerUrl);
const web3 = new Web3(provider);

const transactionSchema = mongoose.Schema({
	blockHash: {
		type: String
	},
	blockNumber: {
		type: Number
	},
	gas: {
		type: Number
	},
	gasPrice: {
		type: String
	},
	transactionHash: {
		type: String,
		required: true,
		unique: true
	},
	nonce: {
		type: Number
	},
	from: {
		type: String
	},
	to: {
		type: String
	},
	timestamp: {
		type: String
	},
	value: {
		type: String
	},
	isContract: {
		type: Boolean,
		default: false
	}
});

transactionSchema.pre('save', async function() {
	const transaction = this;
	if (!transaction.to) {
		let receipt = await web3.eth.getTransactionReceipt(transaction.transactionHash);
		transaction.to = receipt.contractAddress;
		transaction.isContract = true;
	}
});

transactionSchema.plugin(reversePagination);
const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
