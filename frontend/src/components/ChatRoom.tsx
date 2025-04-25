// client/src/components/ChatRoom.tsx
import React, { useState, useEffect } from 'react';
import { getMessages } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import { Message } from '../types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user,logout } = useAuth();
  
  // Keep track of local temporary message IDs
  //const [tempMessageIds] = useState(new Set<number>());

  const handleMessageReceived = (message: Message) => {
    setMessages(prevMessages => {
      // Check if this is replacing a temporary message
      if (message.userId === user?.id) {
        // For messages from the current user, we want to replace
        // any temporary version with the official one from the server
        const updatedMessages = prevMessages.filter(m => 
          // Keep messages that are not temporary or have different content
          !(m.id.toString().length > 10 && m.content === message.content && m.userId === message.userId)
        );
        return [...updatedMessages, message];
      } else {
        // For messages from other users, just add them
        return [...prevMessages, message];
      }
    });
  };

  const { sendMessage } = useSocket(handleMessageReceived);

  const handleSendMessage = (content: string) => {
    if (user) {
      // Verify user data before using it
      console.log("Current user data:", user);
      
      // Send to server
      sendMessage(content, user.id);
      
      // Create temporary message with explicit user data
      const tempMessage: Message = {
        id: Date.now(),
        content,
        userId: user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: {
          id: user.id,
          name: user.name // Make sure this property exists
        }
      };
      
      console.log("Created temp message:", tempMessage);
      
      setMessages(prevMessages => [...prevMessages, tempMessage]);

      //console.log("Messages after sending:", [...messages, tempMessage]);
    }
  };

 

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await getMessages();
        setMessages(fetchedMessages);
        setError(null);
      } catch (err) {
        console.error('Error loading messages:', err);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="chat-room">
      <div className="chat-header">
        <h2>Group Chat</h2>
        <button onClick={logout} style={{width:"100px"}}>Logout</button>
        {user && <div className="user-info">Logged in as {user.name}</div>}
      </div>
      
      <MessageList 
        messages={messages}
        currentUserId={user?.id || 0}
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={!user}
      />
    </div>
  );
};

export default ChatRoom;