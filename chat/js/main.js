$(function() {
    var inputField = $("#message");
    var chat = $("#chat");

    var socket = new WebSocket("ws://WEBSOCKET_URL");
    socket.onclose = function(evt) {
        $("<p><b>Connection closed.</b></p>").appendTo(chat);
    }
    socket.onmessage = function(evt) {
        $("<p>" + evt.data + "</p>").appendTo(chat);
    }

    $("#input").submit(function() {
        if (socket == null) return false;
        if (inputField.val() == null) return false;

        socket.send(inputField.val());
        inputField.val("");

        return false
    });
});
