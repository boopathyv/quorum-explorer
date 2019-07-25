var superTest = require('supertest');
var expect = require('expect');
var app = require('../../app').app;

it('listBlocks method ',(done) => {
	superTest(app).get('/api/listBlocks').query({limit:2,page:1}).expect(
		{"blocks":{"pages":30798,"limit":2,"page":1,"documents":[{"_id":"5c934e7bbe88432518d2b3a0","number":61594,"blockHash":"0x872b6c58f608ee0a105b21f9623f6ee0bfb0b474c079d08f6cfb0388e6da7304","timestamp":"1439174943","totalTransactions":0},{"_id":"5c934e7abe88432518d2b39f","number":61593,"blockHash":"0x66d41b1ca59052cd1600b3cb104b46b1bc8d530358c6df5e18d027ca49e9c310","timestamp":"1439174929","totalTransactions":0}]}}
	).end(done);
})

it('getBlock method ',(done) => {
	var blockNumber = 23;
	superTest(app).get('/api/getBlock').query({number:blockNumber})
	.expect((res) => {
		expect(res['body']['blocks']!==undefined);
		expect(res['body']['blocks']['number']).toBe(blockNumber);
	}).end(done);
})

it('listTransactions method ',(done) => {
	var blockNumber = 20;
	superTest(app).get('/api/listTransactions').query({limit:90,page:908})
		.expect((res) => {
			console.log(res['body']);
			expect(res !== undefined);
	}).end(done);
})