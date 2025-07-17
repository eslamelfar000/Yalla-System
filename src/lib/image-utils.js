// Image utility functions

/**
 * Fix image URL by ensuring it has the correct format
 * @param {string} url - The image URL to fix
 * @returns {string} - The fixed image URL
 */
export const fixImageUrl = (url) => {
  if (!url) return "";
  
  // If it's already a full URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it starts with a slash, it's a relative path
  if (url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, assume it's a relative path and add a slash
  return `/${url}`;
};

/**
 * Get avatar initials from a name
 * @param {string} name - The name to get initials from
 * @returns {string} - The initials (up to 2 characters)
 */
export const getAvatarInitials = (name) => {
  if (!name) return "U";
  
  const words = name.trim().split(' ');
  
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

/**
 * Get a safe string representation of any value
 * @param {any} value - The value to convert to string
 * @returns {string} - The safe string representation
 */
export const safeToString = (value) => {
  if (value === null || value === undefined) {
    return "";
  }
  
  if (typeof value === "string") {
    return value;
  }
  
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return "[Object]";
    }
  }
  
  return String(value);
}; 