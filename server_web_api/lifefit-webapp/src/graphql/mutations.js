/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFitbitTokens = /* GraphQL */ `
  mutation CreateFitbitTokens(
    $input: CreateFitbitTokensInput!
    $condition: ModelFitbitTokensConditionInput
  ) {
    createFitbitTokens(input: $input, condition: $condition) {
      id
      access_token
      refresh_token
      user_id
      expires_in
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateFitbitTokens = /* GraphQL */ `
  mutation UpdateFitbitTokens(
    $input: UpdateFitbitTokensInput!
    $condition: ModelFitbitTokensConditionInput
  ) {
    updateFitbitTokens(input: $input, condition: $condition) {
      id
      access_token
      refresh_token
      user_id
      expires_in
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteFitbitTokens = /* GraphQL */ `
  mutation DeleteFitbitTokens(
    $input: DeleteFitbitTokensInput!
    $condition: ModelFitbitTokensConditionInput
  ) {
    deleteFitbitTokens(input: $input, condition: $condition) {
      id
      access_token
      refresh_token
      user_id
      expires_in
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createUserDetails = /* GraphQL */ `
  mutation CreateUserDetails(
    $input: CreateUserDetailsInput!
    $condition: ModelUserDetailsConditionInput
  ) {
    createUserDetails(input: $input, condition: $condition) {
      id
      username
      email
      fName
      lName
      phone
      street
      city
      state
      zipcode
      gender
      profile_pic
      age
      score
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateUserDetails = /* GraphQL */ `
  mutation UpdateUserDetails(
    $input: UpdateUserDetailsInput!
    $condition: ModelUserDetailsConditionInput
  ) {
    updateUserDetails(input: $input, condition: $condition) {
      id
      username
      email
      fName
      lName
      phone
      street
      city
      state
      zipcode
      gender
      profile_pic
      age
      score
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserDetails = /* GraphQL */ `
  mutation DeleteUserDetails(
    $input: DeleteUserDetailsInput!
    $condition: ModelUserDetailsConditionInput
  ) {
    deleteUserDetails(input: $input, condition: $condition) {
      id
      username
      email
      fName
      lName
      phone
      street
      city
      state
      zipcode
      gender
      profile_pic
      age
      score
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
