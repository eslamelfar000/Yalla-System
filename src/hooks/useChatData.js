import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from '../config/axios.config';
import { getAllChats, getChatMessages, createMessage, deleteMessage, getSingleChat, markMessagesAsRead } from '../components/Chat/chat/chat-config';

// Standalone hook for fetching chat messages with auto-refresh
export const useChatMessages = (chatId) => {
  return useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: async () => {
      const response = await getChatMessages(chatId, 1);
      return response;
    },
    enabled: !!chatId,
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
    staleTime: 5000, // Consider data stale after 5 seconds
  });
};

// Main chat data hook that combines all functionality
export const useChatData = () => {
  const queryClient = useQueryClient();

  // Fetch chat conversations with auto-refresh
  const {
    data: conversations,
    isLoading: conversationsLoading,
    error: conversationsError,
    refetch: refetchConversations
  } = useQuery({
    queryKey: ['chat-conversations'],
    queryFn: async () => {
      const response = await getAllChats(1);
      return response;
    },
    enabled: true,
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
    staleTime: 5000, // Consider data stale after 5 seconds
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async ({ chatId, message, type = 'text', attachments = [] }) => {
      const messageData = {
        chat_id: chatId,
        message,
        time: new Date().toISOString(),
        attachments: attachments, // Include attachments
      };
      const response = await createMessage(messageData);
      return response;
    },
    onSuccess: (data, variables) => {
      // Invalidate messages for this chat
      queryClient.invalidateQueries(['chat-messages', variables.chatId]);
      // Invalidate conversations to update last message
      queryClient.invalidateQueries(['chat-conversations']);
    },
  });

  // Mark messages as read
  const markAsReadMutation = useMutation({
    mutationFn: async (chatId) => {
      const response = await markMessagesAsRead(chatId);
      return response;
    },
    onSuccess: (data, chatId) => {
      // Invalidate conversations to update unread count
      queryClient.invalidateQueries(['chat-conversations']);
      // Also invalidate messages to update read status
      queryClient.invalidateQueries(['chat-messages', chatId]);
    },
  });

  // Create new chat
  const createChatMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await api.post('/chat/create', {
        user_id: userId
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate conversations
      queryClient.invalidateQueries(['chat-conversations']);
    },
  });

  // Delete message
  const deleteMessageMutation = useMutation({
    mutationFn: async ({ chatId, messageId }) => {
      const response = await deleteMessage(messageId);
      return response;
    },
    onSuccess: (data, variables) => {
      // Invalidate messages for this chat
      queryClient.invalidateQueries(['chat-messages', variables.chatId]);
      // Invalidate conversations to update last message
      queryClient.invalidateQueries(['chat-conversations']);
    },
  });

  // Update message
  const updateMessageMutation = useMutation({
    mutationFn: async ({ messageId, message }) => {
      const response = await api.put(`/chat_message/${messageId}`, {
        message
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidate messages for this chat
      queryClient.invalidateQueries(['chat-messages', variables.chatId]);
      // Invalidate conversations to update last message
      queryClient.invalidateQueries(['chat-conversations']);
    },
  });

  return {
    conversations,
    conversationsLoading,
    conversationsError,
    refetchConversations,
    useChatMessages,
    sendMessageMutation,
    markAsReadMutation,
    createChatMutation,
    deleteMessageMutation,
    updateMessageMutation,
  };
};

// Real-time chat hook with enhanced functionality
export const useRealTimeChat = (chatId) => {
  const queryClient = useQueryClient();
  const currentUser = JSON.parse(localStorage.getItem("user_data") || "null");

  // Fetch messages with real-time updates
  const {
    data: messagesData,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages
  } = useQuery({
    queryKey: ['chat-messages', chatId],
    queryFn: async () => {
      const response = await getChatMessages(chatId, 1);
      return response;
    },
    enabled: !!chatId,
    refetchInterval: 10000, // Refetch every 10 seconds
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
    staleTime: 5000, // Consider data stale after 5 seconds
  });

  // Mark messages as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (chatId) => {
      const response = await markMessagesAsRead(chatId);
      return response;
    },
    onSuccess: (data, chatId) => {
      // Invalidate conversations to update unread count
      queryClient.invalidateQueries(['chat-conversations']);
      // Also invalidate messages to update read status
      queryClient.invalidateQueries(['chat-messages', chatId]);
    },
  });

  // Auto-mark messages as read when they are loaded and user is viewing
  const autoMarkAsRead = () => {
    if (chatId && messagesData?.data && messagesData.data.length > 0) {
      // Check if there are any unread messages (read_at is null)
      const hasUnreadMessages = messagesData.data.some(message => 
        message.read_at === null && 
        String(message.user?.id) !== String(currentUser?.id)
      );
      
      if (hasUnreadMessages) {
        markAsReadMutation.mutate(chatId);
      }
    }
  };

  // Get unread count for this chat
  const getUnreadCount = () => {
    if (!messagesData?.data) return 0;
    
    return messagesData.data.filter(message => 
      message.read_at === null && 
      String(message.user?.id) !== String(currentUser?.id)
    ).length;
  };

  return {
    messagesData,
    messagesLoading,
    messagesError,
    refetchMessages,
    markAsReadMutation,
    autoMarkAsRead,
    getUnreadCount,
  };
};

// Backward compatibility exports
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