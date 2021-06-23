import React, {useState, useEffect} from 'react';

const FitbitGetData = (props) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  var access_token = props.access_token;
  var refresh_token = props.refresh_token;
  var expires_in = props.expires_in;
  var user_id = props.user_id;
  var token_type = props.token_type;

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
          setItems(result);
        },
        err => {
          setIsLoaded(true);
          setError(err);
        })
        .catch (err => {
          setIsLoaded(true);
          setError(err);
        })
    }
  }, [endpointURL, access_token])
  
  return (
    <div>
      <p>
        {JSON.stringify(items)}
      </p>
    </div>
  )
}

export default FitbitGetData;
