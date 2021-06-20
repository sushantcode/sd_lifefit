package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

/*
This activity connects our app to the fitbit integrating module class
Trigerred when click on "Sync with Fitbit" button in mobile app.
To check its xml, go to app->res->xml->root_preferences.xml
 */
public class FitBitActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fit_bit);

        Intent intent = null;
        try {

            intent = new Intent(this,
                    Class.forName("com.fitbitsample.FitbitActivity.MainActivity"));
            startActivity(intent);

            //intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            finish();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }



    }

}