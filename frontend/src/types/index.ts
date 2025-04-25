export interface User {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Message {
    id: number;
    content: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
    user: User;
  }