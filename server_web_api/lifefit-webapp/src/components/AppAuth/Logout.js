import Auth from '@aws-amplify/auth';
import { Component } from 'react';
import './ResetPassword.css';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  async logoutHanler(e) {
    e.preventDefault();
    try {
      await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  render() {
    return (
      <button onClick={(e) => this.logoutHanler(e)} className="btn">
        Log-Out
      </button>
    );
  }
}

export default Logout;