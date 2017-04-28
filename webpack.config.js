const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['./src/index'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public/javascripts')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
        include: path.join(__dirname, 'src')
      }]
  }
};
