import React, {useState, useEffect} from 'react';
import FitbitAddTokens from './FitbitAddTokens';

const FitbitCallback = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  //get the url 
  var callbackUrl = window.location.href;
  const code = callbackUrl.split("#")[0].split("=")[1];
  var endpointURL = 'https://api.fitbit.com/oauth2/token';
  var params = 'client_id=23B8HB' + 
                '&grant_type=authorization_code&' + 
                'redirect_uri=https://lifefitapp-19fa8.web.app/fitbitcallback' + 
                '&code=' + code;
  endpointURL = endpointURL + '?' + params;
  var client_id = '23B8HB';
  var client_secret = '6f49618da8da741629d35f179eae8eca';
  var encoded = window.btoa(client_id + ':' + client_secret);
  useEffect(() => {
    fetch(
      endpointURL, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + encoded,
          'Content-Type': 'application/x-www-form-urlencoded'
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
  }, []);
  
  if (error) {
    return (
      <h1>
        {error.message}
      </h1>
    )
  } 
  else if (!isLoaded) {
    return (
      <h1>
        Authorization is loading...
      </h1>
    )
  }
  else {
    return (
      <FitbitAddTokens err={false} 
      access_token={items.access_token} 
      refresh_token={items.refresh_token} 
      expires_in={items.expires_in} 
      user_id={items.user_id} />
      )
  }
}

export default FitbitCallback;
