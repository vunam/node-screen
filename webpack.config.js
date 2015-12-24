var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [{
    context: __dirname + "/src/console",
    entry: {
      javascript: "./app.js",
      html: "./index.html"
    },
    output: {
      filename: "./app.js",
      path: __dirname + "/dist/console"
    },
    module: {
  	  loaders: [
        { test: /\.html/, loader: 'file?name=[name].[ext]' },
        { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less") }
  	  ]
  	},
    node: {
      fs: 'empty',
      readline: "empty"
    },
    plugins: [
        new ExtractTextPlugin("style.css", {
            allChunks: true
        })
    ],
    watch: true
  },
  {
    context: __dirname + "/src/lib",
    entry: './index.js',
    output: {
      filename: "./index.js",
      path: __dirname + "/dist"
    },
    module: {
      loaders: [
        { test: /listener\.js/, loader: 'file?name=lib/[name].[ext]' },
      ]
    }
  }
]