var http = require('http')

http.createServer(function (req, res) {
    console.log('req received')
    console.log(req.headers)
    
}).listen(1024)
