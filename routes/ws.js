'use strict';

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3001 });

var comments = [
  // {
  //   "author": "Pete Hunt",
  //   "text": "This is one comment"
  // }
];

wss.on('connection', function connection (ws) {
  console.log('connection made to ws');

  var sent = 0;
  var received = 0;
  var intervalId;

  var addMessage = function (message) {
    comments.unshift(message);
  };

  var sendAll = function () {
    console.log('sending...');
    var data = JSON.stringify(comments);
    console.log(data);
    // ws.send(data);
    wss.broadcast(data);
  };

  ws.on('message', function incoming (message) {
    received++;
    console.log('received: %s', message);
    addMessage(JSON.parse(message));
    sendAll();
  });

  ws.on('close', function close() {
    console.log('disconnected');
    clearInterval(intervalId);
  });

  sendAll();

  // intervalId = setInterval(function () {
  //   sent++;

  //   addMessage({
  //     author: 'dude',
  //     text: 'Current time is:' + Date.now()
  //   });
    
  //   console.log('sending', comments);
  //   ws.send(JSON.stringify(comments));
  // }, 3000);
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};