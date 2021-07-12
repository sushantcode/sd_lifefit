import Auth from '@aws-amplify/auth';
import React, { useState, useEffect } from 'react';
import "./Signup.css";
import {
  Form,
  FormFeedback,
  FormGroup,
  Alert,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap';
import './Login.css';
import { Redirect } from 'react-router';
import ResetPassword from './ResetPassword';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  states = states.map(item => 
    <option>
      {item}
    </option>);

  function validateForm() {
    if (username.length === 0) {
      setUsernameEmpty(true);
    } 
    if (password.length === 0){
      setPasswordEmpty(true);
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
      <div className="signup">
        <h2 style={{textAlign: "center"}}>Sign up</h2>
        <Form className="form" onSubmit={(e) => submitForm(e)}>
          <Row className="name">
            <Col md={4}>
              <FormGroup>
                <Label for="first">First Name*</Label>
                <Input type="text" name="first" id="first" placeholder="First*" />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="middle">Middle Name</Label>
                <Input type="text" name="middle" id="middle" placeholder="Middle" />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="last">Last Name*</Label>
                <Input type="text" name="last" id="last" placeholder="Last*" />
              </FormGroup>
            </Col>
          </Row>
          <Row className="username">
            <Col md={6}>
              <FormGroup>
                <Label for="username">Username*</Label>
                <Input type="text" name="username" id="username" placeholder="Username*" />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="password">Password*</Label>
                <Input type="password" name="password" id="password" placeholder="Password*" />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="email">
            <Label for="email">Email*</Label>
            <Input type="email" name="email" id="email" placeholder="Email*" />
          </FormGroup>
          <FormGroup className="phone">
            <Label for="phone">Phone Number*</Label>
            <Input type="number" name="phone" id="phone" placeholder="0123456789"/>
          </FormGroup> 
          <FormGroup className="address">
            <Label for="exampleAddress">Address*</Label>
            <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St"/>
          </FormGroup>
          <Row className="cityStateZip">
            <Col md={5}>
              <FormGroup>
                <Label for="city">City*</Label>
                <Input type="text" name="city" id="city" placeholder="City*" />
              </FormGroup>
            </Col>
            <Col md={4}>
            <FormGroup>
              <Label for="state">State*</Label>
              <Input type="select" name="state" id="state">
                {states}
              </Input>
            </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="zip">Zip-code*</Label>
                <Input type="number" name="zip" id="zip" placeholder="12345" />
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <Label for="gender">Gender*</Label>
            <Row className="cityStateZip">
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" />{' '}
                      Male
                  </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" />{' '}
                      Female
                  </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" />{' '}
                      Others
                  </Label>
                </FormGroup>
              </Col>
            </Row>
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
              (!usernameEmpty) && (!passwordEmpty) &&
              <Alert color="danger">
                {submissionError}
              </Alert>
              }
          </FormGroup>
        </Form>
        <button className="resetBtn btn" onClick={(e) => resetClicked(e)}>
            Already a member? Sign in here.
        </button>
      </div>
    );
}

export default Signup;







// import React from "react";
// import "./Signup.css";

// function Signup(props) {
//   return (
//     <form className="register">
//       <p>REGISTER</p>

//       <a href="/login">Already a member? Login here</a>
//       <div className="field">
//         <label>Username</label>
//         <input type="text" placeholder="Username" />
//       </div>

//       <div className="field">
//         <label>password</label>
//         <input type="password" placeholder="password" />
//       </div>

//       <div className="field">
//         <label>First Name</label>
//         <input type="text" placeholder="First Name" />
//       </div>

//       <div className="field">
//         <label>Last Name</label>
//         <input type="text" placeholder="Last Name" />
//       </div>

//       <div className="field">
//         <label>Gender</label>
//         {/* <input type="text" placeholder="Gender" /> */}
//         <select>
//           <option value="choose">choose one</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="others">Others</option>
//         </select>
//       </div>

//       <div className="field">
//         <label>Phone Number</label>
//         <input type="Phone" placeholder="Phone Number" />
//       </div>

//       <div className="field">
//         <label>Email</label>
//         <input type="Email" placeholder="Email" />
//       </div>

//       <div className="field">
//         <label>Street Address</label>
//         <input type="Street" placeholder="Street Address" />
//       </div>

//       <div className="field">
//         <label>City</label>
//         <input type="City" placeholder="City" />
//       </div>

//       <div className="field">
//         <label>State</label>
//         <input type="State" placeholder="State" />
//       </div>

//       <div className="field">
//         <label>Zipcode</label>
//         <input type="Zipcode" placeholder="Zipcode" />
//       </div>

//       <button className="field btn" type="submit">
//         Register
//       </button>
//     </form>
//   );
// }

// export default Signup;