# Enhanced Chat Functionality

This document describes the enhanced chat functionality that supports link detection and file uploads.

## Features

### 1. Link Detection and Rendering

- Automatically detects URLs in text messages
- Converts URLs to clickable links
- Links open in new tabs for security
- Supports both HTTP and HTTPS URLs

### 2. File Upload Support

- Multiple file upload (up to 5 files)
- File type validation
- File size limits (10MB per file)
- Supported file types:
  - Images: JPG, PNG, GIF, WebP, SVG, BMP
  - Videos: MP4, AVI, MOV, WMV, FLV, WebM
  - Audio: MP3, WAV, OGG, AAC, FLAC
  - Documents: PDF, DOC, DOCX, TXT, RTF

### 3. File Display

- Images: Direct display with hover effects
- Videos: Embedded video player with controls
- Audio: Embedded audio player with controls
- Documents: File attachment with download link

## Implementation Details

### File Structure

```
src/
├── components/Chat/
│   ├── chat/
│   │   ├── message-footer.jsx    # Enhanced with file upload
│   │   ├── messages.jsx          # Enhanced with link/file display
│   │   └── page.jsx              # Updated message handling
│   └── ChatDemo.jsx              # Demo component
├── lib/
│   ├── utils.js                  # Link detection utilities
│   └── file-upload.js            # File upload service
└── config/
    └── axios.config.js           # API configuration
```

### Key Components

#### 1. Message Footer (`message-footer.jsx`)

- File selection with drag & drop
- File preview for images
- File validation
- Upload progress indication
- Multiple file support

#### 2. Messages (`messages.jsx`)

- Link detection and rendering
- File type-specific display
- Image preview with zoom
- Video/audio player integration
- Document download links

#### 3. File Upload Service (`file-upload.js`)

- File validation
- Upload handling
- Mock upload for development
- Error handling

### Usage Examples

#### Sending a Text Message with Links

```javascript
const messageData = {
  text: "Check out this website: https://example.com",
  files: [],
};
handleSendMessage(messageData);
```

#### Sending a Message with Files

```javascript
const messageData = {
  text: "Here are the documents",
  files: [
    {
      id: 1,
      name: "document.pdf",
      size: 1024000,
      url: "https://example.com/files/document.pdf",
      type: "application/pdf",
    },
  ],
};
handleSendMessage(messageData);
```

#### File Upload Process

1. User selects files using the attachment button
2. Files are validated for type and size
3. Files are uploaded to server (or mocked in development)
4. Uploaded file URLs are included in message
5. Message is sent with file metadata

### API Integration

The chat system expects the following message format:

```javascript
{
  chat_id: "chat_id",
  message: "text content",
  files: [
    {
      id: "file_id",
      name: "filename.ext",
      size: 1024000,
      url: "https://server.com/files/file_id",
      type: "application/pdf"
    }
  ],
  time: "2024-01-01T00:00:00.000Z"
}
```

### Styling

The chat uses Tailwind CSS classes for styling:

- File previews: `max-h-32 max-w-full object-cover`
- Links: `text-blue-600 hover:text-blue-800 underline`
- File attachments: `bg-gray-50 hover:bg-gray-100`
- Upload progress: `animate-spin`

### Error Handling

- File size validation
- File type validation
- Upload error handling
- Network error recovery
- User-friendly error messages

### Security Considerations

- File type validation on client and server
- File size limits
- Secure file upload endpoints
- XSS prevention for link rendering
- Download links with proper headers

## Future Enhancements

1. **Real-time file upload progress**
2. **Drag and drop file upload**
3. **File compression for images**
4. **File preview generation**
5. **Voice messages**
6. **File sharing permissions**
7. **Message reactions**
8. **File search functionality**

## Testing

Use the `ChatDemo` component to test the functionality:

```javascript
import ChatDemo from "./components/Chat/ChatDemo";

// In your app
<ChatDemo />;
```

The demo includes:

- Sample messages with links
- Sample file attachments
- Interactive buttons to add different message types
- Visual demonstration of all features
