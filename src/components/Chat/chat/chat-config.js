import { api } from "@/config/axios.config";
import Cookies from 'js-cookie';

// Get all chats with pagination
export const getAllChats = async (page = 1) => {
  try {
    const response = await api.get(`/chat?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    if (error.response?.status === 401) {
      throw new Error("Please login to view chats");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch chats");
  }
};

// Get single chat by ID
export const getSingleChat = async (chatId) => {
  try {
    const response = await api.get(`/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single chat:", error);
    if (error.response?.status === 401) {
      throw new Error("Please login to view this chat");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch chat");
  }
};

// Get chat messages with pagination
export const getChatMessages = async (chatId, page = 1) => {
  try {
    const response = await api.get(`/chat_message?chat_id=${chatId}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    if (error.response?.status === 401) {
      throw new Error("Please login to view messages");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch messages");
  }
};

// Create new message
export const createMessage = async (messageData) => {
  try {
    // Add required time field if not present
    const messageWithTime = {
      ...messageData,
      time: messageData.time || new Date().toISOString(),
    };
    
    console.log("Sending message with data:", messageWithTime);
    const response = await api.post("/chat_message", messageWithTime);
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    if (error.response?.status === 401) {
      throw new Error("Please login to send messages");
    }
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};

// Delete message (only user's own messages)
export const deleteMessage = async (messageId) => {
  try {
    console.log("Deleting message with ID:", messageId);
    
    // Debug: Check token before making request
    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token') || localStorage.getItem('access_token') || sessionStorage.getItem('access_token') || Cookies.get('auth_token');
    console.log("Token available for delete:", !!token);
    console.log("Token length:", token?.length);
    console.log("Token preview:", token ? `${token.substring(0, 20)}...` : "None");
    
    // Try with explicit headers
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    
    console.log("Delete request config:", config);
    const response = await api.delete(`/chat_message/${messageId}`, config);
    console.log("Delete response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting message:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error headers:", error.response?.headers);
    
    if (error.response?.status === 401) {
      console.error("401 Unauthorized - Token might be invalid or missing");
      throw new Error("Please login to delete messages");
    }
    if (error.response?.status === 403) {
      throw new Error("You can only delete your own messages");
    }
    throw new Error(error.response?.data?.message || "Failed to delete message");
  }
};

// Legacy functions for backward compatibility
export const getContacts = async () => {
  return getAllChats(1);
};

export const getMessages = async (id) => {
  return getChatMessages(id, 1);
};

export const getProfile = async () => {
  try {
    const response = await api.get("/chat/profile-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    if (error.response?.status === 401) {
      throw new Error("Please login to view profile");
    }
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const sendMessage = async (msg) => {
  return createMessage(msg);
};
