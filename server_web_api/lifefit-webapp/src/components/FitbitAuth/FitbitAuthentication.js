import React from 'react'
import { Redirect } from 'react-router-dom'
import FitbitCallback from './FitbitCallback'

const FitbitAuthentication = ({history}) => {
  const url = history.location.pathname;
  var uid = url.split("/")[2];
  return (
      <div>
        {uid? <h2>{uid}</h2> : <h2>No User Found</h2>}
      </div>
  )
}

export default FitbitAuthentication
