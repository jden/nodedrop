var express = require('express')

var app = express()


app.all('/', function (req, res) {
  res.send('we\'re getting up and running')
})

app.listen(process.env.PORT || 2323)