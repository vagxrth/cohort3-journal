export interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: number;
}

export interface WebSocketMessage {
    type: 'join' | 'chat';
    payload: {
        roomId?: string;
        message?: string;
    };
}