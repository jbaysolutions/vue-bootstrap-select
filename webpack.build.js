var config = require('./webpack.config.js')

config.entry = {
  'vue-bootstrap-select': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'VueBootstrapSelect',
  libraryTarget: 'umd'
}


module.exports = config
