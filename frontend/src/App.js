import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import Logout from './pages/Logout';
import Register from './pages/Register';
import ComingSoon from './pages/ComingSoon';
import About from './pages/About';
import EmailVerification from './pages/EmailVerification';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';

function App() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {user ? <Redirect to={`/${user.username}`} /> : <Home />}
        </Route>
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/coming-soon" component={ComingSoon} />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset" component={ResetPassword} />
        <Route exact path="/email/verify" component={EmailVerification} />
        <Route exact path="/:username" component={Profile} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
