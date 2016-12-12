import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App.jsx"

ReactDOM.render(<App/>, document.getElementById("app"));

$(function() {
	var socket = io.connect('http://' + document.domain + ':' + location.port);
	var $messages = $("#messages");
	var $newMessage = $("#new-message");

	socket.on('new user', function(message) {
		var $newMsg = $("<li>", {
			text: message,
			"class": "enter"
		});
		$messages.append($newMsg);
	});

	socket.on('relaying message from server', function(message) {
		var $newMsg = $("<li>", {
			text: message
		});
		$messages.append($newMsg);
	});

	$("form").on('submit', function(e) {
		e.preventDefault();
		socket.emit('new message', $newMessage.val());
		$newMessage.val('');
	});
});
