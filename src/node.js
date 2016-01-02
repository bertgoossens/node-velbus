(function() {
  var Velbus, server, velbus, ws;

  ws = require("nodejs-websocket");

  server = ws.createServer(function(conn) {
    conn.on("text", function(json) {
      var action, address, channel, object;
      object = JSON.parse(json);
      address = +("0x" + object.address);
      action = +("0x" + object.action);
      channel = null;
      switch (object.channel) {
        case 1:
          channel = 0x01;
          break;
        case 2:
          channel = 0x02;
          break;
        case 3:
          channel = 0x04;
          break;
        case 4:
          channel = 0x08;
      }
      Velbus.Velbus.sendCommand(address, channel, 0xF8, action);
      return conn.sendText(json.toUpperCase());
    });
    return conn.on("close", function(code, reason) {
      return console.log("Connection closed");
    });
  }).listen(8001);

  Velbus = require('./velbus-socket.js');

  velbus = new Velbus.Velbus;

}).call(this);
