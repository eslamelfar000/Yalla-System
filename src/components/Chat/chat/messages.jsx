import React, { useState, useEffect } from "react";
import { formatTime } from "../../../lib/utils";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  fixImageUrl,
  getAvatarInitials,
  safeToString,
} from "../../../lib/image-utils";

// Utility function to safely get message content
const getSafeMessageContent = (message) => {
  if (!message) return "";

  // If message is an object, try to extract the message property
  if (typeof message === "object") {
    if (message.message) return safeToString(message.message);
    if (message.text) return safeToString(message.text);
    if (message.content) return safeToString(message.content);
    return safeToString(message);
  }

  return safeToString(message);
};

const Messages = ({ message, onDelete }) => {
  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  // Safety check: ensure message is a valid object
  if (!message || typeof message !== "object") {
    console.warn("Invalid message object:", message);
    return null;
  }

  const {
    id,
    message: chatMessage,
    user_id,
    created_at,
    updated_at,
    time,
    user,
  } = message;

  // Debug: Log the IDs to see what's happening
  console.log("Message user ID:", user?.id, "Type:", typeof user?.id);
  console.log("Current user ID:", user_data?.id, "Type:", typeof user_data?.id);
  console.log("Message user_id:", user_id, "Type:", typeof user_id);

  // Determine if message is from current user based on user.id inside message
  const isOwnMessage = String(user?.id) === String(user_data?.id);

  console.log("Is own message:", isOwnMessage);

  const messageTime = time || created_at || updated_at;
  const senderName = safeToString(user?.name || "Unknown");
  const senderAvatar = fixImageUrl(user?.avatar || user?.image);

  // Get safe message content
  const safeMessageContent = getSafeMessageContent(chatMessage);

  const handleDeleteClick = (messageId) => {
    console.log("Delete clicked for message ID:", messageId);
    console.log("Message ID type:", typeof messageId);
    setMessageToDelete(messageId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      console.log("Confirming delete for message ID:", messageToDelete);
      onDelete(messageToDelete);
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setMessageToDelete(null);
  };

  return (
    <>
      <div className="block md:px-6 px-0">
        {isOwnMessage ? (
          // OWN MESSAGE - Right side with main color
          <>
            <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse mb-4">
              <div className=" flex flex-col items-end gap-1">
                <div className="flex items-center gap-1">
                  <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="w-7 h-7 rounded-full bg-main/20 flex items-center justify-center">
                          <Icon
                            icon="bi:three-dots-vertical"
                            className="text-lg"
                          />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-20 p-0"
                        align="center"
                        side="top"
                      >
                        <DropdownMenuItem onClick={() => handleDeleteClick(id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="whitespace-pre-wrap break-all">
                    <div className="bg-main text-white text-sm py-2 px-3 rounded-lg">
                      {safeMessageContent}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-end text-default-500">
                  {formatTime(messageTime)}
                </span>
              </div>
              <div className="flex-none self-end -translate-y-5">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={senderAvatar} />
                  <AvatarFallback className="text-xs">
                    {getAvatarInitials(senderName)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </>
        ) : (
          // OTHER MESSAGE - Left side with gray color and actions
          <div className="flex space-x-2 items-start group rtl:space-x-reverse mb-4">
            <div className="flex-none self-end -translate-y-5">
              <Avatar className="h-10 w-10">
                <AvatarImage src={senderAvatar} />
                <AvatarFallback className="text-xs">
                  {getAvatarInitials(senderName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="whitespace-pre-wrap break-all relative z-[1]">
                  <div className="bg-gray-100 text-gray-900 text-sm py-2 px-3 rounded-lg flex-1">
                    {safeMessageContent}
                  </div>
                </div>
              </div>
              <span className="text-xs text-default-500">
                {formatTime(messageTime)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white z-100">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelDelete}
              className="text-white bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Messages;
