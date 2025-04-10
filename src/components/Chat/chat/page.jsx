"use client";
import React, { use, useCallback, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import ContactList from "./contact-list";
import { useState } from "react";
import Blank from "./blank";
import MessageHeader from "./message-header";
import MessageFooter from "./message-footer";

import Messages from "./messages";
import {
  getContacts,
  getMessages,
  getProfile,
  sendMessage,
  deleteMessage,
} from "./chat-config";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MyProfileHeader from "./my-profile-header";
import EmptyMessage from "./empty-message";
import Loader from "./loader";
import { isObjectNotEmpty } from "@/lib/utils";
import SearchMessages from "./contact-info/search-messages";
import PinnedMessages from "./pin-messages";
import ForwardMessage from "./forward-message";
import ContactInfo from "./contact-info";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { profileUser, contacts, chats } from "./data";
const ChatPage = () => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [showContactSidebar, setShowContactSidebar] = useState(false);

  const [showInfo, setShowInfo] = useState(false);
  const queryClient = useQueryClient();
  // Memoize getMessages using useCallback
  const getMessagesCallback = useCallback((chatId) => getMessages(chatId), []);
  // reply state
  const [replay, setReply] = useState(false);
  const [replayData, setReplyData] = useState({});

  // search state
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const [pinnedMessages, setPinnedMessages] = useState([]);
  // Forward State
  const [isForward, setIsForward] = useState(false);


  const [isContacstLoading, setIsContactsLoading] = useState(false);
  
  const messageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries("messages");
    },
  });

  const onDelete = (selectedChatId, index) => {
    const obj = { selectedChatId, index };
    deleteMutation.mutate(obj);

    // Remove the deleted message from pinnedMessages if it exists
    const updatedPinnedMessages = pinnedMessages.filter(
      (msg) => msg.selectedChatId !== selectedChatId && msg.index !== index
    );

    setPinnedMessages(updatedPinnedMessages);
  };

  const openChat = (chatId) => {
    setSelectedChatId(chatId);
    setReply(false);
    if (showContactSidebar) {
      setShowContactSidebar(false);
    }
  };

  
  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const [newMessages, setNewMessages] = useState([]);
  const handleSendMessage = (message) => {
    if (!selectedChatId || !message) return;

    const newMessage = {
      message: message,
      contact: { id: selectedChatId },
      replayMetadata: isObjectNotEmpty(replayData),
    };
    // messageMutation.mutate(newMessage);
    // console.log(message, "ami msg");
  };
  const chatHeightRef = useRef(null);

  // replay message
  const handleReply = (data, contact) => {
    const newObj = {
      message: data,
      contact,
    };
    setReply(true);
    setReplyData(newObj);
  };

  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [handleSendMessage, contacts]);
  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [pinnedMessages]);

  const handleSetIsOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };
  
  // handle pin note
  const handlePinMessage = (note) => {
    const updatedPinnedMessages = [...pinnedMessages];

    const existingIndex = updatedPinnedMessages.findIndex(
      (msg) => msg.note === note.note
    );

    if (existingIndex !== -1) {
      updatedPinnedMessages.splice(existingIndex, 1);
      //setIsPinned(false);
    } else {
      updatedPinnedMessages.push(note); // Add the message
      // setIsPinned(true);
    }

    setPinnedMessages(updatedPinnedMessages);
  };

  const handleUnpinMessage = (pinnedMessage) => {
    // Create a copy of the current pinned messages array
    const updatedPinnedMessages = [...pinnedMessages];

    // Find the index of the message to unpin in the updatedPinnedMessages array
    const index = updatedPinnedMessages.findIndex(
      (msg) =>
        msg.note === pinnedMessage.note && msg.avatar === pinnedMessage.avatar
    );

    if (index !== -1) {
      // If the message is found in the array, remove it (unpin)
      updatedPinnedMessages.splice(index, 1);
      // Update the state with the updated pinned messages array
      setPinnedMessages(updatedPinnedMessages);
    }
  };

  const currentChat = chats.find((chat) => chat.userId === selectedChatId);


  // Forward handle
  const handleForward = () => {
    setIsForward(!isForward);
  };
  const isLg = useMediaQuery("(max-width: 1024px)");
  return (
    <div className="flex gap-5 app-height h-full  relative rtl:space-x-reverse">
      {isLg && showContactSidebar && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
          onClick={() => setShowContactSidebar(false)}
        ></div>
      )}
      {isLg && showInfo && (
        <div
          className=" bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-40 rounded-md"
          onClick={() => setShowInfo(false)}
        ></div>
      )}
      <div
        className={cn("transition-all duration-150 flex-none  ", {
          "absolute h-full top-0 md:w-[260px] w-[200px] z-[999]": isLg,
          "flex-none min-w-[260px]": !isLg,
          "left-0": isLg && showContactSidebar,
          "-left-full": isLg && !showContactSidebar,
        })}
      >
        <Card className="h-full pb-0">
          <CardHeader className="border-none pb-0 mb-0">
            <MyProfileHeader profile={profileUser} />
          </CardHeader>
          <CardContent className="pt-0 px-0   lg:h-[calc(100%-170px)] h-[calc(100%-70px)]   ">
            <ScrollArea className="h-full">
              {isContacstLoading ? (
                <Loader />
              ) : (
                contacts?.map((contact) => (
                  <ContactList
                    key={contact.id}
                    contact={contact}
                    selectedChatId={selectedChatId}
                    openChat={openChat}
                  />
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* chat sidebar  end*/}
      {/* chat messages start */}
      {selectedChatId ? (
        <div className="flex-1 ">
          <div className=" flex space-x-5 h-full rtl:space-x-reverse">
            <div className="flex-1">
              <Card className="h-full flex flex-col ">
                <CardHeader className="flex-none mb-0">
                  <MessageHeader
                    showInfo={showInfo}
                    handleShowInfo={handleShowInfo}
                    profile={profileUser}
                    mblChatHandler={() =>
                      setShowContactSidebar(!showContactSidebar)
                    }
                  />
                </CardHeader>
                {isOpenSearch && (
                  <SearchMessages
                    handleSetIsOpenSearch={handleSetIsOpenSearch}
                  />
                )}

                <CardContent className=" !p-0 relative flex-1 overflow-y-auto overflow-x-hidden">
                  <div
                    className="h-full py-4 overflow-y-auto no-scrollbar"
                    ref={chatHeightRef}
                  >
                    {isContacstLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {!currentChat ? (
                          <EmptyMessage />
                        ) : currentChat.chat.length === 0 ? (
                          <EmptyMessage />
                        ) : (
                          currentChat?.chat.map((chatMessage, index) => {
                            const contactUser =
                              chatMessage.senderId === profileUser.id
                                ? contacts.find(
                                    (c) => c.id === currentChat.userId
                                  )
                                : contacts.find(
                                    (c) => c.id === chatMessage.senderId
                                  );

                            return (
                              <Messages
                                key={`message-list-${index}`}
                                message={chatMessage}
                                contact={contactUser}
                                profile={profileUser}
                                onDelete={onDelete}
                                index={index}
                                selectedChatId={selectedChatId}
                                handleReply={handleReply}
                                replayData={replayData}
                                handleForward={handleForward}
                                handlePinMessage={handlePinMessage}
                                pinnedMessages={pinnedMessages}
                              />
                            );
                          })
                        )}
                      </>
                    )}
                    <PinnedMessages
                      pinnedMessages={pinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-none flex-col px-0 py-4 border-t border-border">
                  <MessageFooter
                    handleSendMessage={handleSendMessage}
                    replay={replay}
                    setReply={setReply}
                    replayData={replayData}
                  />
                </CardFooter>
              </Card>
            </div>

            {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={handleSetIsOpenSearch}
                handleShowInfo={handleShowInfo}
                contact={contacts?.find(
                  (contact) => contact.id === selectedChatId
                )}
              />
            )}
          </div>
        </div>
      ) : (
        <Blank mblChatHandler={() => setShowContactSidebar(true)} />
      )}
      <ForwardMessage
        open={isForward}
        contact={"s"}
        setIsOpen={setIsForward}
        contacts={contacts}
      />
    </div>
  );
};

export default ChatPage;
