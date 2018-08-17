var fs = require('fs');

//require all the models
var controllers = {};
var names = fs.readdirSync('./controllers/api/v1/');

names.forEach(name => {
    if (!name.match(/\.js$/)) return;
    if (name === 'index.js') return;
    var model = require('./' + name);

    controllers[name.replace('.js', '')] = model;
});
module.exports = controllers;
