const Web3 = require("web3");
const provider = new Web3.providers.HttpProvider(process.env.providerUrl);
const web3 = new Web3(provider);
const Block = require("../models/blockSchema");
const db = require("../database/connection");

async function saveBlock(latestBlock, startBlock, count = startBlock) {
	let processingBlock = "";
	let block = await web3.eth.getBlock(count);
	processingBlock = block;
	let blockInstance = new Block({
		number: block.number,
		blockHash: block.hash,
		timestamp: block.timestamp,
		transactions: block.transactions,
		totalTransactions: block.transactions.length,
		difficulty: block.difficulty,
		totalDifficulty: block.totalDifficulty,
		size: block.size,
		gasUsed: block.gasUsed,
		gasLimit: block.gasLimit,
		parenHash: block.parenHash,
		sha3Uncles: block.sha3Uncles,
		nonce: block.nonce
	});
	let res = await blockInstance.save();
	console.log(processingBlock.number + ". " + processingBlock.hash);
	if (count == latestBlock) {
		syncBlock();
		return;
	}
	return `block ${processingBlock.number} synced`;
}

function done() {
	console.log("done");
}

let latestBlock = "";

async function syncBlock() {
	latestBlock = await web3.eth.getBlockNumber();
	lastSavedBlock = await Block.getLastSavedBlock();

	if (lastSavedBlock === latestBlock) {
		console.log("Fully synced");
		return;
	} else if (latestBlock > lastSavedBlock) {
		lastSavedBlock += 1;
	} else {
		lastSavedBlock = 1;
	}
	console.log("Syncing in progress...");
	for (let index = lastSavedBlock; lastSavedBlock <= latestBlock; lastSavedBlock++) {
		let message = await saveBlock(latestBlock, lastSavedBlock);
		console.log(message);
	}
}

module.exports = syncBlock;
