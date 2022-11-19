const webpack = require("webpack");

module.exports = function override(webpackConfig) {
    webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream"),
        buffer: require.resolve("buffer"),
        algosdk: require.resolve("algosdk"),
    };

    webpackConfig.ignoreWarnings = [/Failed to parse source map/];

    webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],

        })
    );

    return webpackConfig;
};
