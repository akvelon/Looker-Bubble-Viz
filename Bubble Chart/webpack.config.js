const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'visual.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'visual'
  },
    module: {
      rules: [
        { test: /\.ts$/, loader: 'ts-loader' }
      ]
    },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4443,
    hot: false,
    inline: false,
    headers: {
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=0'
    },
    https: true,
    disableHostCheck: true
  },
  watch: true
};
