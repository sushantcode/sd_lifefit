import Auth from '@aws-amplify/auth';
import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';
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
import ConfirmSignup from './ConfirmSignup';

const Signup = () => {
  const history = useHistory();
  const [fName, setFName] = useState("");
  const [fNameEmpty, setFNameEmpty] = useState(false);
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
  const [user, setUser] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [zipError, setZipError] = useState(false);

  const [submissionError, setSubmissionError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setFNameEmpty(false);
    setLNameEmpty(false);
    setUsernameEmpty(false);
    setPasswordEmpty(false);
    setEmailEmpty(false);
    setPhoneEmpty(false);
    setAddressEmpty(false);
    setCityEmpty(false);
    setStateAbbEmpty(false);
    seZipEmpty(false);
    setGenderEmpty(false);
    setSubmissionError("");
    if (fName === "" || lName === "" || username === "" || email === "" || password === ""
      || phone === "" || address === "" || city === "" || stateAbb === "" || zip === "" || gender === ""
      || emailError || phoneError || passwordError || zipError) {
        validateForm();
    }
    else {
      setLoading(true);
      try{
        const userData = await Auth.signUp({
            username,
            password,
            attributes: {
                email
            }});
        setUser(userData);
        console.log(userData);
        setSuccess(true);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        setSubmissionError(error.message);
        setUsername("");
        setPassword("");
        setFName("");
        setLName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setCity("");
        setStateAbb("");
        setZip("");
        setGender("");
      }
    }
  }

  const redirectToLogin = (e) => {
    e.preventDefault();
    history.push('/login');
  }

  if (success) {
    return (
      <ConfirmSignup
        uid={user.userSub}
        fName={fName}
        lName={lName}
        username={username}
        email={email}
        phone={phone}
        address={address}
        city={city}
        stateAbb={stateAbb}
        zip={zip}
        gender={gender} />
    )
  }
    return (
      <div className="signup">
        <h2 className="text-center signup-header p-3 text-light rounded-2">Sign up</h2>
        <p className="text-danger">* Must fill all required info.</p>
        <Form className="form" onSubmit={(e) => submitForm(e)}>
          <Row className="name">
            <Col md={6}>
              <FormGroup>
                <Label for="first">First Name*</Label>
                <Input 
                  type="text" 
                  name="first" 
                  id="first" 
                  placeholder="Sushant"
                  invalid={fNameEmpty}
                  value={fName}
                  onChange={(e) => setFName(e.target.value)} />
                  {fNameEmpty && 
                  <FormFeedback invalid="true">
                    First cannot be empty.
                  </FormFeedback>}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="last">Last Name*</Label>
                <Input 
                  type="text" 
                  name="last" 
                  id="last" 
                  placeholder="Gupta"
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
              {addressEmpty && 
                <FormFeedback invalid="true">
                  Address cannot be empty.
                </FormFeedback>}
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
                  {cityEmpty && 
                  <FormFeedback invalid="true">
                    City cannot be empty.
                  </FormFeedback>}
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
              {stateAbbEmpty && 
                <FormFeedback invalid="true">
                 Must select a state.
                </FormFeedback>}
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
                      {genderEmpty && 
                        <FormFeedback invalid="true">
                          Gender must be selected.
                        </FormFeedback>}
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
              className="submitBtn bg-danger"
              disabled={loading}
              >
                Submit {" "} {loading && 
                <i class="fas fa-cog fa-spin" />}
              </Button>
              {(submissionError !== "") && 
              !fNameEmpty && !lNameEmpty && !usernameEmpty && !emailEmpty && !passwordEmpty
                && !phoneEmpty && !addressEmpty && !stateAbbEmpty && !zipEmpty && !genderEmpty
                && !emailError && !phoneError && !zipError &&
              <Alert color="danger">
                {submissionError}
              </Alert>
              }
          </FormGroup>
        </Form>
        <button className="resetBtn btn text-danger" onClick={(e) => redirectToLogin(e)}>
            Already a member? Sign in here.
        </button>
      </div>
    );
}

export default Signup;