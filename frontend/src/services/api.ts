import axios from 'axios';
import { User, Message } from '../types';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api/v1';
const API_URL =  'http://85.208.51.170:4000/api/v1';

export const login = async (name: string): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/user/create`, { username:name });
  return response.data;
};
export const logout = async (name: string): Promise<User> => {
    const response = await axios.post<User>(`${API_URL}/user/delete`, { username:name });
    return response.data;
  };

export const getMessages = async (): Promise<Message[]> => {
  const response = await axios.get<Message[]>(`${API_URL}/chat`);
  return response.data;
};
