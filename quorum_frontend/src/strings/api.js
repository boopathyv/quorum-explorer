export const backendAPIs = {
	BASE: 'http://localhost:3000/api',
	LISTBLOCKS: '/listBlocks?limit=13',
	LISTTRANSACTIONS: '/listTransactions?limit=13',
	LISTADDRESS: '/listUserTransactions?limit=13&user=',
	GETBLOCK: '/getBlock?number=',
	GETTRANSACTION: '/getTransaction?hash=',
	GETSTATS: '/utils/getStats'
};
