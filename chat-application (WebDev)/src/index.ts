import { WebSocketServer } from "ws";

const ws = new WebSocketServer({ port: 8080 })

ws.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log('Received Data: %s', data)
    })
    socket.send('Hello from server!')
})