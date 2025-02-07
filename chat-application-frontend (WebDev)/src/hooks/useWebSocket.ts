import { useEffect, useRef, useCallback } from 'react';

export function useWebSocket(url: string) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    
    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = useCallback((message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  return { sendMessage, socket: ws.current };
}