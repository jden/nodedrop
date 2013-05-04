var peers = {}
var socket = io.connect('/')
socket.on('connect', function () {
  socket.id = socket.socket.sessionid
  console.log('were live', socket)
})

socket.on('roster', function (_peers) {
  console.log('roster', _peers)
  peers = _peers
  delete peers[socket.id]
  renderPeers()
})

socket.on('namechange', function (id, name){
  console.log('namechange', id, name)
  peers[id].name = name
  renderPeers()
})
socket.on('enter', function (id) {
  console.log('enter', id)
  peers[id] = {name: id}
  renderPeers()
})
socket.on('exit', function (id) {
  console.log('exit', id)
  delete peers[id]
  renderPeers()
})


var $peers = $('#peers')
function renderPeers() {
  console.log('rendering', peers)
  if (!Object.keys(peers).length) {

    $peers.html('<li><em>none</em></li>')
    return
  }

  $peers.html(_.reduce(peers, function (html, peer, id) {
    html += '<li id=' + id + '>' + peer.name + '</li>'
    return html
  }, ''))

}
renderPeers()


var $name = $('#name')
$name.focus()
$name.on('keypress', function (e) {
  if (e.keyCode === 13) {
    $name.blur()
  }
})
$name.on('change', function (){
  var name = $name.val()
  socket.emit('namechange', name)
})
