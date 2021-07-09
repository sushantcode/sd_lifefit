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
import './ResetPassword.css';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
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

  async submitForm(e) {
    e.preventDefault();
    // Collect confirmation code and new password, then
    await Auth.forgotPasswordSubmit(this.state.username, this.state.code, this.state.password)
    .then(() => alert("Password Reseted Successfully!"))
    .catch(err => alert(err.message));
  }

  render() {
    const { username, code, password } = this.state;

    return (
      <div className="reset">
        <h2>Reset Password</h2>
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
          <FormGroup className="code">
            <Label for="code">Code</Label>
            <Input
              type="text"
              name="code"
              id="code"
              placeholder="Type the code sent in email."
              value={code}
              onChange={(e) => this.handleChange(e)}
            />
          </FormGroup>
          <FormGroup className="password">
            <Label for="password">New Password</Label>
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
      </div>
    );
  }
}

export default ResetPassword;