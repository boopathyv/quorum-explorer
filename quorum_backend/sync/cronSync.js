require("../settings");
const syncBlock = require("./saveBlocks");
const cron = require("node-cron");

const count = 0;
cron.schedule("*/5 * * * * *", () => {
	syncBlock();
});
