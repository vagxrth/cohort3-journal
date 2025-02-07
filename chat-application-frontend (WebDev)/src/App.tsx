import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    ws.onopen= () => {
      console.log('Connection established');
      ws.send("Hello From Client!")
    }
    ws.onmessage = (message) => {
      console.log('Message received:', message.data);

      setSocket(ws)

      return () => ws.close();
    }
  }, [])

  return (
    <>
      <input type="text" placeholder='Enter Your Message' />
    </>
  )
}

export default App
