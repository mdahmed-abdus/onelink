import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import api from '../services/api';
import jwt_decode from 'jwt-decode';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = (emailUsername, password) => {
    setIsLoading(true);
    setError(null);

    const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const emailUsernameIsEmail = EMAIL_REGEX.test(emailUsername);
    const key = emailUsernameIsEmail ? 'email' : 'username';

    api
      .login({ [key]: emailUsername, password })
      .then(({ token }) => {
        const { username } = jwt_decode(token);

        localStorage.setItem('user', JSON.stringify({ token, username }));

        dispatch({ type: 'LOGIN', payload: { token, username } });
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  return { login, isLoading, error };
};
