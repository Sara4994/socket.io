
//import $ from 'jquery';

var socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');            
        })

        socket.on('disconnect', () => {
            console.log('disconnected from server')
        })
        
        socket.on('newMessage', (message) =>{
            console.log('newMessage', message);
            var li = $('<li></li>');
            li.text(`${message.from} : ${message.text}`)

            $('#message').append(li);
        })

        socket.on('newMessage', (message) =>{
            console.log('newMessage', message)
        })

        // socket.emit('createMessage', {
        //     from: 'Esha',
        //     text: 'Oye'
        // }, function(data){
        //     console.log('Got it', data)
        // })

        $('#message-form').on('submit', function (e) {
            e.preventDefault();

            socket.emit('createMessage', {
                from: 'User',
                text: $('[name=message]').val()
            }, function(data){
                console.log('Got it',data)
            })
        })