import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
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

  /* Uncomment these lines of codes ........ */

  const [score, setScore] = useState(0);
  const [steps_value, setSteps] = useState("0");
  const [miles_value, setMiles] = useState("0");
  const [calories_value, setCalories] = useState("0");
  const [heart_value, setHrate] = useState("0");
  const [sleeps_value, setSleeps] = useState("0");
  const [active_value, setActive] = useState("0");

  /* B...................ackend for the score retrieval..............................*/

  // useEffect(() => { 
  //   Auth.currentUserInfo()
  //   .then((data) => {
  //     if (data){
  //       setId(data.attributes.sub);
  //     }
  //   });
  //   if (id !== "") {
  //     doQuerry(id);
  //   }
  //   console.log("user")
  //   doQuerry(id)
  // }, [id])

  // async function doQuerry(id) {
  //   console.log(id);
  //   const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: id}});
  //   if (userDetails.data.getUserDetails) {
  //     console.log(userDetails.data.getUserDetails.score);
  //     setScore(userDetails.data.getUserDetails.score)
  //   }
  //   else {
  //     console.log("Error occured while querrying for score.")
  //   }
  // }
  

  /* ...................Backend for the S3 bucket data importation...... */

  ////---- To get Daily Total data

  // useEffect(() => {
  //   fetch("/getDailyTotal/" + "Date_" + yesterdayStr + "_User_id_" + id + "_hourlydata.csv", {
  //     method: "GET"
  //   })
  //   .then(data => data.json())
  //   .then(result => {
  //     setCalories(result.DailyCalories < 0.5 ? "0" : Math.round(result.DailyCalories).toString());
  //     setActive(result.ActiveMinutes < 0.5 ? "0" : Math.round(result.ActiveMinutes).toString());
  //     setHrate(result.DailyHeartRate < 0.5 ? "0" : Math.round(result.DailyHeartRate).toString());
  //     setMiles(result.DailyDistance < 0.5 ? "0" : Math.round(result.DailyDistance).toString());
  //     setSteps(result.DailySteps < 0.5 ? "0" : Math.round(result.DailySteps).toString());
  //   })
  //   .catch(err => console.log(err))
  // }, []);

  ///// ------- to get daily summary

  // useEffect(() => {
  //   fetch("/getFitbitSummary/" + "Date_" + yesterdayStr + "_User_id_" + id + "_fitbitdata.csv", {
  //     method: "GET"
  //   })
  //   .then(data => data.json())
  //   .then(result => {
  //     setSleeps(result.SleepData < 0.5 ? 0 : Math.round(result.SleepData).toString());
  //   })
  //   .catch(err => console.log(err))
  // }, []);


  /* ...............Frontend/UI Variables............ .... */
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

  
  /*
    Data block for graphs
    
  */

   // Calories data 
   var calories_json = {
      labels: ['12 AM','1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
      '12 PM','1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
      datasets: [{
        label: 'Calories',
        data: [68.57024002075195, 69.47248077392578, 73.53256034851074, 72.74309730529785, 72.63031959533691,
           71.05140113830566, 76.91596031188965, 125.97525787353516, 92.02847862243652, 86.50226211547852,
            87.51728057861328, 88.87063980102539, 86.61503982543945, 118.53178215026855, 89.43453979492188, 
            67.66799926757812, 67.66799926757812, 173.23008346557617, 263.6796417236328, 264.46910095214844, 282.401123046875, 
            210.67303657531738, 85.82558059692383, 61.4650993347168],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        fill: true
      }]
   }

   //Steps data
   var steps_json =  {
    labels: ['12 AM','1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
    '12 PM','1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
    datasets: [{
      label: 'Steps',
      data: [0, 0, 19, 0, 6, 0, 27, 417, 141, 55, 124, 59, 42, 359, 51, 0, 0, 1088, 2008, 505, 1348, 359, 0, 15],
      backgroundColor:[        
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ] ,
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true
    }]
 }

 //Heart-rate data
 var heartrate_json =  {
  labels: ['12 AM','1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM',
  '12 PM','1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
  datasets: [{
    label: 'Heart Rate',
    data:[74.25, 78.25, 78.5, 79.0, 79.0, 79.0, 77.75, 91.75, 81.5, 79.25, 78.25, 83.0, 
      81.75, 86.25, 63.0, 0.0, 0.0, 97.0, 105.25, 115.5, 111.25, 111.75, 102.25, 48.0] ,
    backgroundColor:[      
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
    ] ,
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1,
    fill: true
  }]
}
  
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
        <div className="graph">
          <Line
              data = {steps_json}
              height = {400}
              width = {600}
              options ={{
                maintainAspectRatio: false, 
                scales: {
                  y: {
                      beginAtZero: true
                  }
                }
              }}
            />  
        </div>

      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Calories
        </div>
        <div className="graph">   
               
          <Line
            data = {calories_json}
            height = {400}
            width = {600}
            options ={{
              maintainAspectRatio: false, 
              scales: {
                y: {
                    beginAtZero: true
                }
              }
            }}
          />  
           
        </div>
      </div>
      <div className="row shadow-sm p-3 mb-5 bg-body rounded">
        <div className="col">
          Graphical representation of Heart rate
        </div>

        <div className="graph">                 
               <Line
                 data = {heartrate_json}
                 height = {400}
                 width = {600}
                 options ={{
                   maintainAspectRatio: false, 
                   scales: {
                     y: {
                         beginAtZero: true
                     }
                   }
                 }}
               />  
                
             </div>
      </div>
    </div>
  )
}

export default Dashboard;
