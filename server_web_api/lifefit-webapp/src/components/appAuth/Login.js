import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  Alert,
  Label,
  Input,
  Button,
} from 'reactstrap';
import './Login.css';
import { Redirect } from 'react-router';
import ResetPassword from './ResetPassword';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  function validateForm() {
    if (username.length === 0) {
      setUsernameEmpty(true);
    }
    else {
      setUsernameEmpty(false);
    }
    if (password.length === 0){
      setPasswordEmpty(true);
    }
    else {
      setPasswordEmpty(false);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setUsernameEmpty(false);
    setPasswordEmpty(false);
    setSubmissionError("")
    if (username === '' || password === '') {
      validateForm();
    }
    else {
      setLoading(true);
      try{
        const user = await Auth.signIn(username, password);
        setIsLoggedIn(true);
      }
      catch (error) {
        setLoading(false);
        setSubmissionError(error.message);
        setUsername("");
        setPassword("");
      }
    }
  }

  async function resetClicked(e) {
    e.preventDefault();
    setUsernameEmpty(false);
    setPasswordEmpty(false);
    setSubmissionError("")
    if (username !== "") {
      try {
        // Send confirmation code to user's email
        await Auth.forgotPassword(username)
        .then(() => {
          setResetPassword(true);
        })
        .catch((err) => {
          if (err.message === "Username/client id combination not found.") {
            setSubmissionError("Username does not exists.")
          }
          else {
            setSubmissionError(err.message);
          }
        });
      }
      catch(err) {
        setSubmissionError(err.message);
      }
      
    }
    else {
      setUsernameEmpty(true);
    }
  }

    if (resetPassword) {
      return (
        <ResetPassword username={username} />
      )
    }

    if (isLoggedIn) {
      return (
        <Redirect to="/dashboard" />
      )
    }
    return (
      <div className="login">
        <h2 className="text-center signin-header p-3 text-light rounded-2">Sign In</h2>
        <Form className="form" onSubmit={(e) => submitForm(e)}>
          <FormGroup className="username">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Your Username"
              invalid={usernameEmpty}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FormFeedback invalid>
              Username cannot be empty.
            </FormFeedback>
          </FormGroup>
          <FormGroup className="password">
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              invalid={passwordEmpty}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FormFeedback invalid>
              Password cannot be empty.
            </FormFeedback>
          </FormGroup>
          <FormGroup row>
            <Button 
              className="submitBtn bg-danger"
              disabled={loading}
              >
                Submit {" "} {loading && 
                <i class="fas fa-cog fa-spin" />}
              </Button>
              {(submissionError !== "") && 
              (!usernameEmpty) && (!passwordEmpty) &&
              <Alert color="danger">
                {submissionError}
              </Alert>
              }
          </FormGroup>
        </Form>
        <button className="resetBtn text-danger" onClick={(e) => resetClicked(e)}>
            Forgot Password? Reset now!
        </button>
      </div>
    );
}

export default Login;