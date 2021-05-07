module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    })
    return config
  },
  future: {
    webpack5: true,
  },
}
