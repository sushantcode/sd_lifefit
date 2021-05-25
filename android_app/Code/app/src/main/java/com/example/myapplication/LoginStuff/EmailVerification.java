package com.example.myapplication.LoginStuff;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import com.example.myapplication.R;

public class EmailVerification extends AppCompatActivity {

    private TextView uName;
    private TextView uEmail;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_email_verification);
        String user[] = getIntent().getExtras().getStringArray("userInfo");
        uName = findViewById(R.id.emailverifyUserName);
        uName.setText("Hi " +
                user[0] +"!" +
                user[2] + " " +
                user[3] + " " +
                user[4] + " " +
                user[5] + " " +
                user[6] +" " +
                user[7] +" " +
                user[8] +" " +
                user[9] +" " +
                user[10]);
        uEmail = findViewById(R.id.emailverifyEmail);
        uEmail.setText(user[1]);
    }
}