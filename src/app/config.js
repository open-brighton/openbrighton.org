// settings.js
// Exports runtime settings for the app

const NODE_ENV = process.env.NODE_ENV || 'development';
const API_HOST = process.env.API_HOST || 'api.openbrighton.org'
// Dynamically require package.json for version
const { version: VERSION } = require('../../package.json');

module.exports = {
  NODE_ENV,
  VERSION,
  API_HOST,
}; 