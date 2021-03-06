var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-----------------------------------------------------------------------------
// Custom Express Logic
//-----------------------------------------------------------------------------
var defaultRouter =  express.Router();
defaultRouter.get('/', function(request, response, next) {
    response.render('index', { title: 'Express' });
});
defaultRouter.get('/derp', function(request, response, next) {
    response.send('You done derped');
});
app.use('/', defaultRouter);
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// Express-Sitemap Logic
//-----------------------------------------------------------------------------
var sitemap = require('express-sitemap');
sitemap = sitemap({
                    url: 'http://example.com',
                    route: {
                        '/': {
                            lastmod: '2015-02-22',
                            changefreq: 'weekly',
                            priority: '0.5',
                        },
                    },
                   });
sitemap.generate(app, ['/']);
sitemap.toFile();
//-----------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
