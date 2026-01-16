const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const analyzeChat = async (chatText) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chat: chatText }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
};

