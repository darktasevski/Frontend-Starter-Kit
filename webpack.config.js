const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    App: './app/assets/scripts/App.js', // tell webpack which file should it be looking for to bundle it
    Vendor: './app/assets/scripts/Vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './app/temp/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7']
                }
              }
            ]
          ]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};

// todo mocha testing after bundling
