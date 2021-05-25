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
import com.amplifyframework.auth.result.AuthSignInResult;
import com.amplifyframework.core.Amplify;
import com.example.myapplication.R;
import com.example.myapplication.SharedPrefManager;
import com.example.myapplication.homescreen;
import com.google.android.material.textfield.TextInputLayout;
import com.google.gson.Gson;

import java.util.Timer;
import java.util.TimerTask;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Login extends AppCompatActivity implements View.OnClickListener {
    private TextInputLayout editTextUserName, editTextPassword;
    private TextView buttonText;
    private ProgressBar progressBar;

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
        Log.e("Login", "Sign in failed", e);
        Login.this.runOnUiThread(() -> showCustomAlertDialog("Login Error", e.getLocalizedMessage()));
        progressBar.setVisibility(View.GONE);
        buttonText.setText("Login");
    }

    private void onLoginSuccess(AuthSignInResult authSignInResult) {
        progressBar.setVisibility(View.GONE);

        //If the Login is Successfull then take the user to the homescreen.
        Intent intent = new Intent(Login.this, homescreen.class);

        //When we close and comeback we don't want user to see the login page.
        //So, we need to set the flag.
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
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
