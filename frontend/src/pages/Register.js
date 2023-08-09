import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Link from '../components/Link';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import api from '../services/api';
import StatusMessage from '../components/StatusMessage';

function Register() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState({
    message: '',
    style: '',
  });

  const history = useHistory();

  const handleRegisterSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ message: 'Loading...', style: 'info' });

    api
      .register({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      })
      .then(({ message }) => {
        setStatusMessage({ message, style: 'success' });
        setTimeout(() => {
          setLoading(false);
          history.push('/email/verify');
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        setStatusMessage({ message: error.message, style: 'error' });
        setLoading(false);
      });
  };

  return (
    <div className="gridMainContainer pb-[100px] mt-24">
      <div className="gridContainer">
        <div className="text-center">
          <h1 className="text-4xl">Create an account</h1>
          <p>
            Already have an account? <Link href="/" text="Login" />
          </p>
        </div>
        <form className="mt-10" onSubmit={handleRegisterSubmit}>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-5 w-full sm:w-1/2">
              <TextInput
                name="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required={true}
                placeHolder="Enter your first name"
              />
              <TextInput
                name="lastName"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required={true}
                placeHolder="Enter your last name"
              />
              <TextInput
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required={true}
                placeHolder="Enter your email"
              />
              <TextInput
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required={true}
                placeHolder="Enter your username"
              />
              <TextInput
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required={true}
                placeHolder="Enter your password"
              />
              <TextInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required={true}
                placeHolder="Confirm your password"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button text="Register" disabled={loading} />
          </div>
          <StatusMessage status={statusMessage} />
        </form>
      </div>
    </div>
  );
}

export default Register;
