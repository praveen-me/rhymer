const express = require('express');
const path = require('path'); 
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const app = express();

// Webpack config
if (process.env.NODE_ENV === 'development') {
  console.log('in webpack hot middleware');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
}

app.use(require('./server/routes/index'));

// setting view
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'));

// Set image path
app.use('/images', express.static(path.join(__dirname, './client/src/images')));

app.listen(8001, () => {
  console.log('server is running on 8001');
});
