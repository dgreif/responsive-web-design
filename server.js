var express = require('express'),
    app = express(),
    server = app.listen(8080),
    io = require('./server/sockets').start(server);

require('./server/api').start(app, io);
