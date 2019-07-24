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
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }]
    }]
  },
  mode: 'development'
};
