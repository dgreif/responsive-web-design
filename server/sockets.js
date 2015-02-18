var socketio = require('socket.io'),
    io,
    clientIo,
    adminIo;

function startSocketServer(appServer) {
    io = socketio.listen(appServer);

    clientIo = io.of('/client');
    clientIo.on('connection', function (clientSocket) {
        var clientName = "";

        clientSocket.on('disconnect', function () {
            //client is gone.
        });

        clientSocket.on('feedback', function (feedback) {
            console.log('feedback', feedback);
            adminIo.emit('feedback', feedback);
        });

        clientSocket.on('setName', function (name) {
            if (clientName) {
                clientSocket.leave(clientName);
            }
            clientSocket.join(name);

            console.log('got client name', clientName, name);

            clientName = name;
        });
    });

    adminIo = io.of('/admin');
    adminIo.on('connection', function (adminSocket) {

    });

    return io
}

module.exports = {
    start: startSocketServer
};