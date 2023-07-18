import { useState } from 'react';
import Button from './Button';
import Link from './Link';
import TextInput from './TextInput';

function Home({ login }) {
  // set these empty in prod
  const [emailUsername, setEmailUsername] = useState('jane');
  const [password, setPassword] = useState('Aa@12345678');

  const handleLoginSubmit = e => {
    e.preventDefault();
    login(emailUsername, password);
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
              <Link href="/forgot-password" text="Forgot password?" />
              <Button text="Login" externalStyle="mt-5 w-full" />
              <Link href="/register" text="Create an account" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
