import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Image, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'system';
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
  currentUserId: string;
  orderId?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  recipientId,
  recipientName,
  currentUserId,
  orderId,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would fetch messages from an API
    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: recipientId,
        content: `Hello! How can I help you with your order${orderId ? ` #${orderId}` : ''}?`,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        isRead: true,
        type: 'text',
      },
      {
        id: '2',
        senderId: currentUserId,
        content: 'I have a question about the customization options for jeans.',
        timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
        isRead: true,
        type: 'text',
      },
      {
        id: '3',
        senderId: recipientId,
        content: 'Of course! What would you like to know specifically?',
        timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
        isRead: true,
        type: 'text',
      },
    ];
    
    setMessages(mockMessages);
  }, [recipientId, currentUserId, orderId]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add message to local state
    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
      type: 'text',
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate response (in a real app, this would be handled by WebSockets)
    setIsTyping(true);
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: recipientId,
        content: "Thank you for your message. I'll check and get back to you shortly.",
        timestamp: new Date(),
        isRead: false,
        type: 'text',
      };
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 3000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat header */}
      <div className="bg-indigo-600 px-4 py-3 flex items-center">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center">
            <User className="h-6 w-6 text-indigo-800" />
          </div>
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">{recipientName}</p>
          <p className="text-indigo-200 text-sm">
            {orderId ? `Order #${orderId}` : 'General Inquiry'}
          </p>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 flex ${
              message.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.senderId !== currentUserId && (
              <div className="flex-shrink-0 mr-2">
                <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center">
                  <User className="h-4 w-4 text-indigo-800" />
                </div>
              </div>
            )}
            
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.senderId === currentUserId
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p>{message.content}</p>
              <div
                className={`text-xs mt-1 flex justify-end ${
                  message.senderId === currentUserId ? 'text-indigo-200' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
                {message.senderId === currentUserId && (
                  <span className="ml-1">{message.isRead ? '✓✓' : '✓'}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="mb-4 flex justify-start">
            <div className="flex-shrink-0 mr-2">
              <div className="h-8 w-8 rounded-full bg-indigo-300 flex items-center justify-center">
                <User className="h-4 w-4 text-indigo-800" />
              </div>
            </div>
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
              <div className="flex items-center">
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce mx-1" style={{ animationDelay: '0.2s' }}></span>
                <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-200 px-4 py-3">
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Image className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 border-0 focus:ring-0 focus:outline-none px-4 py-2"
          />
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`inline-flex items-center justify-center p-2 rounded-full ${
              newMessage.trim()
                ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                : 'text-gray-400 bg-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;