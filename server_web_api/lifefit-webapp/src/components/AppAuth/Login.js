import Auth from '@aws-amplify/auth';
import { Component } from 'react';
import {
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Label,
  Input,
  Button,
} from 'reactstrap';
import './Login.css';
import { NavItem, NavLink } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoggedIn: false,
      resetPassword: false,
      validate: {
        emailState: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  // validateEmail(e) {
  //   const emailRex =
  //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //   const { validate } = this.state;

  //   if (emailRex.test(e.target.value)) {
  //     validate.emailState = 'has-success';
  //   } else {
  //     validate.emailState = 'has-danger';
  //   }

  //   this.setState({ validate });
  // }

  async submitForm(e) {
    e.preventDefault();
    try{
      await Auth.signIn(this.state.username, this.state.password);
      alert("Logged in successfully!");
      this.setState({
        isLoggedIn: true
      })
    }
    catch (error) {
      e.target.reset();
      alert(error.message);
    }
    this.setState({
      username: "",
      password: ""
    })
  }

  async resetClicked(e) {
    e.preventDefault();
    if (this.state.username !== "") {
      // Send confirmation code to user's email
      Auth.forgotPassword(this.state.username)
      .then(() => {
        this.setState({
          resetPassword: true
        })
      })
      .catch(err => alert(err.message));
    }
    else {
      alert("Must provide the username.")
    }
  }

  render() {
    const { username, password, resetPassword, isLoggedIn } = this.state;

    if (resetPassword) {
      return (
        <Redirect to="/resetpassword" />
      )
    }

    if (isLoggedIn) {
      return (
        <Redirect to="/dashboard" />
      )
    }
    return (
      <div className="login">
        
        <h2>Sign In</h2>
        <Form className="form" onSubmit={(e) => this.submitForm(e)}>
          <FormGroup className="username">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Your Username"
              // valid={this.state.validate.emailState === "has-success"}
              // invalid={this.state.validate.emailState === "has-danger"}
              value={username}
              onChange={(e) => {
                // this.validateEmail(e);
                this.handleChange(e);
              }}
            />
          </FormGroup>
          <FormGroup className="password">
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <div className="resetBtn">
          <button onClick={(e) => this.resetClicked(e)}>Forgot Password?</button>
        </div>
        
      </div>
    );
  }
}

export default Login;