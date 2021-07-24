import React from 'react';
import { Line } from 'react-chartjs-2';

const StepsChart = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col">
        <Line 
            data= {{
              labels: props.label,
              datasets: [
                {
                  label: 'Amount of Steps Taken',
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
                  yAxes: [{
                      ticks: {
                        beginAtZero: true,
                      },
                    }]
                }
              }
            } />
        </div>
      </div>
    </div>
  )
}

export default StepsChart
