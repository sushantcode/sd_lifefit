import Auth from '@aws-amplify/auth';
import { Redirect } from '@aws-sdk/client-s3';
import { Component } from 'react';
import './ResetPassword.css';

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedOut: false
    };
  }

  async logoutHanler(e) {
    e.preventDefault();
    try {
      await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
    // this.setState({
    //   isLoggedOut: true
    // });
  }

  render() {
    // const { isLoggedOut } = this.state;
    // if (isLoggedOut) {
    //   return (<Redirect to="/" />)
    // }
    return (
      <div>
        <button onClick={(e) => this.logoutHanler(e)}>
          Log-Out
        </button>
      </div>
    );
  }
}

export default Logout;