var _ = require('lodash');

function removeClientIfNoSockets() {
    if(this.hasSockets()) {
        sendUpdatedClient.call(this);
    } else {
        this.adminIo.emit('clientRemoved', this.name);
    }
}

function sendUpdatedClient() {
    this.adminIo.emit('clientUpdated', this.toJSON());
}

function Client(name, io) {
    this.name = name;
    this.controllerSockets = [];
    this.viewerSockets = [];
    this.feedback = null;
    this.io = io;
    this.adminIo = io.of('/admin');
}

function sendFeedbackToControllers() {
    _.each(this.controllerSockets, function (controllerSocket) {
        controllerSocket.emit('feedback', this.feedback);
    }, this);
}

Client.prototype.addControllerSocket = function (socketToAdd) {
    this.controllerSockets.push(socketToAdd)
    sendUpdatedClient.call(this);
};

Client.prototype.removeControllerSocket = function (socketToRemove) {
    this.controllerSockets = _.reject(this.controllerSockets, function (controllerSocket) {
        return controllerSocket === socketToRemove;
    });

    removeClientIfNoSockets.call(this);
};

Client.prototype.addViewerSocket = function (socketToAdd) {
    this.viewerSockets.push(socketToAdd)
    sendUpdatedClient.call(this);
};

Client.prototype.removeViewerSocket = function (socketToRemove) {
    this.viewerSockets = _.reject(this.viewerSockets, function (viewerSocket) {
        return viewerSocket === socketToRemove;
    });

    removeClientIfNoSockets.call(this);
};

Client.prototype.setFeedback = function (feedback) {
    this.feedback = feedback;

    sendUpdatedClient.call(this);
    sendFeedbackToControllers.call(this);
};

Client.prototype.toJSON = function () {
    return {
        name: this.name,
        controllers: this.controllerSockets.length,
        viewers: this.viewerSockets.length,
        feedback: this.feedback
    }
};

Client.prototype.hasSockets = function () {
    return this.controllerSockets.length || this.viewerSockets.length;
};

Client.prototype.resetStatus = function () {
    this.feedback.status = null;
    sendFeedbackToControllers.call(this);
};

module.exports = Client;