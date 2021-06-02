const awsServerlessExpress = require('aws-serverless-express');
const main = require('./main');
const server = awsServerlessExpress.createServer(main);
exports.handler = (event, context) => {
    console.log("EVENT", JSON.stringify(event));
    awsServerlessExpress.proxy(server, event, context);
};
