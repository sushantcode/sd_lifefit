import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import FitbitAuthentication from "./components/FitbitAuthentication";
import FitbitCallback from './components/FitbitCallback';

function App() {
  //const url = window.location.href;
  const loggedin = false;
  return (
    <Router>
      <Switch>
        <Route path="/fitbitauthentication" component={FitbitAuthentication} />
        <Route path="/fitbitcallcall" component={FitbitCallback} />
      </Switch>
    </Router>
  );
}

export default App;
