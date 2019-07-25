const mongoose = require("mongoose");
const Transaction = require("./transactionSchema");
const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider(process.env.providerUrl);
const web3 = new Web3(provider);
const reversePagination = require("../database/reversePagination");

const blockSchema = mongoose.Schema({
	number: {
		type: Number
	},
	blockHash: {
		type: String,
		required: true,
		unique: true
	},
	timestamp: {
		type: String
	},
	transactions: {
		type: [String]
	},
	totalTransactions: {
		type: Number
	},
	difficulty: {
		type: String
	},
	totalDifficulty: {
		type: String
	},
	size: {
		type: Number
	},
	gasUsed: {
		type: Number
	},
	gasLimit: {
		type: Number
	},
	parenHash: {
		type: String
	},
	sha3Uncles: {
		type: String
	},
	nonce: {
		type: String
	}
});

blockSchema.pre("save",async function() {
	const block = this;

	block.transactions.forEach(async transaction => {
		let transactionDetails = await web3.eth.getTransaction(transaction);
		const transactionInstance = new Transaction({
			blockHash: transactionDetails.blockHash,
			blockNumber: transactionDetails.blockNumber,
			gas: transactionDetails.gas,
			gasPrice: transactionDetails.gasPrice,
			transactionHash: transactionDetails.hash,
			nonce: transactionDetails.nonce,
			from: transactionDetails.from,
			to: transactionDetails.to,
			timestamp: block.timestamp,
			value: transactionDetails.value / 10 ** 18
		});
		let save = await transactionInstance.save();
	});
});

blockSchema.statics.getLastSavedBlock = function() {
	const Block = this;
	return Block.countDocuments()
		.then(number => {
			if (number == 0) {
				return 0;
			} else {
				return Block.find().skip(number - 1);
			}
		})
		.then(block => {
			if (block.length > 0) {
				return block[0].number;
			} else {
				return undefined;
			}
		});
};

blockSchema.plugin(reversePagination);
const Block = mongoose.model("blocks", blockSchema);

module.exports = Block;
