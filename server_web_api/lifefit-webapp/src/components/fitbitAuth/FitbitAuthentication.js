import React, {useState, useEffect} from 'react';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../graphql/queries';

const FitbitAuthentication = ({history}) => {
  const [isSynced, setIsSynced] = useState(false);
  const [id, setId] = useState("");
  useEffect(() => { 
    Auth.currentUserInfo()
    .then((data) => {
      if (data){
        setId(data.attributes.sub);
      }
    });
    if (id !== "") {
      doQuerry(id);
    }
    console.log("user")
  }, [id])

  async function doQuerry(id) {
    console.log(id);
    const fitbittoken = await API.graphql({ query: queries.getFitbitTokens, variables: {id: id}});
    if (fitbittoken.data.getFitbitTokens) {
      console.log(fitbittoken);
      setIsSynced(true);
    }
    else {
      setIsSynced(false);
    }
  }

  return (
    isSynced?
    <div className="card mx-auto mt-5" style={{maxWidth: 800}}>
      <h4 className="card-header text-center">
        Already Synced to Fitbit!!!
      </h4>
      <div className="card-body text-center">
        <p className="card-text">
          Thank you for being concious about syncing your watch to our app. According to our database
          record, you are already synced to fitbit server. Currently, we have tokens to collect your
          health data from fitbit. <br /><br />
          If you recently revoked permission to our app from Fitbit, please <b>contact our admin</b> to resynced your
          watch.
        </p>
        <a className="btn btn-primary" href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22C2J2&redirect_uri=https://lifefitapp-19fa8.web.app/fitbitcallback&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight">
        Login to Fitbit
        </a>
      </div>
    </div>

    :

    <div className="card mx-auto mt-5" style={{maxWidth: 800}}>
      <h4 className="card-header text-center">
        Are you ready to start saving?
      </h4>
      <div className="card-body text-center">
        <p className="card-text">
          Syncing your fitbit watch to our app meaning you are giving permission to our system to collect your
          health data from Fitbit watch and process it to rate your health score which will be used to determine
          what and how much benefits and perks you will be getting from Statefarm Insurance company. When you're
          ready click the button below.
        </p>
        {/* <a className="btn btn-primary" href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22C2J2&redirect_uri=https://lifefitapp-19fa8.web.app/fitbitcallback&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight">
        Login to Fitbit
        </a> */}
      </div>
    </div>
  )
}

export default FitbitAuthentication
