import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import ProgressBar from '../appUtils/ProgressBar';
import 'react-circular-progressbar/dist/styles.css';
import { Auth, API } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import TextField from '@material-ui/core/TextField';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';
import CaloriesChart from './CaloriesChart';
import StepsChart from './StepsChart';
import MilesChart from './MilesChart';
import HeartRateChart from './HeartRateChart';
import SleepChart from './SleepChart';
import ScoreChart from './ScoreChart';

const Dashboard = () => {
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate()-1);
  var curr_date = yesterday.toDateString();
  var yesterdayList = yesterday.toLocaleDateString("en-US", {year: "numeric", month: "2-digit", day: "2-digit"}).split("/");
  var yesterdayStr = yesterdayList[2] + "-" + yesterdayList[0] + "-" + yesterdayList[1];
  const [dateInput, setDateInput] = useState(yesterdayStr);
  const [id, setId] = useState("");
  const [score, setScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [steps_value, setSteps] = useState("0");
  const [miles_value, setMiles] = useState("0");
  const [calories_value, setCalories] = useState("0");
  const [heart_value, setHrate] = useState("0");
  const [sleeps_value, setSleeps] = useState(0);
  const [active_value, setActive] = useState(0);


  const hrDefault = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const [hrCalories, setHrCalories] = useState(hrDefault);

  const [hrSteps, setHrSteps] = useState(hrDefault);

  const [hrMiles, setHrMiles] = useState(hrDefault);

  const [hrHeartRate, setHrHeartRate] = useState(hrDefault);

  const [sleepData, setSleepData] = useState([0, 0, 0, 0, 0, 0]);

  const [scoreHistory, setScoreHistory] = useState({"score": [0], "date": ["YYYY-MM-DD"]});


  /* --------------------- Dummy Data for test purpose -------------------------------------- */

  // const [hrCalories, setHrCalories] = useState([68.57024002075195, 69.47248077392578, 73.53256034851074, 72.74309730529785, 72.63031959533691,
  //   71.05140113830566, 76.91596031188965, 125.97525787353516, 92.02847862243652, 86.50226211547852,
  //    87.51728057861328, 88.87063980102539, 86.61503982543945, 118.53178215026855, 89.43453979492188, 
  //    67.66799926757812, 67.66799926757812, 173.23008346557617, 263.6796417236328, 264.46910095214844, 282.401123046875, 
  //    210.67303657531738, 85.82558059692383, 61.4650993347168]);

  // const [hrSteps, setHrSteps] = useState([0, 0, 19, 0, 6, 0, 27, 417, 141, 55, 
  //   124, 59, 42, 359, 51, 0, 0, 1088, 2008, 505, 1348, 359, 0, 15]);

  // const [hrMiles, setHrMiles] = useState([0.0, 0.0, 0.0131000000983475, 0.0, 0.0041000000201165, 
  //   0.0, 0.0185000000055878, 0.2887999992817639, 0.0975000001490115, 0.0378999998793004, 0.0858999993652104, 
  //   0.040799999609589396, 0.0289999991655349, 0.24880000483244652, 0.0353999994695186, 0.0, 0.0, 0.7279000207781791, 1.39]);

  // const [hrHeartRate, setHrHeartRate] = useState([74.25, 78.25, 78.5, 79.0, 79.0, 79.0,
  //    77.75, 91.75, 81.5, 79.25, 78.25, 83.0, 
  //   81.75, 86.25, 63.0, 0.0, 0.0, 97.0, 105.25, 115.5, 111.25, 111.75, 102.25, 48.0]);

  // const [sleepData, setSleepData] = useState([52, 234, 89, 55]);

  // const [scoreHistory, setScoreHistory] = useState({"score": [3, 5, 4, 4], "date": ["2021-07-22", "2021-07-23", "2021-07-24", "2021-07-25"]});

  /* useState hook for type of graph selection variable */
  const [graphId, setGraphId] = useState(0);

  /* ----------------------- Backend for the score retrieval ---------------------------------*/

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
    console.log("UserID", id);
    const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: id}});
    if (userDetails.data.getUserDetails) {
      console.log(userDetails.data.getUserDetails.score);
      setScore(userDetails.data.getUserDetails.score)
    }
    else {
      console.log("Error occured while querrying for score.")
    }
  }
  

  /* ----------------------------------- Backend for the S3 bucket data importation ----------------------- */

  /* ---------- To get Daily Total data ------------------- */
  useEffect(() => {
    fetch("/getDailyTotal/" + id + "/" + dateInput, {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      if (result) {
        setCalories(result.DailyCalories < 0.5 ? "0" : Number.parseFloat(result.DailyCalories).toFixed(1).toString());
        setActive(result.ActiveMinutes < 0.5 ? 0 : Math.round(result.ActiveMinutes));
        setHrate(result.DailyHeartRate < 0.5 ? "0" : Math.round(result.DailyHeartRate).toString());
        setMiles(result.DailyDistance < 0.5 ? "0" : Number.parseFloat(result.DailyDistance).toFixed(1).toString());
        setSteps(result.DailySteps < 0.5 ? "0" : Math.round(result.DailySteps).toString());
        setSleeps(result.SleepData < 0.5 ? 0 : Math.round(result.SleepData))
      }
    })
    .catch(err => console.log(err))
  }, [id, dateInput]);

  /* -------- To get data for graph ---------------------- */
  useEffect(() => {
    fetch("/getGraphData/" + id + "/" + dateInput, {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      if (result) {
        setHrCalories(result.hourlyCalories);
        setHrHeartRate(result.hourlyHeartRate);
        setHrMiles(result.hourlyDistance );
        setHrSteps(result.hourlySteps);
      }
      console.log("Hr Calories: ", hrCalories);
      console.log("Hr Heart Rate: ", hrHeartRate);
      console.log("Hr Miles: ", hrMiles);
      console.log("Hr Steps: ", hrSteps);
    })
    .catch(err => console.log(err))
  }, [id, dateInput]);

  /* -------- To get data for graph ---------------------- */
  useEffect(() => {
    fetch("/getSleepsData/" + id + "/" + dateInput, {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      if (result) {
        setSleepData([result.totalWakeMin, result.totalLightMin, result.totalDeepMin, result.totalRemMin, result.totalAsleepMin, result.totalRestlessMin]);
      }
      console.log("Sleeps Data: ", sleepData);
    })
    .catch(err => console.log(err))
  }, [id, dateInput]);

  /* -------- To get score history data ---------------------- */
  useEffect(() => {
    fetch("/getScoreHistory/" + id, {
      method: "GET"
    })
    .then(data => data.json())
    .then(result => {
      if (result) {
        if (result.score !== 0) {
          setOverallScore(result.score);
        }
        setScoreHistory(result.data);
      }
    })
    .catch(err => console.log(err))
  }, [id]);
  

  var text = "";
  var overallText = "";
  var range = "";
  
  var feedback = "";
  var sleep_hour = Math.floor(sleeps_value / 60);
  var sleep_min = sleeps_value % 60;
  var sleeps_text = sleep_hour.toString() + " H " + sleep_min.toString() + " M";

  var active_hour = Math.floor(active_value / 60);
  var active_min = active_value % 60;
  var active_text = active_hour.toString() + " H " + active_min.toString() + " M";

  // Graph UI variables ......................................................
  var labels = ['12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM',
                '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
                '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
                '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'];
  var background = ['rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.7)'];
  var borderColor = ['rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)']


  var sleep_labels = ['Wake', 'Light', 'Deep', 'Rem', 'Asleep', 'Restless'];
  // Front-end stuffs .........................................................
  switch (overallScore) {
    case 0:
      range = "Score not available";
      feedback = `Please sync your Fitbit account first and then start wearing 
                  your watch as much as possible`;
      break;

    case 1:
    case 2:
      range = "Poor";
      feedback = `Your score indicates that your health habits need significant imporvement.
                  Please start working out, and have sufficient sleeps during night.
                  Proper diet can also help to improve your score.`;
      break;

    case 3:
    case 4:
      range = "Satisfatory";
      feedback = `Your score is just peaking up. You still need hard work to boost your score
                  to next level. Keep working out while maintaining better diets.`;
      break;

    case 5:
    case 6:
      range = "Good";
      feedback = `This is a good score and it shows your effort on the right track of having 
                  better health. Again, don't forget to have enough calories burnout, as well 
                  as better sleep hours.`;
      break;
    
    case 7:
    case 8:
      range = "Very good";
      feedback = `Impressive!!! You do have very good health score. You can be eligible of great 
                  discounts and perks from Statefarm.`;
      break;

    case 9:
    case 10:
      range = "Excellent";
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

  if (overallScore === 0) {
    overallText = "N/A";
  }
  else {
    overallText = overallScore.toString() + "/10";
  }

  return (
    <div className="container">
      <div className="row mb-4 align-items-center">
        <div className="col-md-4 fs-6 mb-2">
          <div className="row pt-2 text-center">
              <div className="col">
                <p className="fw-bold">
                  Your score on <span className="text-danger">{curr_date}</span>
                  {" ["}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    data-bs-toggle="modal" 
                    data-bs-target="#dailyScoreInfo" 
                  >
                    <i class="fas fa-info-circle"></i>
                  </button>
                  {"]"}
                </p>
              </div>
          </div>
          <div className="row">
            <div className="col d-flex flex-col justify-content-center">
              <div style={{ width: 150, height: 150 }}>
              <ProgressBar
                background={true} 
                value={score} 
                text={text} 
                minValue={0} 
                maxValue={10}
                startColor="#d60000"
                endColor="#00ff00"
                gradientId="progress"
              />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 rounded-2 p-3 mb-4 mt-4 border-start border-end">
          <div className="row pt-2 text-center">
              <div className="col">
                <p className="fw-bold fs-5">
                  As of today, <span className="text-danger">Your Overall Score </span> 
                  <span className="fs-6">
                  {" ["}
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    data-bs-toggle="modal" 
                    data-bs-target="#overallScoreInfo" 
                  >
                    <i class="fas fa-info-circle"></i>
                  </button>
                  {"]"}
                  </span> 
                </p>
              </div>
          </div>
          <div className="row pb-4">
            <div className="col d-flex justify-content-center" 
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="Click to view day-to-day score history"
            >
              <div style={{ width: 180, height: 180 }}
                  type="button"
                  data-bs-toggle="modal" 
                  data-bs-target="#scoreHistory">
              <ProgressBar
                background={true} 
                value={overallScore} 
                text={overallText} 
                minValue={0} 
                maxValue={10}
                startColor="#d60000"
                endColor="#00ff00"
                gradientId="progress"
              />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 pt-4">
          <div className="mx-auto" style={{maxWidth: 800}}>
            <h5 className={overallScore === 0 || 1 || 2 ? "header text-center text-danger" : "header text-center text-info"}>
              {range}{" "}!!!
            </h5>
            <div className="body text-center">
              <p className={
                overallScore === 0 || 1 || 2 ? "text-danger" : "text-info"
              }>
                {feedback}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row shadow mb-5 pb-4 pt-4 bg-body rounded text-light row-middle">
        <div className="col text-center">
          <div className="row pt-2">
            <div className="col">
              <p className="fw-bold">
                Your Individual Categorical Health Status for
                <TextField
                  id="date"
                  type="date"
                  defaultValue={dateInput}
                  className="ms-2 bg-light ps-2"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(event) => {
                    setDateInput(event.target.value);
                    }
                  }
                /> <br /><br />
                (Click each category to view details)
              </p>
            </div>
          </div>
          <div className="row pt-2">
            <div className="col-md-2 steps" onClick={() => setGraphId(0)}>
              <div className={`border border-3 rounded-3 m-1 ${graphId === 0? "border-light  border-5" : "border-secondary  border-3"}`}>
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }}>
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
                            fill: 'white',
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

            <div className="col-md-2 miles" onClick={() => setGraphId(1)}>
              <div className={`border border-3 rounded-3 m-1 ${graphId === 1? "border-light  border-5" : "border-secondary  border-3"}`}>
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }}>
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
                            fill: 'white',
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

            <div className="col-md-2 calories" onClick={() => setGraphId(2)}>
              <div className={`border border-3 rounded-3 m-1 ${graphId === 2? "border-light  border-5" : "border-secondary  border-3"}`}>
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }}>
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
                            fill: 'white',
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

            <div className="col-md-2 heart-rate" onClick={() => setGraphId(3)}>
              <div className={`border rounded-3 m-1 ${graphId === 3? "border-light  border-5" : "border-secondary  border-3"}`}>
                <div className="row pt-3">
                  <div className="col d-flex justify-content-center">
                    <div style={{ width: 100, height: 100 }}>
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
                            fill: 'white',
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

            <div className="col-md-2 sleeps" onClick={() => setGraphId(4)}>
              <div className={`border rounded-3 m-1 ${graphId === 4? "border-light  border-5" : "border-secondary  border-3"}`}>
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
                            fill: 'white',
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
                            fill: 'white',
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
          {graphId === 0 && <StepsChart label={labels} data={hrSteps} background={background} borderColor={borderColor} />}
          {graphId === 1 && <MilesChart label={labels} data={hrMiles} background={background} borderColor={borderColor} />}
          {graphId === 2 && <CaloriesChart label={labels} data={hrCalories} background={background} borderColor={borderColor} />}
          {graphId === 3 && <HeartRateChart label={labels} data={hrHeartRate} background={background} borderColor={borderColor} />}
          {graphId === 4 && <SleepChart label={sleep_labels} data={sleepData} background={background} borderColor={borderColor} />}
        </div>
      </div>
      <div className="modal fade" id="scoreHistory" tabindex="-1" aria-labelledby="scoreHistoryLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="scoreHistoryLabel">Score History</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ScoreChart label={scoreHistory.dates} data={scoreHistory.scores} background={background} borderColor={borderColor} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="dailyScoreInfo" tabindex="-1" aria-labelledby="dailyScoreInfoLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="dailyScoreInfoLabel">What is daily score?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                This score is calculated based on the health data generated on the specific date mentioned above the 
                chart. The date is usually the last day our system receives your data from Fitbit watch. This data is 
                used to calculate your overal score over a period of time.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="overallScoreInfo" tabindex="-1" aria-labelledby="overallScoreInfoLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="overallScoreInfoLabel">What is overall score?</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>
                This is your overall score that is calculated using your daily score over a period of time. This is the 
                actual score that is considered while quoting your health and/or life insurance from State Farm. If you feel
                you have got enough score to have better quote, please message our agent to discussion more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
