export const config = {
    serviceConfiguration: {
        authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
        tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
        revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
      },
     clientSecret: 'xxxxxxxxxxxxxxxxxxxxxxxx',
    clientId: 'xxxxx',
    redirectUrl: 'com.lifefitapp://fitbit',
    scopes: ['heartrate', 'activity', 'activity' , 'profile' , 'sleep'],
  };

  
