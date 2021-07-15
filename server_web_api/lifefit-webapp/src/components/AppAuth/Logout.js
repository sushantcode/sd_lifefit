import React, { useState } from 'react';
import {Auth} from 'aws-amplify';
import './ResetPassword.css';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);

  async function logoutHanler(e) {
    e.preventDefault();
      try {
        await Auth.signOut();
        setIsSuccess(true);
      } catch (error) {
          console.log('error signing out: ', error);
      }
  }

  if (isSuccess) {
    setIsSuccess(false);
    history.push('/login');
  }

  return (
    <button onClick={(e) => logoutHanler(e)} className="btn">
      Log-Out
    </button>
  )
}

export default Logout;








// import Auth from 'aws-amplify';
// import { Component } from 'react';
// import './ResetPassword.css';

// class Logout extends Component {
//   constructor(props) {
//     super(props);
//   }

//   async logoutHanler(e) {
//     e.preventDefault();
//     try {
//       await Auth.signOut();

//     } catch (error) {
//         console.log('error signing out: ', error);
//     }
//   }

//   render() {
//     const history = useHistory();

//     return (
//       <button onClick={(e) => this.logoutHanler(e)} className="btn">
//         Log-Out
//       </button>
//     );
//   }
// }

// export default Logout;