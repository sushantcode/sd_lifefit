package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.transition.Slide;
import android.util.Log;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.animation.LinearInterpolator;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.amplifyframework.auth.AuthUser;
import com.amplifyframework.core.Amplify;
import com.example.myapplication.LoginStuff.Login;

public class Welcomescreen extends AppCompatActivity {

    private Button login;
    private Button signup;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // On create start
        super.onCreate(savedInstanceState);

        // check is user is logged in
        AuthUser currentUser = Amplify.Auth.getCurrentUser();

//        if (currentUser == null) {
            setContentView(R.layout.activity_welcomescreen);

            Window window = getWindow();
            Slide slide = new Slide();
            slide.setInterpolator(new LinearInterpolator());
            slide.setSlideEdge(Gravity.RIGHT);
            slide.excludeTarget(android.R.id.statusBarBackground, true);
            slide.excludeTarget(android.R.id.navigationBarBackground, true);
            window.setEnterTransition(slide);
            window.setReturnTransition(slide);

            login = findViewById(R.id.button_login);
            signup = findViewById(R.id.button_signup);
            login.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    startActivity(new Intent(Welcomescreen.this, com.example.myapplication.LoginStuff.Login.class));
                    overridePendingTransition(R.anim.bottom_up,R.anim.no_animation);
                }
            });

            signup.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    startActivity(new Intent(Welcomescreen.this, com.example.myapplication.LoginStuff.Registration.class));
                    overridePendingTransition(R.anim.bottom_up,R.anim.no_animation);
                }
            });
//        }
//        else {
//            //If the Login is Successfull then take the user to the homescreen.
//            Intent intent = new Intent(Welcomescreen.this, homescreen.class);
//
//            //When we close and comeback we don't want user to see the login page.
//            //So, we need to set the flag.
//            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//            startActivity(intent);
//            finish();
//        }
    }
}
