import { useState } from 'react';
import api from '../services/api';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const register = (
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword
  ) => {
    setIsLoading(true);
    setError(null);

    api
      .register({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      })
      .then(data => {
        return data.message;
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  return { register, isLoading, error };
};
