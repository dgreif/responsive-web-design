(function(io) {
    function setStatus(status) {
        document.getElementById('status').innerHTML = ' ' + status;
    }

    function getClientName() {
        var href = document.location.href;
        return decodeURI(href.substr(href.lastIndexOf('/') + 1));
    }

    function subscribeToIOEvents(io) {
        var io = io.connect(),
            myName = getClientName();

        setStatus('Connected as: ' + myName);

        io.on('reload', function (clientName) {

            if(clientName == myName) {
                document.location.reload();
            }
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
