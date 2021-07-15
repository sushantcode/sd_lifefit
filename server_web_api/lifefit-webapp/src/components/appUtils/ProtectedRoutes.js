import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import AuthenticatedNavMenu from './AuthenticatedNavMenu';
import Footer from './Footer';
import { Container } from 'reactstrap';
import { Auth } from 'aws-amplify';

const ProtectedRoutes = ({ children, ...rest }) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  const isAuthenticated = () => {

    setAuth(false);

    Auth.currentAuthenticatedUser({
      bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then((user) => {
      setAuth(true);
      setUsername(user.username);
    })
    .catch((err) => {
      redirectToLogin();
    });
  }

  const redirectToLogin = () => {
      history.push('/login');
  }

  useEffect(() => {
      isAuthenticated();
  }, []);

  return (
    <>
      <AuthenticatedNavMenu user_name={username} />
      <Container>
        <div style={{minHeight: "73vh"}}>
          <Route {...rest}>
            { auth ? children : null }
          </Route>
        </div>
      </Container>
      <Footer />
    </>  
  )
}

export default ProtectedRoutes;
