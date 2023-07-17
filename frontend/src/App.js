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
import { useState } from 'react';
import Logout from './components/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} login={login} logout={logout} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/logout">
          <Logout isLoggedIn={isLoggedIn} logout={logout} />
        </Route>
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/coming-soon" component={ComingSoon} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/:userId">
          <Profile isLoggedIn={isLoggedIn} />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
