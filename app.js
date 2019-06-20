// Import Module
var express = require('express');
var app = express();
var serv = require('http').Server(app);

// set url route
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html')
});
app.use('/client', express.static(__dirname + '/client'));

//set port to listern
serv.listen(2000);
console.log('server started');

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    console.log('socket connection');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
})