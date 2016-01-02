(function() {
  var Velbus;

  exports.Velbus = Velbus = (function() {
    var client, net;

    net = require('net');

    client = new net.Socket();

    function Velbus() {
      client.connect(3788, '192.168.0.219');
    }

    Velbus.onError = function() {
      return console.log("error");
    };

    Velbus.onReceiveCommand = function() {
      return console.log("command received");
    };

    Velbus.onClose = function() {
      return console.log("closed");
    };

    Velbus.sendCommand = function(address, channel, priority, command) {
      var buffer, bytesArray, checksum, data_size, i, j, start, stop;
      start = 0x0F;
      data_size = 0x02;
      checksum = null;
      stop = 0x04;
      bytesArray = [start, priority, address, data_size, command, channel];
      for (i = j = 0; j < 6; i = ++j) {
        checksum += bytesArray[i];
        if (checksum > 255) {
          checksum = checksum - 256;
        }
      }
      checksum &= 0xff;
      checksum ^= 0xff;
      checksum += 0x01;
      buffer = new Buffer([start, priority, address, data_size, command, channel, checksum, stop]);
      console.log(buffer);
      return client.write(buffer);
    };

    client.on("error", function(data) {
      return console.log(data);
    });

    client.on("data", function(data) {
      var byte, byteArray, j, len, results;
      byteArray = new Uint8Array(data);
      results = [];
      for (j = 0, len = byteArray.length; j < len; j++) {
        byte = byteArray[j];
        results.push(console.log(byte));
      }
      return results;
    });

    return Velbus;

  })();

}).call(this);
