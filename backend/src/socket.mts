import { Server } from 'socket.io';
import {Server as httpServer} from "node:http";
import { messageService } from './server.mjs';


export default (server: httpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173' || 'http://frontend:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', async (data: { content: string; userId: number }) => {
      try {
        // Ensure user info is included
        const message = await messageService.createMessage(data.content, data.userId);
        
        // Log what's being sent
        console.log("Sending message with user:", message);
        
        io.emit('message', message);
      } catch (error) {
        console.error('Error creating message:', error);
        socket.emit('error', { message: 'Failed to save message' });
      }
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
};