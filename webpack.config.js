module.exports = (env, options) => {
  const { mode } = options
  // console.log('env', env)
  // console.log('mode', mode)
  return mode === 'development'
    ? require('./config/webpack.config.dev.js')(env, options)
    : require('./config/webpack.production.config.js')(env, options)
}
