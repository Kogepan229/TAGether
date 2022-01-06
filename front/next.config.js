const path = require('path');
const env = require('./env.json');

module.exports = {
  env: env,
  webpack(conf, _opt) {
    conf.resolve.alias['@'] = path.join(__dirname, 'src/components');
    conf.resolve.alias['@mytypes'] = path.join(__dirname, 'src/types');
    return conf;
  },
};
