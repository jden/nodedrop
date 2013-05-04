var express = require('express')
var sio = require('socket.io')
var app = express()


app.post('/upload', function () {




})


app.get('/*', express.static(__dirname + '/public'))



io = sio.listen(app)

io.sockets.on('connection', function (socket) {
  socket.broadcast.emit('enter')
})


app.listen(process.env.PORT || 2323)