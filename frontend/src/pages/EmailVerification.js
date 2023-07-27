import { useEffect, useState } from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import api from '../services/api';
import { useLocation } from 'react-router-dom';
import Link from '../components/Link';

function EmailVerification() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const tokenId = params.get('tokenId');

  useEffect(() => {
    if (tokenId) {
      api
        .verifyEmail(tokenId)
        .then(({ message }) => {
          setError('');
          setSuccess(message);
        })
        .catch(error => {
          setSuccess('');
          setError(error);
        });
    }
  }, [tokenId]);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    api
      .sendVerificationEmail(email)
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
        {tokenId ? (
          <div className="mt-4">
            {error && (
              <p className="mt-4 text-center text-danger">{error.message}</p>
            )}
            {success && (
              <div>
                <p className="mt-4 text-center text-success">{success}</p>
                <Link
                  text="Click here to login"
                  href="/"
                  externalStyle="block mt-4"
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-4xl">Verify your email</h1>
            <p className="mt-4">
              Please check your inbox and spam for email verification link.
            </p>
            <form className="mt-8 w-full" onSubmit={handleFormSubmit}>
              <p>Did not receive the email?</p>
              <p>Enter your email and we will send it again.</p>
              <TextInput
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required={true}
                placeHolder="Enter email"
                externalStyle="w-full mt-4"
              />
              <Button
                text="Resend verification link"
                disabled={success}
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
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
