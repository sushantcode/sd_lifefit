import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import Navmenu from './NavMenu';
import Footer from './Footer';
import { Container } from 'reactstrap';
import { Auth } from 'aws-amplify';

const UnprotectedRoutes = ({ children, ...rest }) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);

  const isAuthenticated = () => {
    // TODO---- Make it false and uncomment bottom code
    setAuth(true);
    // TODO ---- Delete this line
    redirectToDash();

    // Auth.currentSession().then( response => {
    //     if(response.isValid()) {
    //       setAuth(true);
    //       redirectToDash();
    //     }
    // }).catch((err) => {
    //     console.log(err)
    // });
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
        <div style={{minHeight: "72vh"}}>
          <Route {...rest}>
            { auth ? children : null }
          </Route>
        </div>
      </Container>
      <Footer />
    </>  
  )
}

export default UnprotectedRoutes;
