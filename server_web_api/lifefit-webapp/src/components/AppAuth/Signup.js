import React from "react";
import "./Signup.css";

function Signup(props) {
  return (
    <form className="register">
      <p>REGISTER</p>

      <a href="/login">Already a member? Login here</a>
      <div className="field">
        <label>Username</label>
        <input type="text" placeholder="Username" />
      </div>

      <div className="field">
        <label>password</label>
        <input type="password" placeholder="password" />
      </div>

      <div className="field">
        <label>First Name</label>
        <input type="text" placeholder="First Name" />
      </div>

      <div className="field">
        <label>Last Name</label>
        <input type="text" placeholder="Last Name" />
      </div>

      <div className="field">
        <label>Gender</label>
        {/* <input type="text" placeholder="Gender" /> */}
        <select>
          <option value="choose">choose one</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="field">
        <label>Phone Number</label>
        <input type="Phone" placeholder="Phone Number" />
      </div>

      <div className="field">
        <label>Email</label>
        <input type="Email" placeholder="Email" />
      </div>

      <div className="field">
        <label>Street Address</label>
        <input type="Street" placeholder="Street Address" />
      </div>

      <div className="field">
        <label>City</label>
        <input type="City" placeholder="City" />
      </div>

      <div className="field">
        <label>State</label>
        <input type="State" placeholder="State" />
      </div>

      <div className="field">
        <label>Zipcode</label>
        <input type="Zipcode" placeholder="Zipcode" />
      </div>

      <button className="field btn" type="submit">
        Register
      </button>
    </form>
  );
}

export default Signup;