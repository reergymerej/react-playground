'use strict';

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3001 });

wss.on('connection', function connection (ws) {
  console.log('connection made to ws');

  var sent = 0;
  var received = 0;
  var intervalId;

  ws.on('message', function incoming (message) {
    received++;

    console.log('received: %s', message);
  });

  ws.on('close', function close() {
    console.log('disconnected');
    clearInterval(intervalId);
  });

  intervalId = setInterval(function () {
    sent++;
    var message = JSON.stringify({
      id: sent,
      date: Date.now()
    });

    console.log('sending', message);
    ws.send(message);
  }, 3000);
});