module.exports = {
  context: __dirname + "/src",
  entry: "./demo.js",

  output: {
    filename: "demo.js",
    path: __dirname + "/dist",
  },
  module: {
	  loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel']}
	  ]
	},
  watch: true
}