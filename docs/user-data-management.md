# User Data Management System

## Overview

This system ensures that user data is always kept up-to-date in localStorage and synchronized across the entire application. It provides real-time updates, automatic fallbacks, and cross-tab synchronization.

## Key Features

### 🔄 **Real-time Synchronization**

- Automatic localStorage updates when user data changes
- Cross-tab synchronization using storage events
- Background refetching every 10 minutes
- Immediate updates from API responses

### 🛡️ **Robust Fallback System**

- localStorage as primary data source
- API data as authoritative source
- Graceful degradation when API is unavailable
- Automatic recovery when connection is restored

### 🎯 **Global State Management**

- React Context for app-wide user data access
- Custom hooks for easy integration
- Automatic cache invalidation
- Optimistic updates

## Architecture

### 1. **UserDataContext** (`src/context/UserDataContext.jsx`)

- Global context provider for user data
- Manages localStorage synchronization
- Handles cross-tab communication
- Provides update functions

### 2. **Enhanced useUserData Hook** (`src/hooks/useUserData.js`)

- Fetches user data from API
- Automatically updates localStorage
- Provides manual update functions
- Handles error scenarios

### 3. **Utility Functions** (`src/lib/user-utils.js`)

- `syncUserData()` - Syncs across all storage mechanisms
- `updateUserField()` - Updates specific user fields
- `clearUserData()` - Clears all user data
- `handleUserDataUpdate()` - Handles API response updates

## Usage Examples

### Basic Usage

```javascript
import { useCurrentUserData } from "@/hooks/useCurrentUserData";

function MyComponent() {
  const { userData, isLoading, isAuthenticated } = useCurrentUserData();

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login</div>;

  return <div>Welcome, {userData.name}!</div>;
}
```

### Updating User Data

```javascript
import { useUserDataContext } from "@/context/UserDataContext";

function ProfileComponent() {
  const { updateUserData, updateUserField } = useUserDataContext();

  const handleUpdateProfile = (newData) => {
    updateUserData(newData);
  };

  const handleUpdateName = (newName) => {
    updateUserField("name", newName);
  };

  return (
    <button onClick={() => handleUpdateName("John Doe")}>Update Name</button>
  );
}
```

### API Response Handling

```javascript
import { handleUserDataUpdate } from "@/lib/user-utils";

const { mutate } = useMutate({
  method: "POST",
  endpoint: "update-profile",
  onSuccess: (data) => {
    // Automatically updates localStorage
    handleUserDataUpdate("update-profile", data);
  },
});
```

## Storage Strategy

### Primary Storage: localStorage

- Key: `yall_user_data`
- Format: JSON string
- Updates: Real-time from API responses

### Backup Storage: sessionStorage

- Key: `yall_user_data`
- Format: JSON string
- Purpose: Cross-tab synchronization

### Cache: React Query

- Query Key: `["user-data"]`
- Stale Time: 5 minutes
- Refetch Interval: 10 minutes

## Automatic Updates

### 1. **API Responses**

- All user-related API calls automatically update localStorage
- Supported endpoints: `user-data`, `login-api`, `register-api`, etc.

### 2. **Background Refetching**

- User data is refetched every 10 minutes
- Continues even when tab is in background
- Ensures data stays fresh

### 3. **Cross-tab Sync**

- Storage events notify other tabs of changes
- Automatic state updates across all tabs
- No manual refresh required

## Error Handling

### API Failures

- Falls back to localStorage data
- Continues to work offline
- Retries automatically when connection restored

### localStorage Errors

- Graceful error handling
- Automatic cleanup of corrupted data
- Fallback to sessionStorage

## Performance Optimizations

### 1. **Debounced Updates**

- Multiple rapid updates are batched
- Reduces localStorage writes
- Improves performance

### 2. **Selective Updates**

- Only updates changed fields
- Reduces unnecessary re-renders
- Optimizes React Query cache

### 3. **Background Processing**

- Updates happen in background
- No blocking of UI
- Smooth user experience

## Migration Guide

### From Direct localStorage Access

```javascript
// Old way
const userData = JSON.parse(localStorage.getItem("yall_user_data"));

// New way
const { userData } = useCurrentUserData();
```

### From Manual Updates

```javascript
// Old way
localStorage.setItem("yall_user_data", JSON.stringify(newData));

// New way
const { updateUserData } = useUserDataContext();
updateUserData(newData);
```

## Best Practices

### 1. **Always Use Hooks**

- Use `useCurrentUserData()` instead of direct localStorage access
- Provides automatic updates and error handling
- Ensures consistency across the app

### 2. **Update Through Context**

- Use `updateUserData()` for bulk updates
- Use `updateUserField()` for single field updates
- Ensures proper cache invalidation

### 3. **Handle Loading States**

- Always check `isLoading` before rendering
- Provide fallback UI for loading states
- Handle error states gracefully

### 4. **API Integration**

- Use `handleUserDataUpdate()` in API success callbacks
- Automatically updates localStorage
- Maintains data consistency

## Troubleshooting

### User Data Not Updating

1. Check if component is wrapped in `UserDataProvider`
2. Verify API response format matches expected structure
3. Check browser console for errors
4. Ensure localStorage is not disabled

### Cross-tab Sync Not Working

1. Verify storage events are firing
2. Check if localStorage is accessible
3. Ensure same origin policy compliance
4. Test in different browsers

### Performance Issues

1. Check for excessive re-renders
2. Verify debouncing is working
3. Monitor localStorage write frequency
4. Check React Query cache size

## Future Enhancements

### 1. **Offline Support**

- Service Worker integration
- Offline data persistence
- Sync when online

### 2. **Data Compression**

- Compress large user objects
- Reduce localStorage usage
- Improve performance

### 3. **Advanced Caching**

- LRU cache implementation
- Intelligent cache invalidation
- Memory usage optimization
