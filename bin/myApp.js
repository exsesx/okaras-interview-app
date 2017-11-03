var createDatabase = require('../db'),
    knex = require('../db/connection');

console.log(process.env.DB_CREATE);
if (process.env.DB_CREATE === 'true') {
    createDatabase().catch(err => {
        throw err;
    })
}

var app = require('../app'),
    http = require('http');

var port = 3000;

var server = http.createServer(app);

server.listen(port);

server.on('listening', function () {
    var address = server.address();
    console.log('Server listen port ' + address.port);
});