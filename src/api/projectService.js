import { apiClient } from './client';

export const fetchProjects = async () => {
    const response = await apiClient.get('/api/projects');
    return response.data;
};