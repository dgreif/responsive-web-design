var socketio = require('socket.io'),
    _ = require('lodash'),
    io,
    clientIo,
    adminIo,
    viewerIo,
    ClientManager = require('./ClientManager'),
    clientManager;

function startSocketServer(appServer) {
    io = socketio.listen(appServer);
    clientManager = new ClientManager(io);
    io.clientManager = clientManager;

    clientIo = io.of('/controller');
    clientIo.on('connection', function (controllerSocket) {
        var clientName = "";

        controllerSocket.on('disconnect', function () {
            if (clientName) {
                clientManager.getClient(clientName).removeControllerSocket(controllerSocket);
            }
        });

        controllerSocket.on('feedback', function (feedback) {
            if (clientName) {
                var client = clientManager.getClient(clientName);

                client.setFeedback(feedback);
            }
        });

        controllerSocket.on('setName', function (newName) {
            if (clientName === newName) {
                return;
            }

            if (clientName) {
                controllerSocket.leave(clientName);
                clientManager.getClient(clientName).removeControllerSocket(controllerSocket);
            }

            if (newName) {
                controllerSocket.join(newName);
                clientManager.getClient(newName).addControllerSocket(controllerSocket);

                clientName = newName;
            }
        });

        controllerSocket.on('question', function (question) {
            adminIo.emit('question', {
                clientName: clientName,
                question: question
            });
        });
    });

    adminIo = io.of('/admin');
    adminIo.on('connection', function (adminSocket) {
        var clients = _.map(clientManager.getClients(), function (client) {
            return client.toJSON();
        });

        adminSocket.emit('currentClients', clients);

        adminSocket.on('resetStatuses', function () {
            clientManager.resetStatuses();

            adminIo.emit('resetStatuses');
        });
    });

    viewerIo = io.of('/viewer');
    viewerIo.on('connection', function (viewerSocket) {
        var clientName = viewerSocket.handshake.query.name,
            client = clientManager.getClient(clientName);

        client.addViewerSocket(viewerSocket);

        viewerSocket.on('disconnect', function () {
            client.removeViewerSocket(viewerSocket);
        });
    });

    return io
}

module.exports = {
    start: startSocketServer
};