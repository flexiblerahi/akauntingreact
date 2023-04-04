import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: 'https://dev.otadjer.com/api',
  withCredentials: false,
  'Content-Type': 'application/json',
});

export default axiosInstance;
