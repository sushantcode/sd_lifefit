package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.WindowManager;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;

import androidx.appcompat.app.AppCompatActivity;
//This class is used for the app startup animation from top to buttom.
public class SplashScreen extends AppCompatActivity {

    //This is the time for the app startup animation
    private  static  int SPLASH_SCREEN =3500;

    ImageView imageView;

    Animation top;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);
        setContentView(R.layout.activity_splash_screen);

        imageView = findViewById(R.id.imageView);
        top = AnimationUtils.loadAnimation(this, R.anim.top);
        imageView.setAnimation(top);//starting point

        new Handler().postDelayed(new Runnable()
        {
            @Override
            public void run() {
                Intent intent = new Intent(SplashScreen.this, Welcomescreen.class);
                startActivity(intent);
                finish();
            }
        },SPLASH_SCREEN);

    }
}

