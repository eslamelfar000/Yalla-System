import React from "react";
// import ChatApp from '../../components/chat/ChatApp';
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Page from "../../components/chat/chat/page";

function ChatPage() {
  return (
    <>
      <Navbar />
      <div className=" p-5 bg-second h-[calc(100vh-9.5rem)] overflow-hidden">
        <Page />
      </div>
      <Footer custom={true} />
    </>
  );
}

export default ChatPage;
