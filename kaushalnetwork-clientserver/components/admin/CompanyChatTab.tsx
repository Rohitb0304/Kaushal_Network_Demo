/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  CheckCircle,
  Clock,
  ChevronDown,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Smile,
  Image,
  X,
  Info,
} from 'lucide-react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const CompanyChatTab: React.FC = () => {
  const [activeChat, setActiveChat] = useState<{
    id: number;
    chatId: number;
    userId: number;
    CompanyUser: {
      username: string;
      name: string;
      email: string;
      companyId: number;
      contactNumber: string;
    };
  } | null>();
  const [message, setMessage] = useState('');
  const [contacts, setContacts] = useState<
    {
      id: number;
      chatId: number;
      userId: number;
      CompanyUser: {
        username: string;
        name: string;
        email: string;
        companyId: number;
        contactNumber: string;
      };
    }[]
  >([]);
  const [messages, setMessages] = useState<{
    selfChatUser: {
      id: number;
      chatId: number;
      userId: number;
    };
    chatMessages: [
      {
        id: number;
        chatUserId: number;
        message: string;
        createdAt: string;
        seen: boolean;
      },
    ];
  }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileContactsVisible, setIsMobileContactsVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_CHAT_BASE_URL}/api/chat`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` } })
      .then(data => {
        setContacts(data.data as any);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    socket?.emit('chat message', message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMobileContacts = () => {
    setIsMobileContactsVisible(!isMobileContactsVisible);
  };

  return (
    <div className="h-[calc(100vh-9rem)] max-h-[800px] flex flex-col bg-white rounded-xl overflow-hidden relative">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between mt-10 sm:mt-0">
        <div className="flex items-center">
          <button
            className="md:hidden mr-3 p-2 hover:bg-gray-100 rounded-lg"
            onClick={toggleMobileContacts}
          >
            {isMobileContactsVisible ? <X size={20} /> : <MessageSquare size={20} />}
          </button>
          <h1 className="text-xl font-semibold text-gray-900 flex items-center">
            <MessageSquare size={20} className="mr-2 text-blue-600" />
            Company Chat
            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5 animate-pulse"></div>
              Beta
            </span>
          </h1>
        </div>

        {/* Professional Feature Preview Section */}
        <div className="flex items-center space-x-1">
          <div className="group relative">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
              <Users size={16} />
              <span className="hidden sm:inline">Groups</span>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            </button>
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 whitespace-nowrap">
                <div className="text-xs font-semibold text-gray-900 mb-1">Group Chat</div>
                <div className="text-xs text-gray-600">Coming in v2.0</div>
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
              <Bell size={16} />
              <span className="hidden sm:inline">Alerts</span>
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></div>
            </button>
            <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 whitespace-nowrap">
                <div className="text-xs font-semibold text-gray-900 mb-1">Smart Notifications</div>
                <div className="text-xs text-gray-600">Coming in v2.0</div>
              </div>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors duration-200">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Contact List - Hidden on mobile when chat is active */}
        <AnimatePresence>
          {(isMobileContactsVisible ||
            !activeChat ||
            !window.matchMedia('(max-width: 768px)').matches) && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="w-full md:w-80 h-full border-r border-gray-200 bg-white flex flex-col"
            >
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="pl-9 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Contact List */}
              <div className="overflow-y-auto flex-1">
                {contacts.length > 0 ? (
                  contacts.map(contact => (
                    <motion.button
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      key={contact.chatId}
                      className={`w-full text-left px-3 py-3 border-b border-gray-100 flex items-start space-x-3 ${
                        activeChat?.chatId === contact.chatId ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => {
                        setActiveChat(contact);
                        const url = `${import.meta.env.VITE_CHAT_BASE_URL}/api/chat-message?chatId=${contact.chatId}`;
                        axios
                          .get(url, {
                            headers: { Authorization: `Bearer ${Cookies.get('auth_token')}` },
                          })
                          .then(res => setMessages(res.data))
                          .catch(err => console.log(err));

                        if (socket) {
                          socket.emit('disconnect');
                        }
                        const newSocket = io('wss://www.kaushalnetwork.in', {
                          path: '/chat/socket.io',
                          // extraHeaders: { token: `${Cookies.get('auth_token')}` },
                          transports: ['websocket'],
                          query: {
                            token: Cookies.get('auth_token'),
                          },
                        });
                        newSocket.on('connect', () => {
                          console.log('connected to chat socket');
                        });
                        newSocket.emit('join chat', contact.chatId);
                        newSocket.on('chat message', msgData => {
                          setMessages((prev: any) => {
                            if (!prev) {
                              return {};
                            }
                            return {
                              ...prev,
                              chatMessages: [...prev.chatMessages, msgData],
                            };
                          });
                        });
                        setSocket(newSocket);

                        if (window.matchMedia('(max-width: 768px)').matches) {
                          setIsMobileContactsVisible(false);
                        }
                      }}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-blue-500 to-indigo-600">
                          {contact.CompanyUser.name.charAt(0).toUpperCase()}
                        </div>
                        {/* {contact.online && (
                          <div className="absolute -right-0.5 -bottom-0.5 bg-green-500 border-2 border-white rounded-full w-3 h-3"></div>
                        )} */}
                        {/* {contact.verified && (
                          <div className="absolute -right-0.5 top-0 bg-white rounded-full border border-white">
                            <CheckCircle size={10} className="text-blue-600" />
                          </div>
                        )} */}
                      </div>

                      {/* Contact Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 truncate pr-2">
                            {contact.CompanyUser.name}
                          </h3>
                          {/* <span className="text-xs text-gray-500">{contact.time}</span> */}
                        </div>
                        {/* <p className="text-sm text-gray-600 truncate">{contact.message}</p> */}
                      </div>

                      {/* Unread Badge */}
                      {/* {contact.unread > 0 && (
                        <div className="ml-2 bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {contact.unread}
                        </div>
                      )} */}
                    </motion.button>
                  ))
                ) : (
                  <div className="text-center py-8 px-4">
                    <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Search size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">No chats match your search</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation Area */}
        <div
          className={`flex-1 flex flex-col ${!activeChat && !isMobileContactsVisible ? 'flex' : activeChat && !isMobileContactsVisible ? 'flex' : 'hidden md:flex'}`}
        >
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="py-3 px-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center space-x-3">
                  {/* Mobile back button */}
                  <button
                    className="md:hidden p-1.5 hover:bg-gray-100 rounded-lg"
                    onClick={toggleMobileContacts}
                  >
                    <ChevronDown size={20} className="text-gray-600" />
                  </button>

                  {/* Contact Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md">
                      {activeChat?.CompanyUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>

                  {/* Contact Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      {activeChat.CompanyUser?.name}
                      <CheckCircle size={14} className="ml-1.5 text-blue-500" />
                    </h3>
                    <p className="text-xs text-green-600 font-medium">Active now</p>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex items-center space-x-1">
                  <div className="group relative">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:from-green-50 hover:to-green-100 hover:border-green-200 hover:text-green-600 transition-all duration-200">
                      <Phone size={16} />
                      <span className="hidden sm:inline text-xs">Call</span>
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                        Voice calls coming in v1.5
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-500 text-sm font-medium hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 hover:text-blue-600 transition-all duration-200">
                      <Video size={16} />
                      <span className="hidden sm:inline text-xs">Video</span>
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                        Video calls coming in v1.5
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <button className="p-2 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg text-gray-500 hover:from-gray-100 hover:to-gray-200 transition-all duration-200">
                      <MoreVertical size={16} />
                    </button>
                    <div className="absolute top-full right-0 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-3 whitespace-nowrap">
                        <div className="text-xs font-semibold text-gray-900 mb-2">More Options</div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>• Block/Report</div>
                          <div>• Export Chat</div>
                          <div>• Shared Files</div>
                        </div>
                        <div className="text-xs text-amber-600 mt-2 font-medium">
                          Coming in v1.5
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-white"
                id="messages-container"
              >
                {messages &&
                  messages.chatMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${msg.chatUserId == messages.selfChatUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.chatUserId != messages.selfChatUser.id && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-medium bg-gradient-to-br from-blue-500 to-indigo-600 mr-2">
                          {activeChat.CompanyUser?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="max-w-[70%]">
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            msg.chatUserId === messages.selfChatUser.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                        <div className="flex items-center mt-1 space-x-1">
                          <span className="text-xs text-gray-500">{msg.createdAt}</span>
                          {msg.chatUserId === messages.selfChatUser.id &&
                            (msg.seen === true ? (
                              <CheckCircle size={12} className="text-blue-500" />
                            ) : (
                              <Clock size={12} className="text-gray-400" />
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Message Input */}
              <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      placeholder="Type a message..."
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 resize-none shadow-sm"
                      style={{ maxHeight: '120px', minHeight: '44px' }}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={1}
                    />
                    <div className="absolute right-3 bottom-3">
                      <div className="group relative">
                        <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                          <Smile size={18} />
                        </button>
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-gray-900 text-white rounded-lg px-2 py-1 text-xs whitespace-nowrap shadow-xl">
                            Emojis in v1.5
                            <div className="absolute top-full right-2 w-1.5 h-1.5 bg-gray-900 rotate-45 -mt-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <button className="p-3 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl text-gray-400 hover:from-purple-50 hover:to-purple-100 hover:border-purple-200 hover:text-purple-600 transition-all duration-200">
                      <Paperclip size={18} />
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                        File sharing in v1.5
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      message.trim()
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Send size={18} />
                  </button>
                </div>

                {/* Compact Feature Preview Panel */}
                <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-blue-900">Upcoming Features</span>
                    </div>
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                      v1.5
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="group relative">
                      <div className="flex flex-col items-center p-2 bg-white rounded-md border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                        <Image size={14} className="text-blue-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Images</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="flex flex-col items-center p-2 bg-white rounded-md border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                        <Paperclip size={14} className="text-purple-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Files</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="flex flex-col items-center p-2 bg-white rounded-md border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                        <Phone size={14} className="text-green-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Calls</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="flex flex-col items-center p-2 bg-white rounded-md border border-blue-200 hover:border-blue-300 transition-all duration-200 cursor-pointer">
                        <Video size={14} className="text-red-600 mb-1" />
                        <span className="text-xs font-medium text-gray-700">Video</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">!</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Status Bar */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-2 px-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-green-400">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      <span className="font-medium text-xs">Text Chat Active</span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mr-2"></div>
                      <span className="text-xs">Enhanced Features Loading...</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-600 text-white font-semibold px-2 py-1 rounded-full">
                      Beta v1.0
                    </span>
                    <span className="text-xs bg-amber-500 text-white font-semibold px-2 py-1 rounded-full">
                      v1.5 Soon
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Enhanced Empty State
            <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-lg w-full">
                <div className="relative mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl">
                    <MessageSquare className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">β</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3">Company Chat Platform</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect and communicate with your business partners in real-time. Current version
                  supports text messaging with advanced features coming soon.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-green-800">
                        Currently Available
                      </span>
                    </div>
                    <div className="text-sm text-green-700">Real-time text messaging</div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-2 animate-pulse"></div>
                      <span className="text-sm font-semibold text-amber-800">Coming in v1.5</span>
                    </div>
                    <div className="text-sm text-amber-700">
                      Voice calls, video chat, file sharing & more
                    </div>
                  </div>
                </div>

                <button
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                  disabled
                >
                  <Users className="mr-2 h-5 w-5" />
                  Select a conversation to start
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyChatTab;
