var webpack = require('webpack');
var config = require('./webpack.config');
var bodyParser = require('body-parser'); //解析请求body

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');


var express = require('express');
var routes = require("./routes");

var app = new express();
var PORT = 4400;
var compiler = webpack(config);

app.use(webpackDevMiddleware(
    compiler,
    {
        noInfo: true,
        publicPath: config.output.publicPath
    }
));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, function(error) {
   if(error) {
       console.log(error);
   }else {
       console.log('Listening on port %s. Open up http://localhost:%s/ in your browser.', PORT, PORT);
   }
});