
let config = {};
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'booksonline';
config.serverPort = process.env.PORT || 5000;

export default config;