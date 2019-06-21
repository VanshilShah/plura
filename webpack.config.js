const path = require('path');

module.exports = {
  mode: 'production',
  entry: './public/react-components/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  watch: true
};