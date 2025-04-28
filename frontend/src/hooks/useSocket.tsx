// client/src/hooks/useSocket.tsx
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { Message } from '../types';

const SOCKET_URL =  import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useSocket = (onMessageReceived: (message: Message) => void) => {
  const socketRef = useRef<Socket | null>(null);
  // Track recently sent message IDs to avoid duplicates
  const [sentMessageIds] = useState(new Set<number>());

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_URL);

    // Set up event listeners
    socketRef.current.on('message', (message: Message) => {
      // If we already processed this message locally, don't add it again
      if (sentMessageIds.has(message.id)) {
        sentMessageIds.delete(message.id); // Clean up the set
        return;
      }
      
      // Process messages that weren't sent by this client
      onMessageReceived(message);
    });

    // Clean up on unmount
    return () => {
      socketRef.current?.disconnect();
    };
  }, [onMessageReceived, sentMessageIds]);

  const sendMessage = (content: string, userId: number) => {
    if (socketRef.current) {
      socketRef.current.emit('message', { content, userId });
    }
  };

  return { sendMessage };
};