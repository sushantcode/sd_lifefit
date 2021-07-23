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
import './ConfirmSignup.css';
import { Redirect } from 'react-router';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

const ConfirmSignup = (props) => {
  const username = props.username;
  console.log("Username: ", username);
  console.log(props.uid);
  const [code, setCode] = useState("");
  const [codeEmpty, setCodeEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const userData = {
    id: props.uid,
    fName: props.fName,
    lName: props.lName,
    username: props.username,
    email: props.email,
    phone: props.phone,
    street: props.address,
    city: props.city,
    state: props.stateAbb,
    zipcode: props.zip,
    gender: props.gender,
    age: 0,
    score: 0
  }

  async function doStoreData() {
    try {
      const addUser = await API.graphql({ query: mutations.createUserDetails, variables: {input: userData}});
      setOpen(true);
      setLoading(false);
    }
    catch (err) {
      setSubmissionError(err.message);
      setLoading(false);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setSuccess(true);
  }

  const handleCloseResend = () => {
    setOpenConfirm(false);
  }

  function validateForm() {
    if (code.length === 0) {
      setCodeEmpty(true);
    } 
  }

  async function submitForm(e) {
    e.preventDefault();
    setCodeEmpty(false);
    setSubmissionError("")
    if (code === '') {
      validateForm();
    }
    else {
      setLoading(true);
      try {
        await Auth.confirmSignUp(username, code);
        doStoreData();
      }
      catch (error) {
        setLoading(false);
        setSubmissionError(error.message);
        setCode("");
      }
    }
  }

  async function resendCode(e) {
    e.preventDefault();
    setCode("")
    setSubmissionError("")
    try {
      await Auth.resendSignUp(username);
      setOpenConfirm(true);
    }
    catch(err) {
      setSubmissionError(err.message);
    }
  }

  if (success) {
    setSuccess(false);
    return (
      <Redirect to="/login" />
    )
  }

  return (
    <div className="confirmSignup">
      <h2 style={{textAlign: "center"}}>Signup Confirmation</h2>
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
        <FormGroup row>
          <Button 
            className="submitBtn"
            disabled={loading}
            >
              Submit {" "} {loading && 
              <i class="fas fa-cog fa-spin" />}
          </Button>
            {(submissionError !== "") && 
            (!codeEmpty) &&
            <Alert color="danger">
              {submissionError}
            </Alert>
            }
        </FormGroup>
      </Form>
      <button className="resetBtn btn" onClick={(e) => resendCode(e)}>
        Didn't received the code? Resend Confirmation code.
      </button>
      <Alert
        color="info"
        isOpen={openConfirm}
        toggle={handleCloseResend}
      >
        Confirmation code is sent again. Please check your email.
      </Alert>
      <Alert
        color="info"
        isOpen={open}
        toggle={handleClose}
      >
        Your signup is successful. Please login to continue using our app.
      </Alert>
    </div>
  );
}

export default ConfirmSignup;
