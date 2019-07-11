const { resolve } = require("path");
const plugins = require("./plugins");

const outputDir = resolve(__dirname, "../build");
const outputFilename = "macaron-core.node.cli.js";
module.exports = {
  entry: [
    "./lib.js"
  ],
  target: "node",
  output: {
    path: outputDir,
    filename: outputFilename,
    library: "Macaron-Cli",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "shebang-loader"
      }
    ]
  },
  externals: /^(source-map-support|yargs|bn.js)$/,
  resolve: {
    alias: {
      // eth-block-tracker is es6 but automatically builds an es5 version for us on install.
      "eth-block-tracker": "eth-block-tracker/dist/es5/index.js",

      // replace native `scrypt` module with pure js `js-scrypt`
      scrypt: "js-scrypt"
    }
  },
  plugins: plugins(outputDir, outputFilename),
  mode: "production"
};
