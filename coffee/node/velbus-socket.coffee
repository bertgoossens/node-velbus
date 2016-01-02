exports.Velbus = 
class Velbus
	net = require('net')
	client = new net.Socket()

	constructor: ->	
		client.connect(3788, '192.168.0.219')

	@onError: -> 
		console.log "error"

	@onReceiveCommand: ->
		console.log "command received"

	@onClose: ->
		console.log "closed"

	@sendCommand: (address, channel, priority, command) ->
		start = 0x0F 
		data_size = 0x02
		checksum = null
		stop = 0x04

		bytesArray = [start, priority, address, data_size, command, channel]

		for i in [0...6]
        	checksum += bytesArray[i]
        	if checksum > 255
                checksum = checksum - 256;

    	checksum &= 0xff;
    	checksum ^= 0xff;
    	checksum += 0x01;


		buffer = new Buffer([start, priority, address, data_size, command, channel, checksum, stop])

		console.log(buffer)

		client.write(buffer)

	client.on "error", (data)->	
		console.log data

	client.on "data", (data)->
		byteArray = new Uint8Array(data)

		for byte in byteArray
			console.log byte
			#console.log @byteToHex(byte)