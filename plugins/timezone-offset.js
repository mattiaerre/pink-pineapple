// todo: move to `oc-hub`

const name = 'timezone-offset';

const debug = require('debug')(`pink-pineapple:plugins/${name}`);

module.exports.register = (options, dependencies, next) => {
  debug(`plugin ${name} registered`);
  next();
};

module.exports.execute = () => (new Date().getTimezoneOffset());
