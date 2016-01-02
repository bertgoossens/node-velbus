(function() {
  var connection;

  connection = new WebSocket('ws://bert.local:8001');

  connection.onopen = function() {};

  connection.onerror = function(error) {
    console.log('WebSocket Error ' + error);
  };

  connection.onmessage = function(e) {
    console.log('Server: ' + e.data);
  };

  $(document).ready(function() {
    $('.light-button').click(function() {
      var action, address, channel, command;
      address = $(this).data('address');
      channel = $(this).data('channel');
      action = '01';
      if ($(this).hasClass('on')) {
        action = '02';
        $(this).removeClass('on').addClass('off');
      } else {
        action = '01';
        $(this).removeClass('off').addClass('on');
      }
      command = {
        address: address,
        channel: channel,
        action: action
      };
      connection.send(JSON.stringify(command));
      return false;
    });
  });

}).call(this);
