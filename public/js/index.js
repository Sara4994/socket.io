var socket = io();

        socket.on('connect', () => {
            console.log('Connected to server');            
        })

        socket.emit('createMessage', {
            from: 'Saravana',
            text: 'Yup That works for me'
        });

        socket.on('disconnect', () => {
            console.log('disconnected from server')
        })
        

        socket.on('newMessage', (message) =>{
            console.log('newMessage', message)
        })