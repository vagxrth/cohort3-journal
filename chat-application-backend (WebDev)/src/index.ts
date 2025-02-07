import { WebSocketServer, WebSocket } from "ws";

interface User {
    socket: WebSocket,
    room: String
}

const ws = new WebSocketServer({ port: 8080 })

let allSockets: User[] = []

ws.on('connection', (socket) => {

    socket.on('message', (data) => {
        
        const parsedData = JSON.parse(data.toString())

        if (parsedData.type === 'join') {
            allSockets.push({
                socket,
                room: parsedData.payload.roomId
            })
        }

        if (parsedData.type === 'chat') {
            const currentUserRoom = allSockets.find((s) => s.socket === socket)?.room
            
            allSockets
                .filter(s => s.room === currentUserRoom)
                .forEach(s => s.socket.send(parsedData.payload.message));
        }
        
    })
})