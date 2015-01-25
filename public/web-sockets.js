var ws = (function () {
  'use strict';

  function Ws(config) {
    var that = this;
    var ws = new WebSocket('ws://' + config.url + ':' + config.port);
    var scope = config.scope || this;

    this.scope = scope;
    
    ws.onopen = function () {
      config.open.apply(scope, [config]);
    };
    
    ws.onmessage = function (message) {
      that.received++;
      config.receive.apply(scope, [JSON.parse(message.data)]);
    };

    this.ws = ws;
    this.onClose = function () {
      config.close.apply(scope, arguments);
    };
  };

  Ws.prototype.sent = 0;
  Ws.prototype.received = 0;

  Ws.prototype.send = function (data) {
    this.sent++;
    this.ws.send(JSON.stringify(data));
  };

  Ws.prototype.close = function () {
    this.ws.close();
    this.onClose.apply(this.scope, arguments);
  };

  return function (config) {
    return new Ws(config);
  };
}());

