var express = require('express'),
    path = require('path'),
    getRawBody = require('raw-body'),
    publicDir = path.join(__dirname, '../public'),
    index = path.join(publicDir, 'index.html'),
    admin = path.join(publicDir, 'admin/index.html'),
    clientIndex = path.join(publicDir, 'client/index.html'),
    clients = {};

function setBasePath(app) {
    app.use(express.static(publicDir));
}

function enableCors(app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(function (req, res, next) {
        getRawBody(req, {
            length: req.headers['content-length'],
            limit: '1mb',
            encoding: 'utf8'
        }, function (err, string) {
            if (err)
                return next(err);

            req.text = string;
            next()
        });
    });
}

function getDefaultClientCode(clientName) {
    return '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>Hey ' + clientName + '!  Waiting for html and css to be sent from your computer...</body></html>'
}

function getClient(name) {
    return clients[name.toLowerCase()] || {name: name, code: getDefaultClientCode(name)}
}

function saveClient(name, clientObj) {
    clients[name.toLowerCase()] = clientObj;
}

function appendToClientCode(code) {
    var code = code.replace('</body>', '<script src="/socket.io/socket.io.js"></script><script src="client.js"></script></body>');
    code = code.replace('</head>', '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"><link href="client.css" type="text/css" rel="stylesheet"></head>');
    return code;
}

function sendClientPage(res, clientName) {
    var client = getClient(clientName),
        clientPage = appendToClientCode(client.code);
    res.send(clientPage);
}

function setClientCode(clientName, code) {
    var client = getClient(clientName);

    if (!code || !code.replace) {
        code = getDefaultClientCode(clientName);
    }

    client.code = code;

    saveClient(clientName, client);
}


function createApiEndPoints(app, io) {
    app.get('/', function (req, res) {
        res.sendFile(index);
    });

    app.get('/app', function (req, res) {
        res.sendFile(index);
    });

    app.get('/admin', function (req, res) {
        res.sendFile(admin);
    });

    app.get('/client', function (req, res) {
        res.sendFile(clientIndex);
    });

    app.get('/client/:name', function (req, res) {
        var clientName = req.params.name;
        sendClientPage(res, clientName);
    });

    app.post('/client/:name', function (req, res) {
        var clientName = req.params.name;

        setClientCode(clientName, req.text);

        io.emit('reload', clientName);

        res.sendStatus(200);
    });
}

function startApi(app, io) {
    setBasePath(app);
    enableCors(app);
    createApiEndPoints(app, io);
}

module.exports = {
    start: startApi
};