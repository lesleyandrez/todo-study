module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/main.js'
  ],
  output: {
    filename: "./src/js-es5/__bundle.js"
  },
  devtool: "#inline-source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
}
