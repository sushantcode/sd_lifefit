import React, {useState, useEffect} from 'react';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { Container } from 'reactstrap';
import congrats from '../pages/congrats.gif';

const FitbitAddAge = (props) => {
  const [error, setError] = useState(null);

  const updateUser = {
    id: props.id,
    age: props.age
  }

  useEffect(() => {
    if (props.id && props.age) {
      addAge();
    } 
  }, [props.id, props.age]);

  async function addAge() {
	  try {
		  const newUserData = await API.graphql({ query: mutations.updateUserDetails, variables: {input: updateUser}});
	  }
	  catch (err) {
		  setError(err);
	  }
  }

  return (
    <Container>
      <div class="card" style={{margin: 50}}>
        <img src={congrats} class="card-img-top" alt="congrats" />
        <div class="card-body text-center">
          <p class="card-text">
            Congratulations!!! You have successfully synced your Fitbit watch to our app!!! <br />
            Now, keep wearing your watch all the time and enjoy the benefit and perks.
          </p>
        </div>
      </div>
    </Container>
  )
}

export default FitbitAddAge;
