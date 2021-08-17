
import React, { Component } from 'react';
import qs from 'qs';
import { StyleSheet, Text, View, Linking } from 'react-native';
import {authorize} from 'react-native-app-auth';

const client_id = '22C2J2'
const client_secret =  'aea53919e7de0f0ded7e30ea9fa2180b'

const config = {
  issuer: 'https://www.fitbit.com/oauth2/authorize',
  clientId: '22C2J2',
  redirectUrl: 'com.lifefitapp://fitbit',
  scopes: ['heartrate', 'activity', 'activity' , 'profile' , 'sleep'],
};


const  OAuth = async () => {
    try {
        const result = await authorize(config);
        console.log(result)
        // result includes accessToken, accessTokenExpirationDate and refreshToken
      } catch (error) {
        console.log(error);
      }
    }

    export default OAuth
  