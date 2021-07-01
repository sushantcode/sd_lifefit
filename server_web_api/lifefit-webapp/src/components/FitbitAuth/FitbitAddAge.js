import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';

const FitbitAddAge = (props) => {
  const [error, setError] = useState(null);
  const uid_sushant = "2cb32af6-acd1-43e1-91fe-db8e3b695ff5";

  const updateUser = {
    id: uid_sushant,
    age: props.age
  }

  useEffect(() => {
    if (props.age) {
      addAge();
    } 
  }, [props.age]);

  async function addAge() {
	  try {
		  const newUserData = await API.graphql({ query: mutations.updateUserDetails, variables: {input: updateUser}});
	  }
	  catch (err) {
		  setError(err);
	  }
  }

  return (
    <div>
      <p>
        Congratulations!!! You have successfully synced your Fitbit watch to our app!!! <br />
        Now, keep wearing your watch all the time and enjoyed the benefit and perks.
      </p>
    </div>
  )
}

export default FitbitAddAge;
