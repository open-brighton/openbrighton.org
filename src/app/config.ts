// settings.ts
// Exports runtime settings for the app

export type Config = {
  NODE_ENV: string;
  VERSION: string;
  API_HOST: string;
};

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const API_HOST: string = process.env.API_HOST || 'api.openbrighton.org';
import pkg from '../../package.json';
const VERSION: string = (pkg as { version: string }).version;

const config: Config = {
  NODE_ENV,
  VERSION,
  API_HOST,
};

export default config;
export { NODE_ENV, VERSION, API_HOST };