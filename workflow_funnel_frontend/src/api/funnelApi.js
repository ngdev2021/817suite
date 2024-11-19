import axiosInstance from './axiosInstance';

export const fetchFunnels = async () => {
  try {
    const response = await axiosInstance.get('/funnels');
    console.log('API Response:', response.data);
    return Array.isArray(response.data)
      ? response.data
      : response.data.funnels || [];
  } catch (error) {
    console.error(
      'Error fetching funnels:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const createFunnel = async (funnelData) => {
  try {
    const response = await axiosInstance.post('/funnels', funnelData);
    return response.data;
  } catch (error) {
    console.error(
      'Error creating funnel:',
      error.response?.data || error.message
    );
    throw error;
  }
};
