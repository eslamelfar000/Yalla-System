# API Endpoints Documentation

## Profile Management Endpoints

### 1. Get User Profile with Sessions

**Endpoint:** `GET /get-profile-api`

**Response:**

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "country": "EG",
    "language": "arabic",
    "image": "https://example.com/avatar.jpg",
    "role": "student",
    "join_at": "2024-01-15T10:30:00Z",
    "assigned_teacher": {
      "name": "Jane Teacher",
      "email": "jane@example.com"
    },
    "current_sessions": [
      {
        "id": 1,
        "title": "Introduction to React",
        "status": "in progress",
        "percentage": 60,
        "projectImage": "https://example.com/session1.jpg",
        "assign": [
          {
            "image": "https://example.com/teacher1.jpg",
            "label": "John Teacher",
            "value": "john.teacher"
          }
        ],
        "isFavourite": true
      }
    ],
    "compelete_sessions": [
      {
        "id": 2,
        "title": "JavaScript Basics",
        "status": "completed",
        "percentage": 100,
        "projectImage": "https://example.com/session2.jpg",
        "assign": [
          {
            "image": "https://example.com/teacher2.jpg",
            "label": "Jane Teacher",
            "value": "jane.teacher"
          }
        ],
        "isFavourite": false
      }
    ]
  }
}
```

### 2. Update Profile

**Endpoint:** `POST /update-profile-api`

**Request Body:**

```json
{
  "name": "John Doe Updated",
  "phone": "1234567890",
  "email": "john.updated@example.com",
  "language": "english",
  "country": "US",
  "image": "base64_string_or_file_object"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Profile updated successfully!",
  "data": {
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "phone": "1234567890",
    "country": "US",
    "language": "english",
    "image": "https://example.com/new-avatar.jpg"
  }
}
```

### 3. Change Password

**Endpoint:** `POST /change-password-api`

**Request Body:**

```json
{
  "current_password": "oldpassword123",
  "new_password": "newPassword123!",
  "new_password_confirmation": "newPassword123!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Password changed successfully!"
}
```

## Session Data Structure

Each session object should contain:

- `id`: Unique identifier
- `title`: Session name/title
- `status`: One of ["in progress", "completed", "review", "cancelled"]
- `percentage`: Progress percentage (0-100)
- `projectImage`: URL to session image
- `assign`: Array of assigned teachers/mentors
- `isFavourite`: Boolean indicating if session is marked as favorite

## Error Responses

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```
