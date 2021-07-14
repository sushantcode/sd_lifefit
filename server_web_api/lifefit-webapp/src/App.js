import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FitbitAuthentication from "./components/fitbitAuth/FitbitAuthentication";
import FitbitCallback from './components/fitbitAuth/FitbitCallback';
import Login from './components/appAuth/Login';
import NavMenu from './components/appUtils/NavMenu';
import AuthenticatedNavMenu from './components/appUtils/AuthenticatedNavMenu'
import Welcome from './components/pages/Welcome';
import About from './components/pages/About';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Signup from './components/appAuth/Signup';
import ResetPassword from './components/appAuth/ResetPassword';
import ContactAgent from './components/pages/ContactAgent';
import ChangePassword from './components/pages/ChangePassword';
import { Hub } from 'aws-amplify';
import { Container } from 'reactstrap';
import ProtectedRoutes from './components/appUtils/ProtectedRoutes';
import UnprotectedRoutes from './components/appUtils/UnprotectedRoutes';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  
  useEffect(() => {
    Hub.listen("auth", (data) => {
      if (data.payload.event === 'signIn') {
        setIsAuth(true);
      }
      else if (data.payload.event === 'signOut') {
        setIsAuth(false);
      }
    })
  })
  return (
      <Router>
        {isAuth? <AuthenticatedNavMenu user_name="Sushant" /> : <NavMenu />}
        <Container>
          <Switch>
              <UnprotectedRoutes exact path="/" component={Welcome} isAuth={isAuth} />
              <ProtectedRoutes path="/syncfitbit" component={FitbitAuthentication} isAuth={isAuth} />
              <UnprotectedRoutes path="/fitbitcallback" component={FitbitCallback} isAuth={isAuth} />
              <UnprotectedRoutes path="/login" component={Login} isAuth={isAuth} />
              <UnprotectedRoutes path="/signup" component={Signup} isAuth={isAuth} />
              <ProtectedRoutes path="/dashboard" component={Dashboard} isAuth={isAuth} />
              <ProtectedRoutes path="/changepassword" component={ChangePassword} isAuth={isAuth} />
              <UnprotectedRoutes path="/about" component={About} isAuth={isAuth} />
              <ProtectedRoutes path="/profile" component={Profile} isAuth={isAuth} />
              <ProtectedRoutes path="/contactagent" component={ContactAgent} isAuth={isAuth} />
          </Switch>
      </Container>
    </Router>
    
  );
}

export default App;
