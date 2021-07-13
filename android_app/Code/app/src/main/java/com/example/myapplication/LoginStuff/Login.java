package com.example.myapplication.LoginStuff;

import android.app.Dialog;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import com.amplifyframework.auth.AuthException;
import com.amplifyframework.auth.cognito.AWSCognitoAuthSession;
import com.amplifyframework.auth.result.AuthSignInResult;
import com.amplifyframework.core.Amplify;
import com.amplifyframework.core.model.query.Where;
import com.amplifyframework.datastore.DataStoreChannelEventName;
import com.amplifyframework.datastore.DataStoreException;
import com.amplifyframework.datastore.generated.model.UserDetails;
import com.amplifyframework.hub.HubChannel;
import com.example.myapplication.R;
import com.example.myapplication.SharedPrefManager;
import com.example.myapplication.homescreen;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import java.util.Iterator;
import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends AppCompatActivity implements View.OnClickListener {
    private TextInputLayout editTextUserName, editTextPassword;
    private TextView buttonText;
    private ProgressBar progressBar;
    boolean syncQueriesReady = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //intialize click listener on login screen
        findViewById(R.id.button_log_in).setOnClickListener(this);
        findViewById(R.id.login_close).setOnClickListener(this);

        //initialize to get the data entered in username and password box
        editTextUserName = findViewById(R.id.login_username);
        editTextPassword = findViewById(R.id.login_password);
        progressBar = findViewById(R.id.progressBarLoginButton);
        buttonText = findViewById(R.id.textViewLoginButton);
        buttonText.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                userLogin();
            }
        });
    }

    //shows welcome screen on arrow back (X) clicked
    private void showWelcomeScreen() {
        finish();
        overridePendingTransition(R.anim.no_animation, R.anim.bottom_down);
    }

    /**
     * checks user enter input
     * @return 'true' if field is not empty, 'false' if empty
     */
    private Boolean checkInput(String email, String password) {
        boolean check = false;
        editTextUserName.setError(null);
        editTextPassword.setError(null);

        if(email.isEmpty() && password.isEmpty()){
           showCustomAlertDialog("Invalid Input", "Username and password is Required");
        }
        else if (email.isEmpty()) {
            showCustomAlertDialog("Invalid Input", "Username is Required");
            check = false;
        }
        else if (password.isEmpty()) {
            showCustomAlertDialog("Invalid Input", "Password is Required");
            check = false;
        } else if (!email.isEmpty() && !password.isEmpty()){
            check = true;
        }
        return check;
    }

    private void userLogin() {
        String userName = editTextUserName.getEditText().getText().toString().trim();
        String password = editTextPassword.getEditText().getText().toString().trim();

        if (!checkInput(userName, password)) {
            return;
        } else {
            Log.i("login", "wait to login" + userName + "  " + password);
            progressBar.setVisibility(View.VISIBLE);
            buttonText.setText("Please Wait");
            Amplify.Auth.signIn(
                    userName,
                    password,
                    this::onLoginSuccess,
                    this::onLoginError
            );



        }
    }

    private void onLoginError(AuthException e) {
        //handle the error response if the user credentials doesn't match
        Log.e("LoginProcess", "Sign in failed", e);
        Login.this.runOnUiThread(() -> showCustomAlertDialog("Login Error", e.getLocalizedMessage()));
    }

    private void onLoginSuccess(AuthSignInResult authSignInResult) {
        //progressBar.setVisibility(View.GONE);
        Log.i("LoginProcess", "User Login: " + authSignInResult.toString());
        queryForRemoteData();
        Intent intent = new Intent(Login.this, homescreen.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
    }

    private void queryForRemoteData() {
        start();
        if (syncQueriesReady) {
            saveUser();
        } else {
            queryAfterReady();
        }
    }

    private void queryAfterReady() {
        Amplify.Hub.subscribe(HubChannel.DATASTORE,
                hubEvent -> DataStoreChannelEventName.SYNC_QUERIES_READY.toString().equals(hubEvent.getName()),
                hubEvent -> {
                    syncQueriesReady = true;
                    saveUser();
                });
    }

    private void start() {
        Amplify.DataStore.start(
                () -> Log.d("LoginProcess", "DataStore has been started.  Subscribe to `SYNC_QUERIES_READY` to know when sync is complete"),
                error -> Log.e("LoginProcess", "Failure starting DataStore")
        );
    }

    private void saveUser() {
        String uid = Amplify.Auth.getCurrentUser().getUserId();
        Log.i("LoginProcess", "UserId: " + uid);
        Amplify.DataStore.query(
                UserDetails.class,
                Where.id(uid),
                this::onQuerySuccess,
                this::onQueryFailure
        );
    }

    private void onQueryFailure(DataStoreException e) {
        Log.e("LoginProcess", "Could not find the user in database", e);
    }

    private void onQuerySuccess(Iterator<UserDetails> userDetailsIterator) {
        if (userDetailsIterator.hasNext()) {
            UserDetails userInfo = userDetailsIterator.next();
            User user = new User(
                    userInfo.getStreet(),
                    userInfo.getCity(),
                    userInfo.getEmail(),
                    userInfo.getFName(),
                    userInfo.getGender(),
                    userInfo.getLName(),
                    userInfo.getPhone(),
                    userInfo.getState(),
                    userInfo.getUsername(),
                    userInfo.getZipcode(),
                    userInfo.getProfilePic(),
                    userInfo.getId());
            SharedPrefManager.getInstance(Login.this)
                    .saveUser(user);
            Amplify.Auth.fetchAuthSession(
                    result -> {
                        AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;
                        switch(cognitoAuthSession.getIdentityId().getType()) {
                            case SUCCESS:
                                LoginResponse loginResponse = new LoginResponse(cognitoAuthSession.getIdentityId().getValue(), "Login Successful", "Logged In");
                                Log.i("LoginProcess", "IdentityId: " + cognitoAuthSession.getIdentityId().getValue());
                                SharedPrefManager.getInstance(Login.this).saveLoginResponse(loginResponse);
                                break;
                            case FAILURE:
                                Log.i("LoginProcess", "IdentityId not present because: " + cognitoAuthSession.getIdentityId().getError().toString());
                        }
                    },
                    error -> Log.e("LoginProcess", error.toString())
            );

            //When we close and comeback we don't want user to see the login page.
            //So, we need to set the flag.
            //If the Login is Successfull then take user to the homescreen.
            Log.i("LoginProcess", "UserDetails: Retrieved successfully! " + userInfo.toString());
            Intent intent = new Intent(Login.this, homescreen.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
            startActivity(intent);
        }
        else {
            Log.i("LoginProcess", "UserDetails: Failed to retrieve successfully! ");
        }
    }


    private void showCustomAlertDialog(String title, String message) {
        final Dialog dialog = new Dialog(this);
        dialog.setContentView(R.layout.dialog_custom_alert);
        TextView alertTitle = dialog.findViewById(R.id.alertTitle);
        TextView alertMessage = dialog.findViewById(R.id.alertMessage);
        ImageView imageView = dialog.findViewById(R.id.alertErrorImage);

        alertTitle.setText(title);
        alertMessage.setText(message);
        imageView.setImageDrawable(ContextCompat.getDrawable(this,R.drawable.ic_error));

        dialog.setCanceledOnTouchOutside(true);

        dialog.show();

        //time to dismiss the dialog
        final Timer t = new Timer();
        t.schedule(new TimerTask() {
            public void run() {
                dialog.dismiss();
                t.cancel();
            }
        }, 1500);
        progressBar.setVisibility(View.GONE);
        buttonText.setText("Login");
    }

    //listens to all click on login screen and calls appropriate function
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_log_in:
                userLogin();
                break;
            case R.id.login_close:
                showWelcomeScreen();
                break;
        }
    }
}
