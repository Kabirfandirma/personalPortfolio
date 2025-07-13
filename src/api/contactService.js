import { apiClient } from './client';

export const submitContact = async (formData) => {
    try {
        const response = await apiClient.post('/api/contact', formData);
        return response.data;
    } catch (error) {
        // Unified error handling
        throw new Error(error.response?.data?.message || 'Submission failed');
    }
};