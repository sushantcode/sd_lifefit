import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import FitbitAuthentication from "./components/FitbitAuth/FitbitAuthentication";
import FitbitCallback from './components/FitbitAuth/FitbitCallback';

function App() {
  //const url = window.location.href;
  //const loggedin = false;
  return (
    <Router>
      <Switch>
        <Route path="/fitbitauthentication" component={FitbitAuthentication} />
        <Route path="/fitbitcallback" component={FitbitCallback} />
      </Switch>
    </Router>
  );
}

export default App;
