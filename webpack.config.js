const path = require('path');

module.exports = {
  // Add other Webpack configurations as needed
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/html2pdf\.js/, // Exclude html2pdf.js to prevent the warning
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
