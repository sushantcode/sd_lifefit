/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFitbitTokens = /* GraphQL */ `
  query GetFitbitTokens($id: ID!) {
    getFitbitTokens(id: $id) {
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
export const listFitbitTokenss = /* GraphQL */ `
  query ListFitbitTokenss(
    $filter: ModelFitbitTokensFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFitbitTokenss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncFitbitTokens = /* GraphQL */ `
  query SyncFitbitTokens(
    $filter: ModelFitbitTokensFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncFitbitTokens(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUserDetails = /* GraphQL */ `
  query GetUserDetails($id: ID!) {
    getUserDetails(id: $id) {
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
export const listUserDetailss = /* GraphQL */ `
  query ListUserDetailss(
    $filter: ModelUserDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserDetailss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUserDetails = /* GraphQL */ `
  query SyncUserDetails(
    $filter: ModelUserDetailsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserDetails(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;