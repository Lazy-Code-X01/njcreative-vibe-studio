const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

export const contactApi = {
  submitContactForm: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Form submission failed' }));
      throw new Error(error.message || 'Failed to submit form');
    }

    return response.json();
  },
};
