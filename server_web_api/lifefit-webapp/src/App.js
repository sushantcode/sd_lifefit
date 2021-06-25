import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FitbitAuthentication from "./components/fitbitAuth/FitbitAuthentication";
import FitbitCallback from './components/fitbitAuth/FitbitCallback';
import Login from './components/appAuth/Login';
import Navbar from './components/appUtils/Navbar';
import Welcome from './components/pages/Welcome'

function App() {
  return (
      <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/fitbitauthentication" component={FitbitAuthentication} />
        <Route path="/fitbitcallback" component={FitbitCallback} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
    
  );
}

export default App;
