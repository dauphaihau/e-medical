const path = require("path");

module.exports = {
  env: {
    RUN_ENV: process.env.RUN_ENV
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    config.resolve.alias["@components"] = path.resolve(__dirname, "components");
    config.resolve.alias["@constants"] = path.resolve(__dirname, "constants");
    config.resolve.alias["@utils"] = path.resolve(__dirname, "utils");
    // Important: return the modified config
    return config;
  },
  reactStrictMode: true,
  // basePath: '/v2',
}
