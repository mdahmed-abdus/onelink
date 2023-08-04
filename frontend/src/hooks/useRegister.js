import { useState } from 'react';
import api from '../services/api';

export const useRegister = () => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const register = (
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword
  ) => {
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
        setError(null);
        setSuccessMessage(data.message);
      })
      .catch(error => {
        console.log(error);
        setSuccessMessage(null);
        setError(error);
      });
  };

  return { register, error, successMessage };
};
