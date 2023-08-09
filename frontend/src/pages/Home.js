import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import Button from '../components/Button';
import Link from '../components/Link';
import TextInput from '../components/TextInput';
import api from '../services/api';
import { useAuthContext } from '../hooks/useAuthContext';
import StatusMessage from '../components/StatusMessage';

function Home() {
  const [loading, setLoading] = useState(false);
  const [emailUsername, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    style: '',
  });

  const { dispatch } = useAuthContext();

  const handleLoginSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ message: 'Loading...', style: 'info' });

    const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const emailUsernameIsEmail = EMAIL_REGEX.test(emailUsername);
    const key = emailUsernameIsEmail ? 'email' : 'username';

    api
      .login({ [key]: emailUsername, password })
      .then(({ token }) => {
        const { username } = jwt_decode(token);

        localStorage.setItem('user', JSON.stringify({ token, username }));

        dispatch({ type: 'LOGIN', payload: { token, username } });
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(error);
        setStatusMessage({ message: error.message, style: 'error' });
        setLoading(false);
      });
  };

  return (
    <div className="gridMainContainer mt-32 sm:mt-64">
      <div className="gridContainer">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-center lg:text-start">
            <h1 className="text-6xl sm:text-7xl font-medium">Onelink</h1>
            <p className="mt-2 text-xl sm:text-2xl font-light">
              A Linktree clone built using MERN Stack
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <form
              className="flex flex-col items-center sm:w-3/4"
              onSubmit={handleLoginSubmit}
            >
              <TextInput
                value={emailUsername}
                onChange={e => setEmailUsername(e.target.value)}
                placeHolder="Email / Username"
                required={true}
                externalStyle="w-full"
              />
              <TextInput
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                required={true}
                placeHolder="Password"
                externalStyle="mt-5 w-full"
              />
              <Link href="/password/forgot" text="Forgot password?" />
              <Button
                text="Login"
                disabled={loading}
                externalStyle="mt-5 w-full"
              />
              <Link href="/register" text="Create an account" />
              <StatusMessage status={statusMessage} />
              {error && (
                <div className="text-center w-full">
                  {error.message.toUpperCase() === 'EMAIL NOT VERIFIED' && (
                    <Link
                      href="/email/verify"
                      text="Resend email verification"
                    />
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
