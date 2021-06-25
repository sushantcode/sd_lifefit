package com.example.myapplication.LoginStuff;

/**
Create a User class to store the User information that is received upon successfull
login. These are all the User attributes used during costumer registration.
Check documentation with the heading POSTMAN RESPONSE to view the response.
 */
public class User {
//Creating constructor, getter and setter
    private String address, city, email, fname, gender, lname, phone, state, uname, zipcode, profile_pic, user_id;
    private int age, score;

    public User(String address, String city, String email, String fname, String gender, int age, String lname, String phone, String state, String uname, String zipcode, String profile_pic, String user_id, int score) {
        this.address = address;
        this.city = city;
        this.email = email;
        this.fname = fname;
        this.gender = gender;
        this.age = age;
        this.lname = lname;
        this.phone = phone;
        this.state = state;
        this.uname = uname;
        this.zipcode = zipcode;
        this.profile_pic = profile_pic;
        this.user_id = user_id;
        this.score = score;
    }


    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getEmail() {
        return email;
    }

    public String getFname() {
        return fname;
    }

    public String getGender() {
        return gender;
    }

    public int getAge() {
        return age;
    }

    public String getLname() {
        return lname;
    }

    public String getPhone() {
        return phone;
    }

    public String getState() {
        return state;
    }

    public String getUname() {
        return uname;
    }

    public String getZipcode() {
        return zipcode;
    }

    public String isProfile_pic() {
        return profile_pic;
    }

    public String getUser_id() {
        return user_id;
    }

    public int getScore() {
        return score;
    }
}
