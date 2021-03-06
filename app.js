"use strict";

var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    MongoStore = require('connect-mongo')(express),
    mongoose = require('mongoose'),
    passport = require("passport"),
    flash = require("connect-flash"),
    engine = require('ejs-locals'),
    validator = require('express-validator'),
    finder = require('./config/middlewares/finder');

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

mongoose.connect(config.db);

var models_dir = __dirname + '/app/models';

fs.readdirSync(models_dir).forEach(function (file) {
    if (file[0] === '.') return;
    require(models_dir + '/' + file);
});

require('./config/passport')(passport, config);

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 8000);
    app.set('views', __dirname + '/app/views');
    // app.set('view engine', 'jade');
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(validator([]));

    var session = express.session({
        store: new MongoStore({
            url: 'mongodb://localhost:27017/sessions',
            maxAge: 300000
        }),
        secret: '5yH9xVLBLDVuXiB8IYVD'
    });
    app.use(session);

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.methodOverride());
    app.use(flash());
    app.use(finder.find);
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('500', {
        error: err
    });
});

app.use(function (req, res) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', {
            url: req.url
        });
        return;
    }
    if (req.accepts('json')) {
        res.send({
            error: 'Not found'
        });
        return;
    }
    res.type('txt').send('Not found');
});

require('./config/routes')(app, passport);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});