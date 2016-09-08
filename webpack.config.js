const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const DashboardPlugin = require("webpack-dashboard/plugin")

const plugins = [
    new DashboardPlugin({ port : 3004 }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        title : "JS SDK - DEV",
        cache : true
    }),
    new webpack.ProvidePlugin({
        "fetch"             : "exports?global.fetch!whatwg-fetch",
        "URLSearchParams"   : "exports?global.URLSearchParams!url-search-params"

    }),
]

module.exports = {
    plugins,
    entry : [
        "webpack-dev-server/client?http://localhost:8080/",
        "webpack/hot/only-dev-server",
        path.join(__dirname, "dev/index.ts")
    ],
    output : {
        path          : path.join(__dirname, "build"),
        publicPath    : "http://localhost:8080/",
        filename      : "bundle.js",
        hotUpdateChunkFilename: "[id].hot-update.js",
        hotUpdateMainFilename: "hot-update.json"
    },

    devtool : "eval-source-maps",
    devServer : {
        contentBase        : path.join(__dirname, "build"),
        port               : 8080,
        hot                : true
    },

    resolve : {
        extensions : ["", ".js", ".ts", ".tsx"]
    },

    module : {
        loaders : [
            { test : /\.tsx?$/, exclude: /node_modules/, loaders : ["babel", "awesome-typescript", "source-map"] },
        ]
    }
}
