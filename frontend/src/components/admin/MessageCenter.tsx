import React, { useState } from 'react';
import { MessageSquare, Search, Filter } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'order' | 'support' | 'general';
}

const MessageCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'John Doe',
      content: 'Question about order #ORD-2025-001',
      timestamp: new Date(),
      isRead: false,
      type: 'order',
    },
    // Add more mock messages as needed
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'order' | 'support' | 'general'>('all');

  const handleMarkAsRead = (messageId: string) => {
    setMessages(messages.map(message => 
      message.id === messageId ? { ...message, isRead: true } : message
    ));
  };

  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(message => message.type === filter);

  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Message Center</h2>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Messages</option>
            <option value="order">Order Related</option>
            <option value="support">Support</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Message List */}
        <div className="col-span-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 h-full overflow-y-auto">
            {filteredMessages.map((message) => (
              <button
                key={message.id}
                className={`w-full text-left p-4 hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? 'bg-indigo-50' : ''
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  handleMarkAsRead(message.id);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className={`h-5 w-5 ${
                      message.isRead ? 'text-gray-400' : 'text-indigo-600'
                    }`} />
                    <span className={`ml-3 font-medium ${
                      message.isRead ? 'text-gray-900' : 'text-indigo-900'
                    }`}>
                      {message.sender}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 truncate">
                  {message.content}
                </p>
                <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  message.type === 'order' ? 'bg-blue-100 text-blue-800' :
                  message.type === 'support' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {message.type}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="col-span-2 bg-white rounded-lg shadow">
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedMessage.sender}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {selectedMessage.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-4">
                <p className="text-gray-700">{selectedMessage.content}</p>
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type your reply..."
                    className="flex-1 border border-gray-300 rounded-md px-4 py-2 mr-4 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCenter;