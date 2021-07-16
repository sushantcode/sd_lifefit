import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const edit = () => {
    let username = prompt("Enter new Username");
    let fullname = prompt("Enter new Full name");
    let age = prompt("Enter new Age");
    let address = prompt("Enter new Address");
    setUsername(username);
    setFullname(fullname);
    setAge(age);
    setAddress(address);
  };
  return (
    <div className="userProfile">
      <img
        className="userProfile__image"
        src="https://i.picsum.photos/id/643/200/200.jpg?hmac=ouS38xYuy8iE3e24i3dNN11vJoBa6kKr3HzduEJ5Msk"
        alt="DP"
      />
      <p className="userProfile__header">User Profile</p>

      <button className="edit__button" onClick={edit}>
        edit
      </button>
      <div className="userProfile__details">
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
          <span className="user_value">Male</span>
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
          <span className="user_value">Johnvai@somethin.com</span>
        </span>
        <hr />

        <span className="userDetails">
          <span className="userDetails_field">Passord:</span>
          <span className="user_value">
            <a href="/changepassword">change password</a>
          </span>
        </span>
      </div>
    </div>
  )
}

export default Profile
