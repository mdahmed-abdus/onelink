import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001';
const USER_API_ENDPOINT = API_BASE_URL + '/users';
const LINK_API_ENDPOINT = API_BASE_URL + '/links';

const getUserFromLocalStorage = () => JSON.parse(localStorage.getItem('user'));

const getAuthTokenFromLocalStorage = () => getUserFromLocalStorage()?.token;

const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${getAuthTokenFromLocalStorage()}` },
});

const apiHandler = async apiFunc => {
  try {
    const response = await apiFunc();
    return response.data;
  } catch (error) {
    // the request was made and the server responded with a status code that falls out of the range of 2xx
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    // something happened in setting up the request that triggered an error
    console.log('Error', error.message);
    throw new Error('Something went wrong');
  }
};

const register = registerData =>
  apiHandler(() => axios.post(`${USER_API_ENDPOINT}/register`, registerData));

const login = loginData =>
  apiHandler(() => axios.post(`${USER_API_ENDPOINT}/login`, loginData));

const getUserData = username =>
  apiHandler(() => axios.get(`${USER_API_ENDPOINT}/${username}`));

const sendVerificationEmail = email =>
  apiHandler(() =>
    axios.post(`${USER_API_ENDPOINT}/email/resend-verification-email`, {
      email,
    })
  );

const verifyEmail = tokenId =>
  apiHandler(() =>
    axios.post(`${USER_API_ENDPOINT}/email/verify?tokenId=${tokenId}`)
  );

const forgotPassword = email =>
  apiHandler(() =>
    axios.post(`${USER_API_ENDPOINT}/password/forgot`, {
      email,
    })
  );

const resetPassword = (tokenId, password, confirmPassword) =>
  apiHandler(() =>
    axios.post(`${USER_API_ENDPOINT}/password/reset?tokenId=${tokenId}`, {
      password,
      confirmPassword,
    })
  );

const addLink = linkData =>
  apiHandler(() =>
    axios.post(`${LINK_API_ENDPOINT}/new`, linkData, getAuthHeader())
  );

const updateLink = (linkData, linkId) =>
  apiHandler(() =>
    axios.patch(`${LINK_API_ENDPOINT}/${linkId}`, linkData, getAuthHeader())
  );

const deleteLink = linkId =>
  apiHandler(() =>
    axios.delete(`${LINK_API_ENDPOINT}/${linkId}`, getAuthHeader())
  );

const api = {
  register,
  login,
  getUserData,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  addLink,
  updateLink,
  deleteLink,
};

export default api;
