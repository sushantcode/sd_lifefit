import React from 'react';
import { Line } from 'react-chartjs-2';

const ScoreChart = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Line 
            data= {{
              labels: props.label,
              datasets: [
                {
                  label: 'Score out of 10',
                  data: props.data,
                  fill: true,
                  backgroundColor: props.background,
                  borderColor: props.borderColor,
                  borderWidth: 1
                },
              ],
            }}
            options= {{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    }
                  }
                ]
              }
            }} />
        </div>
      </div>
    </div>
  )
}

export default ScoreChart;
