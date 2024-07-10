import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import StatusMessage from '../components/StatusMessage';
import api from '../services/api';

function ResetPassword() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tokenId = params.get('tokenId');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [statusMessage, setStatusMessage] = useState({
    message: '',
    style: '',
  });

  const handleFormSubmit = e => {
    e.preventDefault();
    setStatusMessage({ message: 'Loading...', style: 'info' });
    api
      .resetPassword(tokenId, password, confirmPassword)
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
        <form className="mt-8 w-full" onSubmit={handleFormSubmit}>
          <h1 className="text-4xl">Reset password</h1>
          <p className="mt-4">Enter your new password.</p>
          <TextInput
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required={true}
            placeHolder="Enter new password"
            externalStyle="w-full mt-4"
          />
          <TextInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required={true}
            placeHolder="Confirm new password"
            externalStyle="w-full mt-4"
          />
          <Button
            text="Reset password"
            buttonType="outline"
            externalStyle="mt-4 w-full"
          />
          <StatusMessage status={statusMessage} />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
