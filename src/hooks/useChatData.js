import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllChats,
  getSingleChat,
  getChatMessages,
  createMessage,
  deleteMessage,
} from "../components/Chat/chat/chat-config";

export const useChats = (page = 1) => {
  return useQuery({
    queryKey: ["chats", page],
    queryFn: () => getAllChats(page),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });
};

export const useSingleChat = (chatId, enabled = true) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getSingleChat(chatId),
    enabled: enabled && !!chatId,
    staleTime: 30000,
  });
};

export const useChatMessages = (chatId, page = 1, enabled = true) => {
  return useQuery({
    queryKey: ["chatMessages", chatId, page],
    queryFn: () => getChatMessages(chatId, page),
    enabled: enabled && !!chatId,
    staleTime: 10000, // 10 seconds for messages
    refetchOnWindowFocus: false,
  });
};

export const useCreateMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data, variables) => {
      // Invalidate and refetch messages for the specific chat
      queryClient.invalidateQueries({
        queryKey: ["chatMessages", variables.chat_id],
      });
      
      // Also invalidate chats list to update last message
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
    onError: (error) => {
      console.error("Error creating message:", error);
    },
  });
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data, messageId) => {
      // Invalidate all chat messages queries to refresh the UI
      queryClient.invalidateQueries({
        queryKey: ["chatMessages"],
      });
    },
    onError: (error) => {
      console.error("Error deleting message:", error);
    },
  });
}; 