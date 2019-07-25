require('./settings');
const db = require('./database/connection');
const express = require('express');
const app = express();
const cors = require('cors');
const blockController = require('./controller/blockController');
const utilsController = require('./controller/utilsController');
const syncBlock = require('./sync/saveBlocks');

app.use(cors());

app.use('/api/', blockController);
app.use('/api/utils/', utilsController);

app.get('/test', (req, res) => {
	res.json({ data: 'etho' });
});

syncBlock();

app.listen(3000, () => {
	console.log('Server running on port 3000');
});

module.exports.app = app;
