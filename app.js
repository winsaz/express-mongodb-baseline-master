const path = require('path');

// INITIATE GLOBAL VARIABLE
global.PATH = path.resolve(__dirname);
global.CONFIG = require('config');
global.LIBRARY = require(`${PATH}/helper/library`);
global.MIDDLEWARE = require(`${PATH}/helper/middleware`);
global.DAO = require(`${PATH}/dao`);
global.MODELS = require(`${PATH}/models`);

let app = LIBRARY.express();
let api = LIBRARY.express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(LIBRARY.favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(LIBRARY.morgan('dev'));
app.use(LIBRARY.bearerToken());
app.use(LIBRARY.bodyParser.json());
app.use(LIBRARY.bodyParser.urlencoded({extended: true}));
app.use(LIBRARY.validator({ customValidators: LIBRARY.function.customValidators })); // this line must be immediately after any of the bodyParser middlewares!
app.use(LIBRARY.cookieParser());
app.use(LIBRARY.cors());
app.use(LIBRARY.methodOverride('X-HTTP-Method-Override'));
app.use(LIBRARY.express.static(path.join(__dirname, 'public')));

///create sub app
app.use('/api/', api); /// init mounting

require('./routes/api/v1/index.js')(api); // load our routes and pass in our app

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
