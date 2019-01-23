const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
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

// mongodb connection
mongoose.connect('mongodb://praveen-me:PRAVEEN1234@ds257564.mlab.com:57564/primathon-rhym', { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log('connected to mongodb');
});

// Setting Paths
app.use('/api', require('./server/routes/api.js'));
app.use(require('./server/routes/index'));

// setting view
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './server/views'));

// Set image path
app.use('/images', express.static(path.join(__dirname, './client/src/images')));;


const PORT = process.env.PORT || 8001

app.listen(PORT, () => {
  console.log('server is running on 8001');
});
