const sharedConfig = require('./webpack.config.shared')

module.exports = (env, options) => ({
  ...sharedConfig,
  mode: 'production'
})
