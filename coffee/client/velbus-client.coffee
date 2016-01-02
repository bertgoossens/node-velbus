connection = new WebSocket('ws://bert.local:8001')

connection.onopen = ->
  #connection.send('{}'); // Send the message 'Ping' to the server
  return

connection.onerror = (error) ->
  console.log 'WebSocket Error ' + error
  return

connection.onmessage = (e) ->
  console.log 'Server: ' + e.data
  return

$(document).ready ->
  $('.light-button').click ->
    address = $(this).data('address')
    channel = $(this).data('channel')
    action = '01'
    if $(this).hasClass('on')
      action = '02'
      $(this).removeClass('on').addClass 'off'
    else
      action = '01'
      $(this).removeClass('off').addClass 'on'
    command = 
      address: address
      channel: channel
      action: action
    connection.send JSON.stringify(command)
    false
  return
