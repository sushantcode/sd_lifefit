/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import NavContainer from './NavigatoinContainer/NavContainer'
import Amplify, { Auth } from 'aws-amplify';
import awsmobile from './src/aws-exports';
import AsyncStorage from '@react-native-async-storage/async-storage'

Amplify.configure(awsmobile);


const App = () => {



  return (
    
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavContainer />
     </ApplicationProvider>
    
       )
}

const styles = StyleSheet.create ( {
  container: {
    flex:1

  },
  container1:{
    flex:1,
    backgroundColor:"red"
  },
  container2:{
    flex:2,
    backgroundColor:"green"
  },
  text : {
    color : "green",
  
  }
})
export default App;
