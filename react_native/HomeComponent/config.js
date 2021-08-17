export const config = {
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
        tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
        revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
      },
     clientSecret: 'aea53919e7de0f0ded7e30ea9fa2180b',
    clientId: '22C2J2',
    redirectUrl: 'com.lifefitapp://fitbit',
    scopes: ['heartrate', 'activity', 'activity' , 'profile' , 'sleep'],
  };

  