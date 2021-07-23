import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import FitbitGetData from './FitbitGetData';

const FitbitAddTokens = (props) => {
  
  const [error, setError] = useState(null);
  const [access, setAccess] = useState("");
  const [userId, setUserId] = useState("");
  var uid = props.id;

  var access_token = props.access_token;
  var refresh_token = props.refresh_token;
  var expires_in = props.expires_in;
  var user_id = props.user_id;

  const newToken = {
      id: uid,
      access_token: access_token,
      refresh_token: refresh_token,
      user_id: user_id,
      expires_in: expires_in
  }

  useEffect(() => {
    if (newToken.id && newToken.access_token && newToken.refresh_token && newToken.user_id && newToken.expires_in) {
      setAccess(access_token);
      setUserId(user_id);
      addTokens();
    }  
  }, [newToken.id, newToken.access_token, newToken.refresh_token, newToken.user_id, newToken.expires_in]);

  async function addTokens() {
	  try {
      const addFitbitToken = await API.graphql({ query: mutations.createFitbitTokens, variables: {input: newToken}});
	  }
	  catch (err) {
		  setError(err);
	  }
  }

  if (error && error.errors[0].errorType !== "DeltaSyncWriteError") {
    return (
      <div>
        <p>
          Error: {JSON.stringify(error)}
        </p>
      </div>
    )
  }
  else {
    return (
      <FitbitGetData
      accessToken={access} 
      userId={userId}
      id = {uid} />
      )
  }
  
}

export default FitbitAddTokens;
