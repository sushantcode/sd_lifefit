import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import FitbitAuthentication from "./components/fitbitAuth/FitbitAuthentication";
import FitbitCallback from './components/fitbitAuth/FitbitCallback';
import Login from './components/appAuth/Login';
import Welcome from './components/pages/Welcome';
import About from './components/pages/About';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Signup from './components/appAuth/Signup';
import ContactAgent from './components/pages/ContactAgent';
import ChangePassword from './components/pages/ChangePassword';
import ProtectedRoutes from './components/appUtils/ProtectedRoutes';
import UnprotectedRoutes from './components/appUtils/UnprotectedRoutes';

function App() {
  
  return (
      <Router>
        <Switch>
            <UnprotectedRoutes exact path="/" component={Welcome} />
            <ProtectedRoutes path="/syncfitbit" component={FitbitAuthentication} />
            <UnprotectedRoutes path="/fitbitcallback" component={FitbitCallback} />
            <UnprotectedRoutes path="/login" component={Login} />
            <UnprotectedRoutes path="/signup" component={Signup} />
            <ProtectedRoutes path="/dashboard" component={Dashboard} />
            <ProtectedRoutes path="/changepassword" component={ChangePassword} />
            <UnprotectedRoutes path="/about" component={About} />
            <ProtectedRoutes path="/profile" component={Profile} />
            <ProtectedRoutes path="/contactagent" component={ContactAgent} />
        </Switch>
    </Router>
    
  );
}

export default App;
