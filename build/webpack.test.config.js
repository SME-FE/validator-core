
const path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['istanbul']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
