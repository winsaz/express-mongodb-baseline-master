var config = require('config');
var uri = config.get('mongodb').fullPath;
// console.log('data->',uri);
if (!uri) throw new Error('\033[31mYou need to provide the connection string. \
You can open "models/connection.js" and export it or use the "setUri" command.\033[0m');
else {
    // var cmd = uri.match(/^mongodb:\/\/(\w+):(.*?)@(.*?):(\d+)\/(\w+)$/);
    // if (!cmd) throw new Error('\033[31m Improperly formatted URI: \033[0m' + uri);
}
module.exports = uri;
