import React from 'react'

const FitbitAuthentication = ({history}) => {
  const url = history.location.pathname;
  var uid = url.split("/")[2];
  var valid_user = true;
  // if (uid) {
  //   // Make call to DynamoDb to check if the UID exists, 
  //   // otherwise return returns
  //   // if (uid in database) { valid_user = true};
  //   valid_user = true;
  // }

  if (valid_user) {
    return (
      <div>
        <button>
          <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23B8HB&redirect_uri=https://lifefitapp-19fa8.web.app/fitbitcallback&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight">
          Login to Fitbit
          </a>
      </button>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>Not a Valid User, Please Sign in and try again!</h2>
      </div>
    )
  }
}

export default FitbitAuthentication
