var fs = require('fs');

//require all the models
var VM = {};
var names = fs.readdirSync('./dao/');

names.forEach(name => {
    if (!name.match(/\.js$/)) return;
    if (name === 'index.js') return;
    var viewModel = require('./' + name);

    VM[name.replace('.js', '')] = viewModel;
});
module.exports = VM;
