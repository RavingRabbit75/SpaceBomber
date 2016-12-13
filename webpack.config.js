module.exports = {
	entry: "./project/static/js/main.js",
	output: {
		filename:"bundle.js",
		path:"./project/static/js/"
	},
	module: {
		loaders:[{
			loader:"babel",
			test:/\.jsx?$/,
			exclude:/node_modules/
		}]
	},
	devtool: "inline-source-map"
}
