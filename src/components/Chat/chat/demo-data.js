// Demo data for testing chat functionality
export const demoChats = {
  data: [
    {
      id: 1,
      name: "John Doe",
      full_name: "John Doe",
      avatar: "/images/avatar/avatar-1.jpg",
      status: "online",
      last_message: {
        message: "Hey, how are you doing?",
        created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      unread_count: 2,
      updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString()
    },
    {
      id: 2,
      name: "Jane Smith",
      full_name: "Jane Smith",
      avatar: "/images/avatar/avatar-2.jpg",
      status: "offline",
      last_message: {
        message: "Thanks for the help!",
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      unread_count: 0,
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    {
      id: 3,
      name: "Mike Johnson",
      full_name: "Mike Johnson",
      avatar: "/images/avatar/avatar-3.jpg",
      status: "online",
      last_message: {
        message: "Can we meet tomorrow?",
        created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
      },
      unread_count: 1,
      updated_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
    }
  ]
};

export const demoMessages = {
  data: [
    {
      id: 1,
      message: "Hey, how are you doing?",
      sender_id: 1,
      user_id: 1,
      created_at: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      sender: {
        name: "John Doe",
        avatar: "/images/avatar/avatar-1.jpg"
      }
    },
    {
      id: 2,
      message: "I'm doing great, thanks! How about you?",
      sender_id: 999, // Current user ID
      user_id: 999,
      created_at: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      sender: {
        name: "You",
        avatar: "/images/avatar/avatar-4.jpg"
      }
    },
    {
      id: 3,
      message: "Pretty good! Just working on some projects.",
      sender_id: 1,
      user_id: 1,
      created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      sender: {
        name: "John Doe",
        avatar: "/images/avatar/avatar-1.jpg"
      }
    },
    {
      id: 4,
      message: "That sounds interesting! What kind of projects?",
      sender_id: 999,
      user_id: 999,
      created_at: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
      sender: {
        name: "You",
        avatar: "/images/avatar/avatar-4.jpg"
      }
    },
    {
      id: 5,
      message: "Mostly web development stuff. React, Node.js, that kind of thing.",
      sender_id: 1,
      user_id: 1,
      created_at: new Date(Date.now() - 1000 * 60 * 1).toISOString(),
      sender: {
        name: "John Doe",
        avatar: "/images/avatar/avatar-1.jpg"
      }
    }
  ]
};

// Demo user data
export const demoUser = {
  id: 999,
  name: "Current User",
  full_name: "Current User",
  avatar: "/images/avatar/avatar-4.jpg",
  email: "user@example.com"
}; 