var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackConfig = require('./config/webpack.config');
var orm = require("orm");

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var editor = require('./routes/editor');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');

var app = express();

//orm
// app.use(orm.express("mysql://root:123456@localhost:3306/blog",{
//   define: function(db,models,next){
//     db.load('./app/models/users','./app/models/articles',function(err){
//
//     });
//     db.sync()
//   }
// }));

app.use(orm.express("mysql://root:123456@localhost:3306/blog", {
    define: function(db, models, next) {
        models.User = db.define("user", {
            id: { type: 'serial', key:true },
            name: String,
            username: String,
            password: String,
						createdate: Date,
						lastlogindate:Date
        });
				// db.drop(function(){
					models.User.sync(function() {
	            // created tables for Person model
	        });
				// });
        next();
    }
}));
app.use(orm.express("mysql://root:123456@localhost:3306/blog", {
    define: function(db, models, next) {
        models.Articles = db.define("articles", {
            id: { type: 'serial', key:true },
            headline: String,
            subtitle: String,
            path: String,
						createdate: Date,
						lasteditdate:Date
        });
				// db.drop(function(){
					models.Articles.sync(function() {
	            // created tables for Person model
	        });
				// });
        next();
    }
}));

//webpack setup
var compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/editor', editor);
app.use('/register', register);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
