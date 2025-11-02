import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";
const API_PATH = `${API_BASE_URL}/api`;

export const portfolioApi = {
  // Get all portfolio projects
  getProjects: () => axios.get(`${API_PATH}/portfolio`),

  // Get single project by slug
  getProject: (slug: string) => axios.get(`${API_PATH}/portfolio/${slug}`),

  // Create new project (Admin only)
  createProject: (data: any, token: string) =>
    axios.post(`${API_PATH}/portfolio`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Update project (Admin only)
  updateProject: (id: string, data: any, token: string) =>
    axios.put(`${API_PATH}/portfolio/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  // Delete project (Admin only)
  deleteProject: (id: string, token: string) =>
    axios.delete(`${API_PATH}/portfolio/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
