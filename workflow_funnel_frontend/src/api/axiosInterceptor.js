import axiosInstance from './axiosInstance';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log('Processing queue...', { error, token });
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  async (error) => {
    console.log('Interceptor error triggered:', error);

    const originalRequest = error.config;
    console.log('Original request:', originalRequest);

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log('Handling 401 error');

      if (!localStorage.getItem('refreshToken')) {
        console.error('No refresh token found in localStorage.');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        console.log(
          'Token refresh in progress, queuing the request...'
        );
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log(
              'Retrying queued request with new token:',
              token
            );
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            console.error('Error processing queued request:', err);
            return Promise.reject(err);
          });
      }

      console.log('Initiating token refresh...');
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post(
          '/users/refresh-token',
          {
            refreshToken: localStorage.getItem('refreshToken'),
          }
        );
        console.log('Token refreshed successfully:', data);

        localStorage.setItem('accessToken', data.accessToken);
        processQueue(null, data.accessToken);

        originalRequest.headers[
          'Authorization'
        ] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response && error.response.status === 403) {
      console.error(
        '403 Forbidden - Unauthorized access:',
        error.response.data.message
      );
      window.location.href = '/login';
    }

    console.error('Unhandled error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
