(function (io) {
    function setStatus(status) {
        document.getElementById('status').innerHTML = ' ' + status;
    }

    function getClientName() {
        var href = document.location.href;
        return decodeURI(href.substr(href.lastIndexOf('/') + 1)).replace('#', '');
    }

    function subscribeToIOEvents(io) {
        var myName = getClientName(),
            io = io.connect('/viewer', {query: 'name=' + myName});

        setStatus('Connected as: ' + myName);

        io.on('reload', function () {
            document.location.reload();
        });
    }

    function changeName() {
        document.location.href = "/client";
    }

    function addInfoSection() {
        var info = document.createElement('div'),
            changeButton = document.createElement('button'),
            status = document.createElement('span');

        info.id = "info";

        changeButton.innerHTML = "Change Name";
        changeButton.id = "changeName";
        changeButton.className = "btn btn-default";
        changeButton.onclick = changeName
        info.appendChild(changeButton);

        status.id = "status";
        info.appendChild(status);

        document.body.appendChild(info);
    }

    addInfoSection();
    subscribeToIOEvents(io);
})(io);
