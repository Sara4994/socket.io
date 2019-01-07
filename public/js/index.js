
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

        socket.on('newLocationMessage', (message) => {
            var li = $('<li></li>');
            var a = $('<a target="_blank"> My current location </a>')

            li.text(`${message.from}: `)
            a.attr('href', message.url)
            li.append(a);
            $('#messages').append(li)
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

        var locationButton = $('#send-location')

        locationButton.on('click', () => {
            if(!navigator.geolocation) {
             return alert('Geolocation is not support by the browser')
            }
            
            navigator.geolocation.getCurrentPosition( (position) => {
                socket.emit('createlocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, () => {
                alert('Unable to fetch location')
            })
        })