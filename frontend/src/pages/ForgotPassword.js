import { useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import api from '../services/api';
import StatusMessage from '../components/StatusMessage';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    style: '',
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    setStatusMessage({ message: 'Loading...', style: 'info' });
    api
      .forgotPassword(email)
      .then(({ message }) => {
        setStatusMessage({ message, style: 'success' });
      })
      .catch(error => {
        console.log(error);
        setStatusMessage({ message: error.message, style: 'error' });
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
          <StatusMessage status={statusMessage} />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
