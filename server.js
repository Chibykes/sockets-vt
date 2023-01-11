const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');
const port = process.env.PORT || 3001;

app.use(cors({
    origin: ['https://iambulance.chibykes.dev', 'https://idoctor.chibykes.dev', 'http://localhost:3000'],
    method: 'GET,POST',
}))

const server = app.listen(port, () => console.log('Server up and running'));
const io = new Server(server, {cors: {origin: "*"}}
);

app.get('/', (req, res) => {
    res.status(200).json('Home');
})

io.on('connection', socket => {

    // console.log(`Server: Socket Connected ${socket.id}`)

    socket.on('emergency', msg => {
        socket.broadcast.emit('emergency', msg)
    })

    socket.on('accept-emergency', msg => {
        socket.broadcast.emit('accept-emergency', msg)
    })

    socket.on('send', msg => {
        socket.broadcast.emit('send', msg)
    })

    socket.on('typing', msg => {
        socket.broadcast.emit('typing', msg)
    })

    socket.on('no_typing', msg => {
        socket.broadcast.emit('no_typing', msg)
    })


})