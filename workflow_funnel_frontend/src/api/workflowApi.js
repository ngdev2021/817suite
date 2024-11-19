import axiosInstance from './axiosInterceptor';

export const fetchWorkflows = async () => {
  console.log('Starting fetchWorkflows...');
  try {
    const response = await axiosInstance.get('/workflows');
    console.log('Workflows fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching workflows:', error);
    throw error;
  }
};
