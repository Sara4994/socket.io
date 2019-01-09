
//import $ from 'jquery';

var socket = io();

        function scrollToBottom () {
            // Selectors
            var messages = $('#messages');
            var newMessage = messages.children('li:last-child')
            // Heights
            var clientHeight = messages.prop('clientHeight');
            var scrollTop = messages.prop('scrollTop');
            var scrollHeight = messages.prop('scrollHeight');
            var newMessageHeight = newMessage.innerHeight();
            var lastMessageHeight = newMessage.prev().innerHeight();
          
            if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
              messages.scrollTop(scrollHeight);
            }
          }

        socket.on('connect', () => {
            console.log('Connected to server');            
        })

        socket.on('disconnect', () => {
            console.log('disconnected from server')
        })
        
        socket.on('newMessage', (message) =>{
            var formattedTime = moment(message.createdAt).format('h:mm a')
            var template = $('#message-template').html();
            var html = Mustache.render(template,{
                text: message.text,
                from: message.from,
                createdAt: formattedTime    
            })

            $('#messages').append(html);
            scrollToBottom();
            //console.log('newMessage', message);
            // var li = $('<li></li>');
            // li.text(`${message.from} ${formattedTime}: ${message.text}`)

            // $('#message').append(li);
        })

        socket.on('newLocationMessage', (message) => {
            var formattedTime = moment(message.createdAt).format('h:mm a');
            var template = $('#location-message-template').html();
            var html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                createdAt: formattedTime
            })

            $('#messages').append(html);
            scrollToBottom();
            // var li = $('<li></li>');
            // var a = $('<a target="_blank"> My current location </a>')

            // li.text(`${message.from} ${formattedTime}: `)
            // a.attr('href', message.url)
            // li.append(a);
            // $('#messages').append(li)
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

        var messageTextBox = $('[name=message]');

        $('#message-form').on('submit', function (e) {
            e.preventDefault();

            socket.emit('createMessage', {
                from: 'User',
                text: messageTextBox.val()
            }, function(){
                messageTextBox.val('');    
            })
        })

        var locationButton = $('#send-location')

        locationButton.on('click', () => {
            if(!navigator.geolocation) {
             return alert('Geolocation is not support by the browser')
            }

            locationButton.attr('disabled','disabled').text('Sending location...');
            
            navigator.geolocation.getCurrentPosition( (position) => {
                locationButton.removeAttr('disabled').text('Send location');
                socket.emit('createLocationMessage', {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            }, () => {
                locationButton.removeAttr('disabled').text('Send location');
                alert('Unable to fetch location')
            })
        })