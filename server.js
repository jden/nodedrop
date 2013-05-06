var express = require('express')
var http = require('http')
var sio = require('socket.io')
var app = express()

var server = http.createServer(app)


app.post('/upload', function () {

  console.log('uploaded')

})


app.get('/*', express.static(__dirname + '/public'))


io = sio.listen(server)

var peers = {}

io.sockets.on('connection', function (socket) {
  peers[socket.id] = {name: socket.id}
  socket.emit('roster', peers)
  socket.broadcast.emit('enter', socket.id)

  socket.on('disconnect', function () {
    delete peers[socket.id]
    socket.broadcast.emit('exit', socket.id)
  })

  socket.on('namechange', function (name) {
    console.log('namechange', socket.id, name)
    peers[soscket.id].name = name
    socket.broadcast.emit('namechange', socket.id, name)
  })

})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


var port = process.env.PORT || 2323
server.listen(port)
console.log('server started on ' + port)
