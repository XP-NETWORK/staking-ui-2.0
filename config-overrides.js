const webpack = require("webpack");

module.exports = function override(webpackConfig) {
    webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream"),
        buffer: require.resolve("buffer"),
        algosdk: require.resolve("algosdk"),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify"),
        url: require.resolve("url"),
    };
    webpackConfig.resolve.fallback = webpackConfig;
    webpackConfig.ignoreWarnings = [/Failed to parse source map/];
    webpackConfig.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
    };
    webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        })
    );
    webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx)$/,
        enforce: "pre",
        loader: require.resolve("source-map-loader"),
        resolve: {
            fullySpecified: false,
        },
    });

    return webpackConfig;
};
