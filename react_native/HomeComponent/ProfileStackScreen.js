import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text ,Button, Layout, Card } from '@ui-kitten/components';
import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'
//import ProfileScreen from './ProfileScreen'
import SyncScreen from './SyncScreen';
import {Auth, API} from 'aws-amplify'
import * as queries from '../graphql/queries'
import * as mutations from '../graphql/mutations'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from "react-native-vector-icons/AntDesign";
import { authorize } from 'react-native-app-auth';

const Profile = createStackNavigator();
const config = {
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

const ProfileScreen = (props) => {
    const [userId, setUserId] = React.useState('')
    const {navigation} = props; 
    const [userName, setUserName] = React.useState('')
    const [userDetail, setUserDetail] = React.useState('')
    const [fitBitResponse, setFitBitResponse] = React.useState({})
    const [syncStatus, setSyncStatus] = React.useState(0)

    const  OAuth = async () => {
        try {
            const result = await authorize(config);
          
           //console.log(result)
            setSyncStatus(1)
            try {
                await AsyncStorage.setItem('@fitBitAuth', JSON.stringify(result))

            }
            catch (err)
            {
                console.log("Couldn't save fitbit auth")
            }
            try
            {
                
                await API.graphql({ query: mutations.createFitbitTokens, variables: {input: {
                    id: userId,
                    access_token: result.accessToken,
                    refresh_token: result.refreshToken,
                    user_id: result.tokenAdditionalParameters.user_id,
                    expires_in: 28800
                }}});
                console.log("User fitbit added to AWS")
            }
            catch(err)
            {

                console.log( result.accessToken)
                await API.graphql({ query: mutations.deleteFitbitTokens, 
                    variables: 
                {  
                    input:
                    {
                        id: userId,
                    },
                    _version: "10"
            
                }});
                console.log("User fitbit updated to AWS")                
                console.log(err)
            }
            setFitBitResponse(result)
    
          } catch (error) {
           
            console.log(error);
          }
        }
    
    const getUserId = async () =>{
        await Auth.currentUserInfo().then((data) =>{
            if(data){
                setUserId(data.attributes.sub)
               // console.log(userId)
            }
        })
    }
  
  
    React.useEffect (() => {
        getUserId()
        getUserName()
        if(userId !== "") 
        {
            doQuerry(userId)
        }
       
        
    }, [userId])

    async function doQuerry(userId)
    {
        const userDetails = await API.graphql({ query: queries.getUserDetails, variables: {id: userId}});
       // console.log(userDetails)
        if (userDetails.data.getUserDetails) {
            setUserDetail(userDetails.data.getUserDetails)
             console.log(userDetail)
             
        }       
        else
        {
            console.log("Error occured while querrying for score.")
        }
    }

    const getUserName = async () =>{
        try {

            const usersName = await AsyncStorage.getItem('@username')
            const userDetails = await AsyncStorage.getItem('@userDetail')
            console.log(userDetails)
            
            setUserName(JSON.parse(usersName).username)
            
        }
        catch(e){
            setUserName('N/A')
        }
    }
    const signOut = async () =>{
        await AsyncStorage.setItem('@loginStatus', 'n')
        await AsyncStorage.removeItem('@fitBitAuth')
        console.log('user is signed out')
    }
    
    return (
        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.24 }}
        >
            <View style = {styles.container1}>
                <View style = {{marginLeft: 10, flexDirection: 'row', marginTop:8}}>
                    <Text style ={{marginLeft:7, color: "white"}} category ="h4" >
                         Profile
                    </Text>
                </View>
                <Button 
                appearance = "outline"
                status = "control"
                style = {{height:50}}
                onPress ={ ()=> {
                Auth.signOut()
                signOut()
                navigation.navigate('Login')
                }}>
                    Logout
                </Button>

            </View>
            <View style = {styles.container2}>
                <View style = {{alignItems: "center", marginBottom:20}}>
                    <View style = {{width:70, height: 70, backgroundColor:"red", alignItems:"center", justifyContent:"center", borderRadius:35}}>
                        <Text category = "h3" status ="control">{userName[0]}</Text>
                    </View>
                    <Text style = {{marginTop:10}}>{userName}</Text>
                    

                </View>

                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>User Info</Text>
                    <Text>{userDetail.fName} {userDetail.lName}</Text>
                    <Text>{userDetail.age} , {userDetail.gender}</Text>
                    <Text>{userDetail.street}</Text>
                    <Text>{userDetail.city}, {userDetail.state}, {userDetail.zipcode}</Text>
                </Card>
                <Card style={styles.card} status='danger'>
                    <Text category = "h6" style ={{marginBottom: 8}}>Sync with Fitbit</Text>
                    <View flexDirection="row">
                        <Text category = "p1">Status: </Text>
                       {syncStatus === 0 ? <Text category = "p1">  Not Synced </Text> : <Text category = "p1">  Synced </Text> }
                        
                    </View>
                    <View style = {{marginHorizontal: 90, marginTop: 20}}>
                        <Button 
                            appearance = "outline"
                            status = "danger"
                            onPress = {()=>OAuth()}
                          >
                            Sync Now
                        </Button>
                    </View>

                </Card>
                
               
            </View>
        </LinearGradient>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:20      

    },
    container1:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
        
     
    },
    container2:{
        flex:5,
        //alignItems: "center"
    },
    card: {
        margin: 10,
      },
   
  })

const  ProfileStackScreen = ( props ) => {

    

        return (
            <Profile.Navigator>
              <Profile.Screen name="Profile" component={ProfileScreen} options = {{headerShown: false}} />
              <Profile.Screen name="SyncScreen" component={SyncScreen} options = {{headerShown: false}} />
            </Profile.Navigator>
          );
  
  
  }
  export default ProfileStackScreen