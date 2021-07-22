import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Auth, API, Storage } from 'aws-amplify';
import * as queries from '../../graphql/queries';

const Dashboard = () => {
  var today = new Date();
  var curr_date = today.toDateString();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate()-1);
  var yesterdayList = yesterday.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/");
  var yesterdayStr = yesterdayList[2] + "-" + yesterdayList[0] + "-" + yesterdayList[1];
  const [id, setId] = useState("2cb32af6-acd1-43e1-91fe-db8e3b695ff5");
  const [score, setScore] = useState(0);
  const [steps_value, setSteps] = useState(0);
  const [miles_value, setMiles] = useState(0);
  const [calories_value, setCalories] = useState(0);
  const [heart_value, setHrate] = useState(0);
  const [sleeps_value, setSleeps] = useState(0);
  const [active_value, setActive] = useState(0);
  ////Backend for the score retrieval..............................

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
    doQuerry(id)
  }, [id])

  async function doQuerry(id) {
    console.log(id);
    const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: id}});
    if (userDetails.data.getUserDetails) {
      console.log(userDetails.data.getUserDetails.score);
      setScore(userDetails.data.getUserDetails.score)
    }
    else {
      console.log("Error occured while querrying for score.")
    }
  }
  

  //// Backend for the S3 bucket data importation

  //---- To get Daily Total data
  useEffect(() => {
    fetch("http://ec2-3-19-30-128.us-east-2.compute.amazonaws.com:5000/getDailyTotal/" + "Date_" + yesterdayStr + "_User_id_" + id + "_hourlydata.csv", {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      setCalories(result.DailyCalories < 0.5 ? 0 : Math.round(result.DailyCalories));
      setActive(result.ActiveMinutes < 0.5 ? 0 : Math.round(result.ActiveMinutes));
      setHrate(result.DailyHeartRate < 0.5 ? 0 : Math.round(result.DailyHeartRate));
      setMiles(result.DailyDistance < 0.5 ? 0 : Math.round(result.DailyDistance));
      setSteps(result.DailySteps < 0.5 ? 0 : Math.round(result.DailySteps));
    })
    .catch(err => console.log(err))
  }, []);

  // ------- to get daily summary

  useEffect(() => {
    fetch("/getFitbitSummary/" + "Date_" + yesterdayStr + "_User_id_" + id + "_fitbitdata.csv", {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      setSleeps(result.SleepData < 0.5 ? 0 : Math.round(result.SleepData));
    })
    .catch(err => console.log(err))
  }, []);
  

  var text = "";
  var range = "";
  var pathColor = "";
  
  var feedback = "";
  var sleep_hour = Math.floor(sleeps_value / 60);
  var sleep_min = sleeps_value % 60;
  var sleeps_text = sleep_hour.toString() + " Hr " + sleep_min.toString() + " Mn";

  var active_hour = Math.floor(active_value / 60);
  var active_min = active_value % 60;
  var active_text = active_hour.toString() + " Hr " + active_min.toString() + " Mn";
  

  // Front-end stuffs .........................................................
  switch (score) {
    case 0:
      range = "Score not available";
      pathColor = "rgba(204, 0, 0, 1)";
      feedback = `Please sync your Fitbit account first and then start wearing 
                  your watch as much as possible`;
      break;

    case 1:
    case 2:
      range = "Poor";
      pathColor = "rgba(204, 0, 0, 1)";
      feedback = `Your score indicates that your health habits need significant imporvement.
                  Please start working out, and have sufficient sleeps during night.
                  Proper diet can also help to improve your score.`;
      break;

    case 3:
    case 4:
      range = "Satisfatory";
      pathColor = "rgba(204, 0, 0, 0.5)";
      feedback = `Your score is just peaking up. You still need hard work to boost your score
                  to next level. Keep working out while maintaining better diets.`;
      break;

    case 5:
    case 6:
      range = "Good";
      pathColor = "rgba(139, 240, 96, 0.5)";
      feedback = `This is a good score and it shows your effort on the right track of having 
                  better health. Again, don't forget to have enough calories burnout, as well 
                  as better sleep hours.`;
      break;
    
    case 7:
    case 8:
      range = "Very good";
      pathColor = "rgba(139, 240, 96, 1)";
      feedback = `Impressive!!! You do have very good health score. You can be eligible of great 
                  discounts and perks from Statefarm.`;
      break;

    case 9:
    case 10:
      range = "Excellent";
      pathColor = "rgba(3, 145, 31, 1)";
      feedback = `Excellent!!! This is just amazing. It's now time to get off of your hard works 
                  to achieve this great score. Please contact our agent to learn detail about it.`;
      break;
  
    default:
      break;
  }

  if (score === 0) {
    text = "N/A";
  }
  else {
    text = score.toString() + "/10";
  }

  return (
    <div className="container">
      <div className="row shadow-lg p-3 mb-2 bg-body rounded">
        <div className="col-md-4 fs-6 mb-2">
          <div className="row pt-2 text-center">
              <div className="col">
                <p className="fw-bold">
                  As of {curr_date}, your score is:
                </p>
              </div>
          </div>
          <div className="row pt-2">
            <div className="col d-flex justify-content-center">
              <div style={{ width: 180, height: 180 }}>
              <CircularProgressbar 
              background={true} 
              value={score} 
              text={text} 
              minValue={0} 
              maxValue={10}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: pathColor,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'round',
                  // Customize transition animation
                  transition: 'stroke-dashoffset 0.5s ease 0s',
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: '#b1b3af',
                },
                // Customize the text
                text: {
                  // Text color
                  fill: '#2e2b2b',
                  // Text size
                  fontSize: '16px',
                  fontWeight: 'bold'
                },
                background: {
                  fill: "rgba(237, 225, 230, 0.3)",
                },
              }} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 pt-4">
          <div className="card mx-auto" style={{maxWidth: 800}}>
            <h5 className="card-header text-center bg-info">
              What does your score says?
            </h5>
            <div className="card-body text-center">
              <p className="card-text">
                {feedback}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row shadow mb-5 pb-4 bg-body rounded">
        <div className="col text-center">
          <div className="row pt-2">
            <div className="col">
              <p className="fw-bold">
                Your Latest Individual Categorical Health Status: <br />
                (Click each category to view history)
              </p>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-md-2 steps">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={steps_value}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#02db4e"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-shoe-prints"></i> Steps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 miles">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={miles_value}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#fce405"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-map-marker-alt"></i> Miles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 calories">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={calories_value}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#1c1533"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-fire"></i> Calories
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 heart-rate">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={heart_value}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#a80303"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-heartbeat"></i> Heart Rate
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 sleeps">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={sleeps_text}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#6146e8"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-bed"></i> Sleeps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 active">
              <div className="border border-secondary border-3 rounded-3 m-1">
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }} >
                      <CircularProgressbar 
                        background={false} 
                        value={0}
                        text={active_text}
                        minValue={0} 
                        maxValue={0}
                        styles={{
                          path: {
                          stroke: "#e9fa2a"},
                          text: {
                            // Text color
                            fill: '#2e2b2b',
                            // Text size
                            fontSize: '16px',
                            fontWeight: 'bold'
                          }
                        }} />
                    </div>
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="col text-center">
                    <p>
                    <i class="fas fa-biking"></i> Active
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Steps
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Calories
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Heart rate
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
