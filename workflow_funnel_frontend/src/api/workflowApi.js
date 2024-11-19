import axiosInstance from './axiosInterceptor';

export const fetchWorkflows = async () => {
  console.log('Starting fetchWorkflows...');
  try {
    const response = await axiosInstance.get('/workflows');
    console.log('Response from API:', response.data); // Full response
    return response.data.workflows; // Ensure correct array is returned
  } catch (error) {
    console.error('Error fetching workflows:', error);
    throw error;
  }
};
