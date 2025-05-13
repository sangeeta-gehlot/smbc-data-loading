import axios from 'axios';

const jwtAxios = axios.create({
  // baseURL: 'http://localhost:9090/api/', //YOUR_API_URL HERE
  baseURL: 'http://192.168.50.7:9090/api/', //YOUR_API_URL HERE (DEV URL)
  // baseURL: 'http://10.154.8.156:9090/api/', //YOUR_API_URL HERE (UAT URL)
  headers: {
    'Content-Type': 'application/json',
  },
});
jwtAxios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.msg === 'Token is not valid') {
      console.log('Need to logout user');
      // store.dispatch({type: LOGOUT});
    }
    return Promise.reject(err);
  },
);
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete jwtAxios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};

export default jwtAxios;
