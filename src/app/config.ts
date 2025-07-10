// settings.ts
// Exports runtime settings for the app

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const API_HOST: string = process.env.API_HOST || 'api.openbrighton.org';
// Dynamically import package.json for version
import pkg from '../../package.json';
const VERSION: string = (pkg as { version: string }).version;

export type Config = {
  NODE_ENV: string;
  VERSION: string;
  API_HOST: string;
};

export { NODE_ENV, VERSION, API_HOST }; 