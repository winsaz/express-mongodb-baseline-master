module.exports = {
    express: require('express'),
    mongoose: require('mongoose'),
    bodyParser: require('body-parser'),
    cookieParser: require('cookie-parser'),
    methodOverride: require('method-override'),
    path: require('path'),
    jwt: require('jsonwebtoken'),
    cors: require('cors'),
    morgan: require('morgan'),
    co: require('co'),
    bearerToken: require('express-bearer-token'),
    validator: require('express-validator'),
    bcrypt: require('bcrypt'),
    output:require('./output.js'),
    status: require('./status.js'),
    function: require('./function.js'),
    fs: require('fs'),
    request: require('request')
}