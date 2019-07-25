const mongoose = require("mongoose");
const options = { useNewUrlParser: true, useCreateIndex: true };

mongoose.connect(process.env.mongoUrl, options);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));

module.exports = connection;
