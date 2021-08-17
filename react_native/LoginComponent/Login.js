import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Input ,Button, Layout } from '@ui-kitten/components';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage'

import AntDesign from "react-native-vector-icons/AntDesign";

const USER_KEY = '@user_key'

const Login = ({navigation}) => {
    const [userName, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userData, setUserData] = React.useState('')

    const [isLoggedIn, setIsLoggedIn] = React.useState("n")
  
    const isUserLoggedIn = async () =>{
      try{
          const userStatus = await AsyncStorage.getItem('@loginStatus')
          console.log("Login condition is " + userStatus + isLoggedIn)
          setIsLoggedIn(userStatus)
      }
      catch(err)
      {
        setIsLoggedIn("n")
        console.log(err)
      }
    }
  
    React.useEffect(()=>{
      isUserLoggedIn()
    },[])

    if (isLoggedIn === 'y') { navigation.replace('Home')}
   
    async function signIn() {
        try {
            const user = await Auth.signIn(userName, password);
            //console.log(user)
            setUserData(user)
            try{
                await AsyncStorage.setItem('@loginStatus', "y")
                await AsyncStorage.setItem('@username', JSON.stringify(user))
               // console.log( await Auth.currentAuthenticatedUser() )
            }
            catch(err)
            {
                console.log(err)
            }
            setUsername('')
            setPassword('')
            
            navigation.replace('Home')
        } catch (error) {
            Alert.alert(error.message)
            console.log('error signing in', error);
        }
    }
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
        <Image resizeMode= "contain" style = {{ width:120, height: 120} } source = {require ('../assets/state_farm_logo.png')}></Image>
        <Text style = {{color: "white", fontSize:25, fontWeight: "bold", marginBottom: 5}}> STATE FARM FIT </Text>
        <Text style = {{color: "white",  fontWeight: "bold", marginBottom: 40}}>Stay Active, Stay Fit</Text>
         <Input
         placeholder='Username'
         value={userName}
         style = {styles.inputBox}
         accessoryLeft={ <AntDesign name="user" color= "grey" size={20} />}
         onChangeText={nextValue => setUsername(nextValue)}
        />
        <Input
         placeholder='Password'
         
         value={password}
         secureTextEntry 
         style = {styles.inputBox}
         accessoryLeft={ <AntDesign name="lock" color= "grey" size={20} />}
         onChangeText={nextValue => setPassword(nextValue)}
        />
        
        <Button onPress = {signIn} style = {{marginTop: 30 , width:120, height : 45}} appearance = "outline" status = 'danger' size= 'medium' >
                LOGIN
        </Button>
        <View style = {{flexDirection: "row", marginTop:20}}> 
            <Text style = {styles.text}>Don't have an account?</Text>
            <TouchableOpacity onPress = {() => navigation.navigate('SignUp')}>
                <Text  style = {styles.text1}>  Sign Up</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:20      

    },
    text : {
        color:"white"
    },
    text1 : {
        color:"red",
    }
  })

export default Login;