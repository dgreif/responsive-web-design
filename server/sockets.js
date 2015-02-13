var socketio = require('socket.io'),
    io;

function startSocketServer(appServer) {
    io = socketio.listen(appServer);

    io.on('connection', function (client) {
        client.on('disconnect', function () {
            //client is gone.
        });
    });

    return io
}


module.exports = {
    start: startSocketServer
};