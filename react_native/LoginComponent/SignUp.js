import React from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, Pressable, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Input ,Button, Layout } from '@ui-kitten/components';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import * as mutations from '../graphql/mutations'

const SignUp = ({navigation}) =>{
    const [username, setUsername] = React.useState('');
    const[userId, setUserId] =  React.useState('a');
    const [password, setPassword] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [streetAddress, setStreetAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [code, setCode] = React.useState('');

    const [modalVisible, setModalVisible] = React.useState(false);

    
    async function confirmSignUp() {
        try {
          await Auth.confirmSignUp(username, code);
          
            const user = await Auth.signIn(username,password)
             

             const storeData = async () =>{
             const userData = {
              id: user.attributes.sub ,
              fName: firstName,
              lName: lastName,
              username: username,
              email: email,
              phone: phoneNumber,
              street: streetAddress,
              city: city,
              state: state,
              zipcode: zipCode,
              gender: gender,
              age: 0,
              score: 0
            }
            try{
               await API.graphql({ query: mutations.createUserDetails, variables: {input: userData}});
              console.log("use1r added to dynamo db")
            }
            catch(err)
            {
              console.log(err)
            }
           }
          try{
            storeData()
            console.log('user stored in DB')

          }
          catch (err)
          {
            console.log('user not stored in DB')
          }
          setModalVisible(!modalVisible)
          setUsername('')
          setPassword('')
          setFirstName('')
          setLastName('')
          setPhoneNumber('')
          setEmail('')
          setStreetAddress('')
          setCity('')
          setState('')
          setZipCode('')
          setGender('')
          setCode('')
          navigation.replace('Login')
        } catch (error) {
            Alert.alert("Invalid verification code.")
            console.log('error confirming sign up', error);
        }
    }

    async function signUpUser() {
        if (username === "" || password === "" || email === "")
        {
            console.log("no user")
        }
        else
        {
            try {
             
                const {user} =  await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email
                    }
    
                });
              
        

                 setModalVisible(true)
    
            } catch (error) {
                console.log('error signing up:', error);
            }
        }
    }

    return (
       

        <LinearGradient
        colors={['red', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
         
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert("No confirmation code provided.");
        setModalVisible(!modalVisible);
        }}
         >
         
            <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enter Code</Text>
            <Input
             placeholder='Code'
             value={code}
             style = {styles.inputBox}
             secureTextEntry
             onChangeText={nextValue => setCode(nextValue)}
         />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={confirmSignUp}
            >
              <Text style={styles.textStyle}>Confirm Code</Text>
            </Pressable>
          </View>
        </View>

         </Modal>
         
       
        <Text style = {{color:"white", fontSize: 20, fontWeight:"bold", marginBottom:30}}>REGISTER</Text>
        <Input
         placeholder='Username'
         value={username}
         style = {styles.inputBox}
         onChangeText={nextValue => setUsername(nextValue)}
        />
        <Input
         placeholder='Password'
         value={password}
         style = {styles.inputBox}
         secureTextEntry
         onChangeText={nextValue => setPassword(nextValue)}
        />
       

          <Input
          placeholder='First Name'
          value={firstName}
          style = {styles.inputBox}
          onChangeText={nextValue => setFirstName(nextValue)}
          />
          <Input
          placeholder='Last Name'
          value={lastName}
          style = {styles.inputBox}
          onChangeText={nextValue => setLastName(nextValue)}
          />
        

        <Input
         placeholder='Phone Number'
         value={phoneNumber}
         style = {styles.inputBox}
         onChangeText={nextValue => setPhoneNumber(nextValue)}
        />
        <Input
         placeholder='Email'
         value={email}
         style = {styles.inputBox}
         onChangeText={nextValue => setEmail(nextValue)}
        />

        <Input
         placeholder='Street Address'
         value={streetAddress}
         style = {styles.inputBox}
         onChangeText={nextValue => setStreetAddress(nextValue)}
        />

        <Input
         placeholder='City'
         value={city}
         style = {styles.inputBox}
         onChangeText={nextValue => setCity(nextValue)}
        />

        <Input
         placeholder='State'
         value={state}
         style = {styles.inputBox}
         onChangeText={nextValue => setState(nextValue)}
        />

        <Input
         placeholder='ZipCode'
         value={zipCode}
         style = {styles.inputBox}
         onChangeText={nextValue => setZipCode(nextValue)}
        />

         <Input
         placeholder='Gender'
         value={gender}
         style = {styles.inputBox}
         onChangeText={nextValue => setGender(nextValue)}
        />
        
       
       
        <Button onPress = {signUpUser} style = {{marginTop: 30 , width:120, height : 45}} appearance = "outline" status = 'danger' size= 'medium' >SUBMIT</Button>
        
        </LinearGradient>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    inputBox: {
        marginHorizontal:50 ,
        marginTop:8, 
        height:40      
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
        marginTop:20
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }

})


export default SignUp