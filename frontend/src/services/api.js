import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';

function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function register(registerData) {
  const response = await axios.post(
    API_BASE_URL + '/users/register',
    registerData
  );
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('User registration failed');
  }
}

export async function login(loginData) {
  const response = await axios.post(API_BASE_URL + '/users/login', loginData);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('User login failed');
  }
}

export async function getUserData(username) {
  const response = await axios.get(API_BASE_URL + '/users/' + username, {
    headers: { Authorization: 'Bearer ' + getAuthTokenFromLocalStorage() },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error('No user data found');
  }
}

const api = { register, login, getUserData };

export default api;
