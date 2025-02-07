import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { Message, WebSocketMessage } from './types';
import { useWebSocket } from './hooks/useWebSocket';
import { MessageSquare } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { sendMessage, socket } = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message: Message = {
          id: crypto.randomUUID(),
          text: event.data,
          sender: 'Other',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, message]);
      };
    }
  }, [socket]);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && room) {
      const message: WebSocketMessage = {
        type: 'join',
        payload: { roomId: room }
      };
      sendMessage(message);
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const message: WebSocketMessage = {
        type: 'chat',
        payload: { message: input }
      };
      sendMessage(message);
      
      const newMessage: Message = {
        id: crypto.randomUUID(),
        text: input,
        sender: username,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
    }
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center mb-8">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-white">Chat App</h1>
            </div>
          </div>
          
          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-1">
                Room ID
              </label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold text-white">
              Room: {room}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              Logged in as {username}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwnMessage={message.sender === username}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}

export default App;