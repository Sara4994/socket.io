const path = require('path');
const http = require('http');
const express = require('express');
const socketIO= require('socket.io');


const publicPath = path.join(__dirname, '../public')

const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('User connected')

    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'new user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
       //console.log('createMessage', message)
        io.emit('newMessage',{
           from: message.from,
           txt: message.text,
           createdAt: new Date().getTime()
       })
//         socket.broadcast.emit('newMessage', {
//            from: message.from,
//            txt: message.text,
//            createdAt: new Date().getTime() 
//         })
    })

    socket.on('disconnect', () => {
        console.log('disconnected from server')
    })
})

server.listen(port,() =>{
    console.log(`server connected to Port ${port}`)
})