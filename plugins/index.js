const timezoneOffset = require('./timezone-offset');
const geoIp = require('oc-free-geo-ip-plugin');

module.exports = (registry) => {
  registry.register(
    {
      name: 'getTimezoneOffset',
      register: timezoneOffset
    }
  );

  registry.register(
    {
      name: 'getGeoIp',
      register: geoIp
    }
  );
};
