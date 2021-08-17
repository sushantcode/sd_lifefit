import React from 'react';
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StatusBar} from 'react-native';
import UserInfoStackScreen from './UserInfoStackScreen'
import ProfileStackScreen from './ProfileStackScreen'
import AntDesign from "react-native-vector-icons/AntDesign";
const Tab = createBottomTabNavigator();


const Home = (props) => {

    return (
         <Tab.Navigator 
         tabBarOptions={{
             activeTintColor: "white",
             
             inactiveTintColor: "white",
              style: {
                 backgroundColor: 'red',
                 paddingBottom: 7,
           }
         }}>
            <Tab.Screen 
                name="Home" 
                component={UserInfoStackScreen} 
                options = {{
                    tabBarIcon:() =>(
                        <AntDesign name="home" color= "white" size={22} />
                    )
                    
                }}
              
                />
            <Tab.Screen 
                name="Profile" 
                component={ProfileStackScreen}
                options = {{
                    tabBarIcon:() =>(
                        <AntDesign name="user" color= "white" size={22} />
                    )
                    
                }}  />
        </Tab.Navigator>
        
   
    )
}
export default Home;