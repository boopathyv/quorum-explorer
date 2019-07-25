# ethereum explorer

## Installation

`npm install`

`cp settings.json.template settings.json`

Modify the settings.json to change the db name or the url of the node you would like to connect to.
In production, you would probably wanna have these in your init scripts, then,

To sync blocks into the database from the blockchain, run,

`npm run sync`

Once done, start the api service, if you have lesser number of blocks, like in the case of quorum, you can directly run,

`npm start`

## Quorum

When working with quourm, if you get the error, [Number can only safely store up to 53 bits](https://github.com/ethereum/web3.js/issues/1215), change line 166 to the below in node_modules/web3-core-helpers/dist/web3-core-helpers.cjs.js, under the function,

`function outputBlockFormatter(block)`

from ~~`block.timestamp = Utils.hexToNumber(block.timestamp);`~~ to `block.timestamp = Utils.hexToNumberString(block.timestamp);`

## Unit Testing

npm run test-batch
