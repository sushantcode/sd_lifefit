import React, {useState, useEffect} from 'react';
import FitbitAddAge from './FitbitAddAge';

const FitbitGetData = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [age, setAge] = useState(0);

  var access_token = props.accessToken;
  var user_id = props.userId;

  var endpointURL = "https://api.fitbit.com/1/user/" + user_id + "/profile.json";

  useEffect(() => {
    if (access_token && user_id) {
      fetch(
        endpointURL, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + access_token
          }
        })
        .then(response => response.json())
        .then(result => {
          setIsLoaded(true);
          setAge(result.user.age);
        },
        err => {
          setIsLoaded(true);
          setError(err);
        })
        .catch (err => {
          setIsLoaded(true);
          setError(err);
        });
    }
  }, [endpointURL, access_token, user_id])

  if (error) {
    return (
      <div>
        <p>
          Error: {JSON.stringify(error)}
        </p>
      </div>
    )
  }
  else if (!isLoaded) {
    return (
      <h1>
        User Data is loading...
      </h1>
    )
  }
  else {
    return (
      <FitbitAddAge
      age={age} />
      // <div>
      //   <p>
      //   Success : Your Fitbit Profile is : <br />
      //   {age}
      //   </p>
      // </div>
    )
  }
  
}

export default FitbitGetData;
