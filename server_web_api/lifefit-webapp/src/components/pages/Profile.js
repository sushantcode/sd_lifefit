import React, { useState, useEffect } from "react";
import "./Profile.css";
import * as queries from '../../graphql/queries';
import { Auth, API } from 'aws-amplify';

  const Profile = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [gender,setGender]= useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  // for image upload
  const [image, setImage] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => { 
    Auth.currentUserInfo()
    .then((data) => {
      if (data){
        setId(data.attributes.sub);
        setUsername(data.username);
      }
    });
    if (id !== "") {
      doQuerry(id);
    }
  }, [id])

  async function doQuerry(id) {
    console.log(id);
    const userdetails = await API.graphql({ query: queries.getUserDetails, variables: {id: id}});
    if (userdetails.data.getUserDetails) {
      const userinfo =  userdetails.data.getUserDetails
      const fullName = (userinfo.fName + userinfo.lName);
      setFullname(fullName); 
      setGender(userinfo.gender);
      setAge(userinfo.age);
      const addr = (userinfo.street + ", " + userinfo.city + ", " + userinfo.state + " " + userinfo.zipcode);
      setAddress(addr);
      setEmail(userinfo.email);
      setImage(userinfo.profile_pic);
    }
  }

  //This is for edit purpose
  const edit = () => {
    let username = prompt("Enter new Username");
    let fullname = prompt("Enter new Full name");
    let gender = prompt("Enter your gender");
    let age = prompt("Enter new Age");
    let address = prompt("Enter new Address");
    setUsername(username);
    setFullname(fullname);
    setGender(gender);
    setAge(age);
    setAddress(address);
  };

  const onChangeHandler = (e) => {
    setImage(e.target.file[0]);

    // upload Image to database
  };

  const uploadPic = (e) => {
    // update dp here...
    // fetch from database and update the dp or you can use useEffect() for database things..!
  };


  return (
    <div className="userProfile pb-4">
      <img
        className="userProfile__image"
        src="https://i.picsum.photos/id/643/200/200.jpg?hmac=ouS38xYuy8iE3e24i3dNN11vJoBa6kKr3HzduEJ5Msk"
        alt="DP"
      />
      <div className="userProfile__changeImage">
        <lable className="fw-bold fs-5 pe-5">Change Profile </lable>
        <input type="file" onLoadedData={onChangeHandler} />
        <button onClick={uploadPic}>Upload</button>
      </div>
      <div className="userProfile__details text-light">
        <span className="userDetails">
          <span className="userDetails_field">Username:</span>
          <span className="user_value">{username}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Full name:</span>
          <span className="user_value">{fullname}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Gender:</span>
          <span className="user_value">{gender}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Age:</span>
          <span className="user_value">{age}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Address:</span>
          <span className="user_value">{address}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Email:</span>
          <span className="user_value">{email}</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Password:</span>
          <span className="user_value border">
            <a href="/changepassword" className="text-decoration-none ps-2 pe-2 text-light">Change Password</a>
          </span>
        </span>
      </div>
    </div>
  )
}

export default Profile;
