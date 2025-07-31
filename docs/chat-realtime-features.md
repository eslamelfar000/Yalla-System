# Real-Time Chat Features

## Overview

The chat system now includes real-time-like functionality that automatically refreshes chat data every 10 seconds to provide a seamless messaging experience.

## Features Implemented

### 1. Automatic Data Refresh

- **Chat List**: Automatically refreshes every 10 seconds to show new conversations and updated unread counts
- **Messages**: Automatically refreshes every 10 seconds to show new messages in real-time
- **Background Updates**: Continues refreshing even when the browser tab is not active

### 2. Read/Unread Message Handling

- **Unread Count**: Calculated based on the `read_at` field in messages
- **Auto Mark as Read**: Messages are automatically marked as read when:
  - A chat is opened
  - Messages are loaded and the user is viewing the chat
- **Visual Indicators**:
  - Blue badge shows unread count
  - Read status icons show message delivery status

### 3. Read Status Indicators

#### Message Read Status Icons:

- **Single Check (✓) - Gray**: Message sent but not seen
- **Double Check (✓✓) - Blue**: Message seen by recipient
- **No Check**: Messages from other users (no status shown)

#### Chat List Read Status:

- **Unread Badge**: Blue circle with unread count
- **Read Status**: Shows the read status of the last message from current user
- **No Status**: For messages from other users or when no messages exist

### 4. Real-Time Indicators

- **Status Indicators**: Small animated dots show that real-time updates are active
- **Chat List**: Green pulsing dot with "Real-time updates enabled" text
- **Messages Area**: Blue pulsing dot with "Messages update automatically" text

## Technical Implementation

### Hooks Used

- `useRealTimeChat(chatId)`: Main hook for real-time chat functionality
- `useChatData()`: Hook for chat list with auto-refresh
- `markMessagesAsRead(chatId)`: Function to mark messages as read

### Configuration

- **Refresh Interval**: 10 seconds
- **Stale Time**: 5 seconds (data considered stale after 5 seconds)
- **Background Refresh**: Enabled

### API Endpoints

- `GET /chat` - Get chat list with unread counts
- `GET /chat_message?chat_id={id}` - Get messages for a chat
- `POST /chat/mark-as-read` - Mark messages as read in a chat

## Message Structure

Messages include a `read_at` field that determines read status:

- `read_at: null` - Message is unread
- `read_at: "2024-01-01T12:00:00Z"` - Message was read at this timestamp

## Read Status Logic

### For Own Messages:

1. **Sent (Gray ✓)**: Message sent but `read_at` is null
2. **Seen (Blue ✓✓)**: Message sent and `read_at` has a timestamp

### For Other Users' Messages:

- No read status indicators shown (standard messaging behavior)

## User Experience

1. **Seamless Updates**: Users see new messages and chat updates without manual refresh
2. **Visual Feedback**: Status indicators show that real-time updates are active
3. **Automatic Read Status**: Messages are marked as read when viewed
4. **Unread Counts**: Accurate unread message counts in chat list
5. **Read Status**: Clear visual indicators for message delivery status

## Performance Considerations

- Data is cached for 5 seconds to reduce unnecessary API calls
- Background refresh continues even when tab is not active
- Optimistic updates for better perceived performance
