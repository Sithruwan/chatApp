import {createServer} from "node:http";
import { UserService } from "./services/UserService.mjs";
import { UserController } from "./controllers/UserController.mjs";
import express from "express";
import cors from "cors";
import initializeSocket from './socket.mjs'
import dotenv from "dotenv";
import  { connectDB, sequelize} from "./configs/database.mjs";
import { createIndexRouter } from "./routes/IndexRoutes.mjs"; 
import syncDB from "./configs/syncDB.mjs";
import { MessageService } from "./services/MessageService.mjs";
import { MessageController } from "./controllers/MessageController.mjs";

dotenv.config();




// Initialize services
export const userService = UserService.getInstance(); // Singleton
export const messageService = MessageService.getInstance();

// Initialize controllers with injected services
export const userController = UserController.getInstance();
export const messageController = MessageController.getInstance();


const PORT = process.env.PORT || 4000;

const app = express();
const server = createServer(app);

initializeSocket(server);


await connectDB(); 
const allowedOrigins = [
  process.env.CLIENT_URL,  // External access via IP
  'http://frontend:5173',       // Internal Docker network access (keep this for development)
  'http://localhost:5173'       // Local development
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Sync database and start server
const start = async () => {
  try {
    await syncDB();
    console.log('Database synchronized');

    app.use('/api/v1', createIndexRouter(userController)); // Use the router

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
