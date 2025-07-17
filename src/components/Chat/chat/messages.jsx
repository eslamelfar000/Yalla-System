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
import {
  formatMessageWithLinks,
  getFileType,
  formatFileSize,
} from "../../../lib/utils";

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

// Component to render different types of message content
const MessageContent = ({ message, files }) => {
  const hasText = message && message.trim().length > 0;
  const hasFiles = files && files.length > 0;

  return (
    <div className="space-y-2">
      {/* Text content with link detection */}
      {hasText && (
        <div className="whitespace-pre-wrap break-words">
          {formatMessageWithLinks(message).map((part) => {
            if (part.type === "link") {
              return (
                <a
                  key={part.key}
                  href={part.content}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-700 hover:text-blue-800 underline break-all"
                >
                  {part.content}
                </a>
              );
            }
            return part.content;
          })}
        </div>
      )}

      {/* Files/Attachments */}
      {hasFiles && (
        <div className="space-y-2">
          {files.map((file, index) => {
            const fileType = getFileType(file.name || file.filename);
            const fileUrl = file.url || file.path || file.src;
            const fileName = file.name || file.filename || "Unknown file";
            const fileSize = file.size ? formatFileSize(file.size) : "";

            return (
              <div key={index} className="border rounded-lg overflow-hidden">
                {fileType === "image" && fileUrl ? (
                  // Image display
                  <div className="relative group">
                    <img
                      src={fileUrl}
                      alt={fileName}
                      className="max-w-full max-h-64 object-cover cursor-pointer"
                      onClick={() => window.open(fileUrl, "_blank")}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <Icon
                        icon="tabler:zoom-in"
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-2xl"
                      />
                    </div>
                  </div>
                ) : fileType === "video" && fileUrl ? (
                  // Video display
                  <video controls className="max-w-full max-h-64" src={fileUrl}>
                    Your browser does not support the video tag.
                  </video>
                ) : fileType === "audio" && fileUrl ? (
                  // Audio display
                  <audio controls className="w-full" src={fileUrl}>
                    Your browser does not support the audio tag.
                  </audio>
                ) : (
                  // File attachment display
                  <div className="p-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Icon
                          icon={
                            fileType === "document"
                              ? "tabler:file-text"
                              : fileType === "image"
                              ? "tabler:photo"
                              : fileType === "video"
                              ? "tabler:video"
                              : fileType === "audio"
                              ? "tabler:music"
                              : "tabler:file"
                          }
                          className="text-2xl text-gray-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {fileName}
                        </p>
                        {fileSize && (
                          <p className="text-xs text-gray-500">{fileSize}</p>
                        )}
                      </div>
                      {fileUrl && (
                        <a
                          href={fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0"
                        >
                          <Icon
                            icon="tabler:download"
                            className="text-lg text-blue-600 hover:text-blue-800"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
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
    files, // New field for file attachments
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
              <div className="flex flex-col items-end gap-1">
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
                  <div className="max-w-xs md:max-w-md lg:max-w-lg">
                    <div className="bg-main text-white text-sm py-2 px-3 rounded-lg">
                      <MessageContent
                        message={safeMessageContent}
                        files={files}
                      />
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
                <div className="max-w-xs md:max-w-md lg:max-w-lg">
                  <div className="bg-gray-100 text-gray-900 text-sm py-2 px-3 rounded-lg">
                    <MessageContent
                      message={safeMessageContent}
                      files={files}
                    />
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
