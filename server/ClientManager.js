var Client = require('./Client'),
    _ = require('lodash');

function ClientManager (io) {
    this.clients = {};
    this.io = io;
}

ClientManager.prototype.getClients = function () {
    return _.filter(this.clients, function (client) {
        return client.hasSockets();
    });
};

ClientManager.prototype.getClient = function (name) {
    if(!this.clients[name] && name.trim()) {
        this.clients[name] = new Client(name, this.io);
    }

    return this.clients[name];
};

ClientManager.prototype.resetStatuses = function (name) {
    _.each(this.clients, function (client) {
        client.resetStatus();
    });
};

module.exports = ClientManager;