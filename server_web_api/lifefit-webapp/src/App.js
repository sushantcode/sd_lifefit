import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FitbitAuthentication from "./components/fitbitAuth/FitbitAuthentication";
import FitbitCallback from './components/fitbitAuth/FitbitCallback';
import Login from './components/appAuth/Login';
import NavMenu from './components/appUtils/NavMenu';
import AuthenticatedNavMenu from './components/appUtils/AuthenticatedNavMenu'
import Welcome from './components/pages/Welcome';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Logout from './components/appAuth/Logout';
import Signup from './components/appAuth/Signup';
import ResetPassword from './components/appAuth/ResetPassword';
import { Hub } from 'aws-amplify';
import { Container } from 'reactstrap';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    Hub.listen("auth", (event) => {
      setCurrentUser(event.payload.data);
      console.log(currentUser);
    })
  })
  return (
      <Router>
        {currentUser !== null? <AuthenticatedNavMenu /> : <NavMenu />}
      <Switch>
        <Container>
          <Route exact path="/" component={Welcome} />
          <Route path="/syncfitbit" component={FitbitAuthentication} />
          <Route path="/fitbitcallback" component={FitbitCallback} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/logout" component={Logout} />
          <Route path="/profile" component={Profile} />
          <Route path="/resetpassword" component={ResetPassword} />
        </Container>
      </Switch>
    </Router>
    
  );
}

export default App;
