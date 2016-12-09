module.exports = {
	entry: "./project/static/js/main.js",
	output: {
		filename:"bundle.js",
		path:"./project/templates/"
	},
	module: {
		loaders:[{
			loader:"babel",
			test:/\.jsx?$/,
			excludes:/node_modules/
		}]
	},
	devtool: "inline-source-map"
}
