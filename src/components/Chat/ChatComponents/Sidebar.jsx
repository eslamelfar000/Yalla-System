import React from 'react';
import { mockChats } from './MokData';

const Sidebar = ({ setSelectedChat }) => {
  return (
    <div className="w-1/4 bg-base-100 overflow-y-auto rounded-md shadow-lg bg-second">
      <h2 className="text-xl font-bold p-4">Chats</h2>
      {mockChats.map((chat) => (
        <div
          key={chat.id}
          className="p-4 hover:bg-base-300 cursor-pointer flex gap-3 items-center"
          onClick={() => setSelectedChat(chat)}
        >
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={chat.avatar} alt={chat.name} />
            </div>
          </div>
          <div>
            <div className="font-semibold">{chat.name}</div>
            <div className="text-sm opacity-60">{chat.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
