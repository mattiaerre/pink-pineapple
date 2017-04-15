const debug = require('debug')('pink-pineapple:index');
require('dotenv').config();
const oc = require('oc');
const dependencies = require('./package.json').dependencies;
const plugins = require('./plugins');

const getDependencies = () => { // eslint-disable-line
  return Object.keys(dependencies)
    .filter(name => (name !== 'dotenv'))
    .map(name => name);
};

const configuration = {
  baseUrl: process.env.BASE_URL,
  dependencies: getDependencies(),
  discovery: true,
  env: {
    name: process.env.ENV_NAME
  },
  pollingInterval: Number(process.env.POLLING_INTERVAL),
  port: Number(process.env.PORT) || 3000,
  s3: {
    bucket: process.env.S3_BUCKET,
    componentsDir: process.env.S3_COMPONENTS_DIR,
    key: process.env.S3_KEY,
    path: process.env.S3_PATH,
    region: process.env.S3_REGION,
    secret: process.env.S3_SECRET
  },
  tempDir: process.env.TEMP_DIR,
  verbosity: Number(process.env.VERBOSITY)
};

debug(`configuration: ${JSON.stringify(configuration, 0, 2)}`);

const registry = new oc.Registry(configuration);

plugins(registry);

registry.start((error, app) => { // eslint-disable-line
  if (error) {
    debug(`registry start error: ${error}`);
    process.exit(1);
  } else {
    debug(`registry running: ${configuration.baseUrl}`);
  }
});

registry.on('error:', (error) => {
  debug(`registry on error: ${error}`);
});
