import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/footer';
import Navbar from './components/Navbar';
import Register from './components/Register';
import About from './components/About';
import ComingSoon from './components/ComingSoon';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/about" component={About} />
        <Route exact path="/coming-soon" component={ComingSoon} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
