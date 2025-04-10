import { useState } from "react";

const ChatWindow = ({ selectedChat }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "them",
      name: "Anakin",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      time: "12:45",
      text: "You were the Chosen One!",
    },
    {
      id: 2,
      sender: "me",
      name: "Me",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
      time: "12:46",
      text: "I hate you!",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "me",
        name: "Me",
        avatar:
          "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        time: new Date().toLocaleTimeString().slice(0, 5),
        text: newMessage,
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col justify-between w-1/2 p-4 rounded-md shadow-lg bg-second">
      <div className="overflow-y-auto flex-1 space-y-4">
        {messages.map((msg) => (
          <div
            className={`chat ${
              msg.sender === "me" ? "chat-end" : "chat-start"
            }`}
            key={msg.id}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={msg.avatar} />
              </div>
            </div>
            <div className="chat-header">
              {msg.name}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">
              {msg.sender === "me" ? "Seen" : "Delivered"}
            </div>
          </div>
        ))}
      </div>
      <div className="pt-4 flex gap-2">
        <input
          className="input input-bordered w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
