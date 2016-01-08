# node-velbus

## Installation on raspberry Pi

### Install node

```sh
$ curl -sLS https://apt.adafruit.com/add | sudo bash
$ sudo apt-get install node
```

#### Install websocket module

```sh
$ sudo npm install -g nodejs-websocket
$ sudo npm link nodejs-websocket
```

Place src/node.js and src/velbus-socket.js in the home/pi directory

####Start nodeserver on startup

Open and add the node command to the file /etc/rc.local before the exit line

```sh
$ su pi -c 'node /home/pi/node.js < /dev/null &'
```

### Install velserver

(http://leachy.homeip.net/velbus/velserv.c) (http://forum.velleman.eu/viewtopic.php?f=26&t=3935)

Download file
```sh
cd ~
wget http://leachy.homeip.net/velbus/velserv.c
gcc -o velserv velserv.c -lpthread
```

And test..
```sh
/home/pi/velserv -v -v -v -v
```

Start velserver on startup

Open and add the velserv command to the file /etc/rc.local before the exit line

```sh
sudo nano /etc/rc.local
```

```sh
/home/pi/velserv -v  -v -v -v
```

### Install apache on raspberry

```sh
sudo apt-get install apache2 -y
```

Move index.html, style folder and src/client.js to the apache home directory


Browse to pi IP address.


