import React from 'react';

import '../styles/components/ListContainer.css';

import List from './List';

function ListContainer() {
	return (
		<div className="listContainer">
			<List isBlock={true} title="Blocks" api="/listBlocks" />
			<List isBlock={false} title="Transactions" api="/listTransactions" />
		</div>
	);
}

export default ListContainer;
