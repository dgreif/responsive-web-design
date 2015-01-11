function sendCode(code, name) {
    $.ajax('http://localhost:8081/' + encodeURI(name), {
        data: code,
        type: "POST"
    });
}