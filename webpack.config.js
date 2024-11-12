// webpack.config.js
module.exports = {
  // Other configurations...

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/html2pdf\.js/ // Ignore html2pdf.js for source maps
        ],
      },
    ],
  },
};
