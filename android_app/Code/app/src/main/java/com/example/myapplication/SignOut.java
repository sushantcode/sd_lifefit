package com.example.myapplication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import androidx.appcompat.app.AppCompatActivity;

import com.amplifyframework.auth.AuthException;
import com.amplifyframework.core.Amplify;
import com.example.myapplication.LoginStuff.Login;

public class SignOut extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_out);
        logout();
    }
    /*
    When the user hit logout, it clears everything from SharedPreference manager
    and take the user back to Login activity.
     */
    private void logout() {
        Amplify.Auth.signOut(
                this::onSignOutSuccess,
                this::onSignOutError
        );
    }

    private void onSignOutError(AuthException e) {
        Log.e("SignOut", e.toString());
    }

    private void onSignOutSuccess() {
        Intent intent = new Intent(this, Login.class);
        SharedPrefManager.getInstance(this).clear();
        Amplify.DataStore.clear(
                () -> Log.i("SignOut", "Datastore is cleared"),
                failure -> Log.e("SignOut", "Failed to clear datastore")
        );
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        finish();
        startActivity(intent);
    }
}