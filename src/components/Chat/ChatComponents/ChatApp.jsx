import React, { useState } from "react";
import Sidebar from "./ChatComponents/Sidebar";
import ChatWindow from "./ChatComponents/ChatWindow";
import ChatDetails from "./ChatComponents/ChatDetails";
import { mockChats } from "./ChatComponents/MokData";
const ChatApp = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0] || null);

  return (
    <div className="flex gap-5 min-h-[calc(100vh-9.5rem)] w-screen p-5">
      <Sidebar setSelectedChat={setSelectedChat} />
      <ChatWindow selectedChat={selectedChat} />
      <ChatDetails selectedChat={selectedChat} />
    </div>
  );
};

export default ChatApp;
