import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Register from './components/Register';
import About from './components/About';
import ComingSoon from './components/ComingSoon';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgotPassword';
import { useEffect, useState } from 'react';
import Logout from './components/Logout';
import api from './services/api';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import jwt_decode from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (emailUsername, password) => {
    const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const emailUsernameIsEmail = EMAIL_REGEX.test(emailUsername);
    const key = emailUsernameIsEmail ? 'email' : 'username';

    api
      .login({ [key]: emailUsername, password })
      .then(({ token }) => {
        localStorage.setItem('token', JSON.stringify(token));
        const { username } = jwt_decode(token);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.log(error);
        setIsLoggedIn(false);
      });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    console.log('App.js useEffect');
    const user = JSON.parse(localStorage.getItem('token'));
    user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} login={login} logout={logout} />
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Redirect to={`/${localStorage.getItem('username')}`} />
          ) : (
            <Home login={login} />
          )}
        </Route>
        <Route exact path="/logout">
          <Logout isLoggedIn={isLoggedIn} logout={logout} />
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/coming-soon" component={ComingSoon} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/:username">
          <Profile isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
