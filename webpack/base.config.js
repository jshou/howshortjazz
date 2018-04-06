module.exports = {
  entry: "./lib/script.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }]
    }]
  },
  mode: 'development'
};
