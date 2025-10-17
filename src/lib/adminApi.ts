import axios from 'axios';

const API_BASE_URL = 'http://localhost:8787/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_username');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Analytics
  getAnalytics: () => apiClient.get('/admin/analytics'),

  // Blog Posts
  getPosts: () => apiClient.get('/blog/posts'),
  getPost: (slug: string) => apiClient.get(`/blog/post/${slug}`),
  createPost: (data: any) => apiClient.post('/blog/post', data),
  updatePost: (id: string, data: any) => apiClient.put(`/blog/post/${id}`, data),
  deletePost: (id: string) => apiClient.delete(`/blog/post/${id}`),

  // Categories
  getCategories: () => apiClient.get('/blog/categories'),
  createCategory: (data: any) => apiClient.post('/blog/category', data),
  updateCategory: (id: string, data: any) => apiClient.put(`/blog/category/${id}`, data),
  deleteCategory: (id: string) => apiClient.delete(`/blog/category/${id}`),

  // Messages
  getMessages: () => apiClient.get('/contact'),
  deleteMessage: (id: string) => apiClient.delete(`/contact/${id}`),

  // Portfolio
  getPortfolioProjects: () => apiClient.get('/portfolio'),
  getPortfolioProject: (slug: string) => apiClient.get(`/portfolio/${slug}`),
  createPortfolioProject: (data: any) => apiClient.post('/portfolio', data),
  updatePortfolioProject: (id: string, data: any) => apiClient.put(`/portfolio/${id}`, data),
  deletePortfolioProject: (id: string) => apiClient.delete(`/portfolio/${id}`),

  // Upload
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return apiClient.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
