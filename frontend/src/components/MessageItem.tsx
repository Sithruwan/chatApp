import React from 'react';
import { Message as MessageType } from '../types';

interface MessageItemProps {
  message: MessageType;
  currentUserId: number;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, currentUserId }) => {
  const isCurrentUser = message.userId === currentUserId;
  const formattedTime = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Multiple fallbacks for username
  const username = message.user?.name || 
                  (isCurrentUser ? "You" : message.user?.name);

  console.log("Message item props:", { message, currentUserId, isCurrentUser, username });

  return (
    <div className={`message-item ${isCurrentUser ? 'current-user' : ''}`}>
      <div className="message-content">
        <div className="message-header">
          <span className="username">{username}</span>
          <span className="timestamp">{formattedTime}</span>
        </div>
        <div className="message-text">{message.content}</div>
      </div>
    </div>
  );
};

export default MessageItem;