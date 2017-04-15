const timezoneOffset = require('./timezone-offset');

module.exports = (registry) => {
  registry.register(
    {
      name: 'getTimezoneOffset',
      register: timezoneOffset
    }
  );
};
