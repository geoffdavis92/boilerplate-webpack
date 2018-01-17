const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: {
		app: "./src/"
	},
	output: {
		filename: "app.js?h=[hash]",
		path: path.resolve(__dirname, "dist")
	},
	devtool: "inline-source-map",
	resolve: {
		extensions: [".js", ".jsx", ".json", ".ts", ".tsx", ".mjs"],
		alias: {
			// aliasName: path.resolve(__dirname, "path/to/module")
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader!ts-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		process.env.NODE_ENV && process.env.NODE_ENV === "production"
			? new webpack.DefinePlugin({
					"process.env": {
						NODE_ENV: JSON.stringify("production")
					}
				})
			: () => null,
		process.env.NODE_ENV && process.env.NODE_ENV === "production"
			? new webpack.optimize.UglifyJsPlugin()
			: () => null
	]
};
