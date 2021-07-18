import Auth from '@aws-amplify/auth';
import React, { useState, useEffect } from 'react';
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
import Login from './Login';

const ResetPassword = (props) => {
  const username = props.username;
  console.log("Username: ", username)
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [codeEmpty, setCodeEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [repasswordEmpty, setRepasswordEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSuccess(true);
  }

  function validateForm() {
    if (code.length === 0) {
      setCodeEmpty(true);
    } 
    if (password.length === 0){
      setPasswordEmpty(true);
    }
    if (repassword.length === 0){
      setRepasswordEmpty(true);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setCodeEmpty(false);
    setPasswordEmpty(false);
    setRepasswordEmpty(false);
    setSubmissionError("")
    if (code === '' || password === '' || repassword === '') {
      validateForm();
    }
    else if (password !== repassword) {
      setSubmissionError("New passwords do not match.");
    }
    else {
      setLoading(true);
      try {
        await Auth.forgotPasswordSubmit(username, code, password)
        .then(() => {
          setOpen(true);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setSubmissionError(err.message);
          setCode("");
          setPassword("");
          setRepassword("");
        });
      }
      catch (error) {
        setLoading(false);
        setSubmissionError(error.message);
        setCode("");
        setPassword("");
        setRepassword("");
      }
    }
  }

  if (!username || success) {
    return (
      <Login />
    )
  }

  return (
    <div className="reset">
      <h2 style={{textAlign: "center"}}>Reset Password</h2>
      <Form className="form" onSubmit={(e) => submitForm(e)}>
        <FormGroup className="code">
          <Label>Code</Label>
          <Input
            type="text"
            name="code"
            id="code"
            placeholder="Type the code recieved in your email."
            invalid={codeEmpty}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <FormFeedback invalid>
            Code cannot be empty.
          </FormFeedback>
        </FormGroup>
        <FormGroup className="password">
          <Label for="password">New Password</Label>
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
        <FormGroup className="password">
          <Label for="password">Re-enter New Password</Label>
          <Input
            type="password"
            name="repassword"
            id="repassword"
            placeholder="********"
            invalid={repasswordEmpty}
            value={repassword}
            onChange={(e) => {
              setRepassword(e.target.value);
            }}
          />
          <FormFeedback invalid>
            Re-enter Password cannot be empty.
          </FormFeedback>
        </FormGroup>
        <FormGroup row>
          <Button 
            className="submitBtn"
            disabled={loading}
            >
              Submit {" "} {loading && 
              <i class="fas fa-cog fa-spin" />}
          </Button>
            {(submissionError !== "") && 
            (!codeEmpty) && (!passwordEmpty) && (!repasswordEmpty) &&
            <Alert color="danger">
              {submissionError}
            </Alert>
            }
        </FormGroup>
      </Form>
      <Alert
        color="info"
        isOpen={open}
        toggle={handleClose}
      >
        Your password has been resetted successfully. Please sign in with new password.
      </Alert>
    </div>
  );
}

export default ResetPassword;
