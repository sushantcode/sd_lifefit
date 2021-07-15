import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Navmenu from '../appUtils/NavMenu';
import { Container } from 'reactstrap';
import { Auth } from 'aws-amplify';

const UnprotectedRoutes = ({ children, ...rest }) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);

  const isAuthenticated = () => {

    setAuth(false);

    Auth.currentSession().then( response => {
        if(response.isValid()) {
          redirectToDash();
        }
    }).catch((err) => {
        console.log(err)
    });
  }

  const redirectToDash = () => {
    history.push('/dashboard');
  }

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <>
      <Navmenu />
      <Container>
        <Route {...rest}>
          { auth ? children : null }
        </Route>
      </Container>
    </>  
  )
}

export default UnprotectedRoutes;
