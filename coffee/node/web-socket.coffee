# create websocket server
ws = require("nodejs-websocket")
server = ws.createServer((conn) ->
    conn.on "text", (json) ->
        object = JSON.parse(json)

        address = +("0x"+object.address) 
        action = +("0x"+object.action) 
        channel = null

        switch object.channel
            when 1 then channel = 0x01
            when 2 then channel = 0x02
            when 3 then channel = 0x04
            when 4 then channel = 0x08

        Velbus.Velbus.sendCommand(address, channel, 0xF8, action)     
        conn.sendText(json.toUpperCase())

    conn.on "close", (code, reason) ->
        console.log "Connection closed"  
).listen(8001)

# make the velbus connection
Velbus = require('./velbus-socket.js')
velbus = new Velbus.Velbus