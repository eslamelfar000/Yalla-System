import { api } from '../config/axios.config';

// File upload service for chat attachments
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('File upload error:', error);
    throw error;
  }
};

// Upload multiple files
export const uploadFiles = async (files) => {
  try {
    const uploadPromises = files.map(file => uploadFile(file));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple file upload error:', error);
    throw error;
  }
};

// Mock file upload for development (when API is not available)
export const mockUploadFile = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a mock file object with URL
      const mockFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file), // Create blob URL for preview
        uploaded_at: new Date().toISOString(),
      };
      resolve(mockFile);
    }, 1000); // Simulate network delay
  });
};

// Mock multiple file upload
export const mockUploadFiles = async (files) => {
  const uploadPromises = files.map(file => mockUploadFile(file));
  return Promise.all(uploadPromises);
};

// File validation
export const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'video/mp4',
    'video/avi',
    'video/mov',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ];

  if (file.size > maxSize) {
    throw new Error(`File size must be less than 10MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type ${file.type} is not supported`);
  }

  return true;
};

// Validate multiple files
export const validateFiles = (files) => {
  const errors = [];
  
  files.forEach((file, index) => {
    try {
      validateFile(file);
    } catch (error) {
      errors.push(`File ${index + 1} (${file.name}): ${error.message}`);
    }
  });

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }

  return true;
}; 