const express = require('express');

const app = express();
const server = app.listen(3000, function(){
    console.log('Server running on port 3000');
})

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.use(express.static('public'));


var socket = require('socket.io')

var io = socket(server);

io.sockets.on('connection', (socket)=>{
    console.log('New device connected', socket.id);

    socket.on('mouse', mouseMessage);

    function mouseMessage(data){
        socket.broadcast.emit('mouse', data);
        //io.sockets.emit('mouse', data);
        console.log(data);
    }

})

