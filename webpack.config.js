module.exports = {
  context: __dirname + "/src",
  entry: "./testpage.js",

  output: {
    filename: "run.js",
    path: __dirname + "/dist",
  },
  module: {
	  loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}
	  ]
	},
  node: {
    fs: 'empty',
    readline: "empty"
  },
  watch: true
}