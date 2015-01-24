var ws = (function () {
  'use strict';

  function Ws(config) {
    var that = this;
    var ws = new WebSocket('ws://' + config.url + ':' + config.port);
    
    ws.onopen = config.open;
    
    ws.onmessage = function (message) {
      that.received++;
      config.receive(JSON.parse(message.data));
    };

    this.ws = ws;
    this.onClose = config.close;
  };

  Ws.prototype.sent = 0;
  Ws.prototype.received = 0;

  Ws.prototype.send = function (data) {
    this.sent++;
    this.ws.send(JSON.stringify(data));
  };

  Ws.prototype.close = function () {
    this.ws.close();
    this.onClose();
  };

  return function (config) {
    return new Ws(config);
  };
}());

var socket = ws({
  url: 'localhost',
  port: 3001,
  open: function (event) {
    console.log('open!', event);
  },
  receive: function (message) {
    console.log('receive', message);
  },
  close: function () {
    console.log('socket closed');
  }
});