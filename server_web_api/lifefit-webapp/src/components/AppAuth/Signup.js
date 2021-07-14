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
  const [fName, setFName] = useState("");
  const [fNameEmpty, setFNameEmpty] = useState(false);
  const [mName, setMName] = useState("");
  const [lName, setLName] = useState("");
  const [lNameEmpty, setLNameEmpty] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameEmpty, setUsernameEmpty] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [email, setEmail] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneEmpty, setPhoneEmpty] = useState(false);
  const [address, setAddress] = useState("");
  const [addressEmpty, setAddressEmpty] = useState(false);
  const [city, setCity] = useState("");
  const [cityEmpty, setCityEmpty] = useState(false);
  const [stateAbb, setStateAbb] = useState("");
  const [stateAbbEmpty, setStateAbbEmpty] = useState(false);
  const [zip, setZip] = useState("");
  const [zipEmpty, seZipEmpty] = useState(false);
  const [gender, setGender] = useState("");
  const [genderEmpty, setGenderEmpty] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [zipError, setZipError] = useState(false);

  const [submissionError, setSubmissionError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  let states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
  
  states = states.map(item => 
    <option key={item}>
      {item}
    </option>);

  function validateEmail(e) {
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRex.test(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  }

  function validatePassword(e) {
    if (e.target.value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }

  function validatePhone(e) {
    if (e.target.value.length !== 10) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  }

  function validateZip(e) {
    if (e.target.value.length !== 5) {
      setZipError(true);
    } else {
      setZipError(false);
    }
  }
  
  function validateForm() {
    if (fName.length === 0) {
      setFNameEmpty(true);
    }
    if (lName.length === 0) {
      setLNameEmpty(true);
    }
    if (username.length === 0) {
      setUsernameEmpty(true);
    } 
    if (password.length === 0){
      setPasswordEmpty(true);
    }
    if (email.length === 0) {
      setEmailEmpty(true);
    }
    if (phone.length === 0) {
      setPhoneEmpty(true);
    }
    if (address.length === 0) {
      setAddressEmpty(true);
    }
    if (city.length === 0) {
      setCityEmpty(true);
    }
    if (stateAbb.length === 0) {
      setStateAbbEmpty(true);
    }
    if (zip.length === 0) {
      seZipEmpty(true);
    }
    if (gender.length === 0) {
      setGenderEmpty(true);
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setSubmissionError("")
    if (fNameEmpty || lNameEmpty || usernameEmpty || emailEmpty || passwordEmpty
      || phoneEmpty || addressEmpty || stateAbbEmpty || zipEmpty || genderEmpty
      || emailError || phoneError || zipError) {
        setHasError(true);
      }
      else {
        setHasError(false);
      }
    // if (username === '' || password === '') {
    //   validateForm();
    // }
    // else {
    //   setLoading(true);
    //   try{
    //     const user = await Auth.signIn(username, password);
    //     setIsLoggedIn(true);
    //   }
    //   catch (error) {
    //     setLoading(false);
    //     setSubmissionError(error.message);
    //     setUsername("");
    //     setPassword("");
    //   }
    // }
  }

  async function resetClicked(e) {
    e.preventDefault();
    // if (username !== "") {
    //   try {
    //     // Send confirmation code to user's email
    //     await Auth.forgotPassword(username)
    //     .then(() => {
    //       setResetPassword(true);
    //     })
    //     .catch((err) => {
    //       if (err.message === "Username/client id combination not found.") {
    //         setSubmissionError("Username does not exists.")
    //       }
    //       else {
    //         setSubmissionError(err.message);
    //       }
    //     });
    //   }
    //   catch(err) {
    //     setSubmissionError(err.message);
    //   }
      
    // }
    // else {
    //   setUsernameEmpty(true);
    // }
  }

    // if (resetPassword) {
    //   return (
    //     <ResetPassword username={username} />
    //   )
    // }
  console.log("State: ", stateAbb)
  console.log("gender: ", gender)

  if (isLoggedIn) {
    return (
      <Redirect to="/dashboard" />
    )
  }
    return (
      <div className="signup">
        <h2 style={{textAlign: "center"}}>Sign up</h2>
        <p>* Must fill all required info.</p>
        <Form className="form" onSubmit={(e) => submitForm(e)}>
          <Row className="name">
            <Col md={4}>
              <FormGroup>
                <Label for="first">First Name*</Label>
                <Input 
                  type="text" 
                  name="first" 
                  id="first" 
                  placeholder="Jeff"
                  invalid={fNameEmpty}
                  value={fName}
                  onChange={(e) => setFName(e.target.value)} />
                  {fNameEmpty && 
                  <FormFeedback invalid="true">
                    First cannot be empty.
                  </FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="middle">Middle Name</Label>
                <Input 
                  type="text" 
                  name="middle" 
                  id="middle" 
                  placeholder="P."
                  value={mName}
                  onChange={(e) => setMName(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="last">Last Name*</Label>
                <Input 
                  type="text" 
                  name="last" 
                  id="last" 
                  placeholder="Bezos"
                  invalid={lNameEmpty}
                  value={lName}
                  onChange={(e) => setLName(e.target.value)} />
                  {lNameEmpty && 
                  <FormFeedback invalid="true">
                    Last cannot be empty.
                  </FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <Row className="username">
            <Col md={6}>
              <FormGroup>
                <Label for="username">Username*</Label>
                <Input 
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="abcd123"
                  invalid={usernameEmpty}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                  {usernameEmpty && 
                  <FormFeedback invalid="true">
                    Username cannot be empty.
                  </FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="password">Password*</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="********"
                  invalid={passwordEmpty || passwordError}
                  value={password}
                  onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e);
                      }} />
                  {passwordEmpty && 
                  <FormFeedback invalid="true">
                    Password cannot be empty.
                  </FormFeedback>}
                  {passwordError && 
                  <FormFeedback invalid="true">
                    Must be at least 8 characters long.
                  </FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup className="email">
            <Label for="email">Email*</Label>
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="xyz@abc.com"
              invalid={emailEmpty || emailError}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e);
                }} />
              {emailEmpty && 
              <FormFeedback invalid="true">
                Email cannot be empty.
              </FormFeedback>}
              {emailError && 
              <FormFeedback invalid="true">
                Please provide valid email.
              </FormFeedback>}
          </FormGroup>
          <FormGroup className="phone">
            <Label for="phone">Phone Number*</Label>
            <Input 
              type="number" 
              name="phone" 
              id="phone" 
              placeholder="0123456789"
              invalid={phoneEmpty || phoneError}
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                validatePhone(e);
                }} />
              {phoneEmpty && 
              <FormFeedback invalid="true">
                Phone cannot be empty.
              </FormFeedback>}
              {phoneError && 
              <FormFeedback invalid="true">
                Must contain 10 valid digits.
              </FormFeedback>}
          </FormGroup> 
          <FormGroup className="address">
            <Label for="address">Address*</Label>
            <Input 
              type="text" 
              name="address" 
              id="address" 
              placeholder="1234 Main St"
              invalid={addressEmpty}
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </FormGroup>
          <Row className="cityStateZip">
            <Col md={5}>
              <FormGroup>
                <Label for="city">City*</Label>
                <Input 
                  type="text" 
                  name="city" 
                  id="city" 
                  placeholder="Arlington"
                  invalid={cityEmpty}
                  value={city}
                  onChange={(e) => setCity(e.target.value)} />
              </FormGroup>
            </Col>
            <Col md={3}>
            <FormGroup>
              <Label for="state">State*</Label>
              <Input 
                type="select" 
                name="state" 
                id="state"
                invalid={stateAbbEmpty}
                value={stateAbb}
                onChange={(e) => setStateAbb(e.target.value)} >
                {states}
              </Input>
            </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="zip">Zip-code*</Label>
                <Input 
                  type="number" 
                  name="zip" 
                  id="zip" 
                  placeholder="12345"
                  invalid={zipEmpty || zipError}
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                    validateZip(e);
                    }} />
                  {zipEmpty && 
                  <FormFeedback invalid="true">
                    Zip cannot be empty.
                  </FormFeedback>}
                  {zipError && 
                  <FormFeedback invalid="true">
                    Must contain 5 valid digits.
                  </FormFeedback>}
              </FormGroup>  
            </Col>
          </Row>
          <FormGroup tag="fieldset">
            <Label for="gender">Gender*</Label>
            <Row className="cityStateZip">
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input 
                      type="radio" 
                      name="radio1"
                      invalid={genderEmpty}
                      value="Male"
                      onChange={(e) => setGender(e.target.value)} />{' '}
                      Male
                  </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input 
                      type="radio" 
                      name="radio1"
                      invalid={genderEmpty}
                      value="Female"
                      onChange={(e) => setGender(e.target.value)} />{' '}
                      Female
                  </Label>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup check>
                  <Label check>
                    <Input 
                      type="radio" 
                      name="radio1"
                      invalid={genderEmpty}
                      value="Others"
                      onChange={(e) => setGender(e.target.value)} />{' '}
                      Others
                  </Label>
                </FormGroup>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup row>
            <Button 
              className="submitBtn"
              disabled={loading || hasError}
              >
                Submit {" "} {loading && 
                <i class="fas fa-cog fa-spin" />}
              </Button>
              {/* {(submissionError !== "") && 
              (!usernameEmpty) && (!passwordEmpty) &&
              <Alert color="danger">
                {submissionError}
              </Alert>
              } */}
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