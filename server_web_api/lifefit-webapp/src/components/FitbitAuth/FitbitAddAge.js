import React from 'react'

const FitbitAddAge = () => {
  const item = { user: {age: 22}};

  const updateUser = {
    id: uid_sushant,
    age: 24
  }

  const newToken = {
      id: uid_sushant,
      access_token: "hsjkhskjfhskjgfhjsf",
      refresh_token: "sghjdgsj76tdsgdhjs78",
      user_id: "gsdgss",
      expires_in: 2800
  }

  useEffect(() => {
      addAge();
  }, []);

  async function addAge() {
	  try {
		  // const newUserData = await API.graphql({ query: mutations.updateUserDetails, variables: {input: updateUser}});
      const addFitbitToken = await API.graphql({ query: mutations.createFitbitTokens, variables: {input: newToken}});
	  }
	  catch (err) {
		  setError(err);
	  }
  }

  if (error) {
    return (
      <div>
        <p>
          Error: {JSON.stringify(error)}
        </p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>
        Success
        </p>
      </div>
    )
  }
}

export default FitbitAddAge
