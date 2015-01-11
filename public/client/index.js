function disableForm() {
    document.getElementById('name').disabled = true;
    document.getElementById('submit').disabled = true;
}

function setName(name) {
    disableForm();
    document.location.href = "/client/" + encodeURI(name);
}

function nameSubmitted() {
    var name = document.getElementById('name').value;

    name = name.trim();

    if (name) {
        setName(name);
    }

    return false;
}