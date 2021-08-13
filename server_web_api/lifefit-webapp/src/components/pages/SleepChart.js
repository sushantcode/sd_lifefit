import React from 'react';
import { Pie } from 'react-chartjs-2';

const SleepChart = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <div className='header'>
            <h2 className='title text-center'>Sleeping Pattern</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <Pie 
            data= {{
              labels: props.label,
              datasets: [
                {
                  label: 'Sleeping minutes',
                  data: props.data,
                  fill: false,
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

export default SleepChart;
