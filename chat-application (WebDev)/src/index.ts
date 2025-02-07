import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({ port: 8080 })

let userCount = 0;
const allSockets: WebSocket[] = []

ws.on('connection', (socket) => {

    allSockets.push(socket)

    userCount++;
    console.log(`User Connected: ${userCount}`)

    socket.on('message', (data) => {
        console.log('Received Data: %s', data)
        allSockets.forEach((s) => s.send(`Server Send This Message: ${data}`))
    })
})