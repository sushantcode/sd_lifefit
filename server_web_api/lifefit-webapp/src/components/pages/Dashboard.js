import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

const Dashboard = () => {
  const [id, setId] = useState("");
  useEffect(() => { 
    Auth.currentUserInfo()
    .then((data) => {
      setId(data.id);
    });
  })
  
  return (
    <div>
      <p>
        This is dashboard page.
      </p>
    </div>
  )
}

export default Dashboard;
