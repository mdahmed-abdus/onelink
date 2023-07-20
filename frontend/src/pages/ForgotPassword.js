import { useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import api from '../services/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    api
      .forgotPassword(email)
      .then(({ message }) => {
        setError('');
        setSuccess(message);
      })
      .catch(error => {
        console.log(error);
        setSuccess('');
        setError(error);
      });
  };

  return (
    <div className="gridMainContainer mt-24">
      <div className="gridContainer md:w-1/2 m-auto text-center">
        <h1 className="text-4xl">Forgot your password?</h1>
        <p className="mt-4">
          Enter your email associated with your account and we will send you an
          email with link to reset your password.
        </p>
        <form
          className="mt-8 flex flex-col items-center justify-center"
          onSubmit={handleFormSubmit}
        >
          <TextInput
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required={true}
            placeHolder="Enter email"
            externalStyle="w-full"
          />
          <Button
            text="Submit"
            buttonType="outline"
            externalStyle="mt-4 w-full"
          />
          {error && (
            <p className="mt-4 text-center text-danger">{error.message}</p>
          )}
          {success && (
            <p className="mt-4 text-center text-success">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
