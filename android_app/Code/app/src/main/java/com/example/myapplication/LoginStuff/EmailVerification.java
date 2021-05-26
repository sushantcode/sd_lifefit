package com.example.myapplication.LoginStuff;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.amplifyframework.auth.AuthException;
import com.amplifyframework.auth.result.AuthSignInResult;
import com.amplifyframework.auth.result.AuthSignUpResult;
import com.amplifyframework.core.Amplify;
import com.amplifyframework.core.model.Model;
import com.amplifyframework.datastore.DataStoreException;
import com.amplifyframework.datastore.DataStoreItemChange;
import com.amplifyframework.datastore.generated.model.UserDetails;
import com.example.myapplication.R;
import com.example.myapplication.homescreen;
import com.google.android.material.textfield.TextInputLayout;

import java.util.Timer;
import java.util.TimerTask;

public class EmailVerification extends AppCompatActivity {

    private String username, password, fname, lname, phoneNumber, email, address, city, state, zipcode, gender;
    private TextView uName;
    private TextView uEmail;
    private TextInputLayout editTextVerifyCode;
    private ProgressBar progressBar;
    private TextView buttonText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_email_verification);

        String user[] = getIntent().getExtras().getStringArray("userInfo");
        //  Assign values to user attributes
        username = user[0];
        password = user[1];
        fname = user[2];
        lname = user[3];
        phoneNumber = user[4];
        email = user[5];
        address = user[6];
        city = user[7];
        state = user[8];
        zipcode = user[9];
        gender = user[10];

        uName = findViewById(R.id.emailverifyUserName);
        uName.setText("Hi " + fname +"!");
        uEmail = findViewById(R.id.emailverifyEmail);
        uEmail.setText(email);

        editTextVerifyCode = findViewById(R.id.emailverifyCode);
        progressBar = findViewById(R.id.progressEmailverifySubmitButton);
        buttonText = findViewById(R.id.textViewEmailverifySubmitButton);

        findViewById(R.id.button_emailverify_submit).setOnClickListener(this::onClick);

    }

    public void onClick(View view) {
        editTextVerifyCode.setError(null);
        progressBar.setVisibility(View.VISIBLE);
        buttonText.setText("Please Wait");
        if (editTextVerifyCode.getEditText().getText().toString().trim().isEmpty()) {
            editTextVerifyCode.setError("Must provide the code!");
            editTextVerifyCode.requestFocus();

            progressBar.setVisibility(View.GONE);
            buttonText.setText("Verify Email");
        }
        else {
//            onConfirmSuccess();
        Amplify.Auth.confirmSignUp(
                username,
                editTextVerifyCode.getEditText().getText().toString().trim(),
                this::onConfirmSuccess,
                this::onConfirmError
        );
        }
    }

    private void onConfirmError(AuthException e) {
        Log.e("SignUpConfirm", "Sign Up Failed", e);
        EmailVerification.this.runOnUiThread(
                () -> showCustomAlertDialog(
                        "Confirmation Error", e.getMessage(),false,true
                ));

    }

    private void onConfirmSuccess(AuthSignUpResult authSignUpResult) {
        Log.i("SignUpConfirm", "Result: " + authSignUpResult.toString());
        doLogin();
    }

    private void doLogin() {
        Amplify.Auth.signIn(
                username,
                password,
                this::onLoginSuccess,
                this::onLoginError
        );
    }

    private void onLoginError(AuthException e) {
        Log.e("SignUpConfirm", "Authorization Failed while email confirmation: ", e);
        EmailVerification.this.runOnUiThread(
                () -> showCustomAlertDialog(
                        "Authorization Failed", e.getMessage() + " Please contact admin.",false,true
                ));
    }

    private void onLoginSuccess(AuthSignInResult authSignInResult) {
        Log.i("SignUpConfirm", "Result: " + authSignInResult.toString());
        doStoreData();
    }

    private void doStoreData() {
        String uid = Amplify.Auth.getCurrentUser().getUserId();
        UserDetails userDetails = UserDetails.builder()
                .username(username)
                .email(email)
                .fName(fname)
                .lName(lname)
                .id(uid)
                .phone(phoneNumber)
                .street(address)
                .city(city)
                .state(state)
                .zipcode(zipcode)
                .gender(gender)
                .build();

        Amplify.DataStore.save(
                userDetails,
                this::onSavedSuccess,
                this::onSavedError
        );
    }

    private void onSavedError(DataStoreException e) {
        Log.e("SignUpConfirm", "Unable to save data: ", e);
        EmailVerification.this.runOnUiThread(
                () -> showCustomAlertDialog(
                        "Data Saving Failed", e.getMessage() + " Please contact admin.",false,true
                ));
    }

    private <T extends Model> void onSavedSuccess(DataStoreItemChange<T> tDataStoreItemChange) {
        Log.i("SignUpConfirm", "Data Save Success: " + tDataStoreItemChange.toString());
        //If the datasave is Successfull then take the user to the homescreen.
        Intent intent = new Intent(EmailVerification.this, com.example.myapplication.homescreen.class);

        //When we close and comeback we don't want user to see the login page.
        //So, we need to set the flag.
        finish();
        startActivity(intent);
    }

    private void showCustomAlertDialog(String title, String message, Boolean successful, Boolean unSuccessful) {
        final Dialog dialog = new Dialog(this);
        dialog.setContentView(R.layout.dialog_custom_alert);
        TextView alertTitle = dialog.findViewById(R.id.alertTitle);
        TextView alertMessage = dialog.findViewById(R.id.alertMessage);
        ImageView imageView = dialog.findViewById(R.id.alertErrorImage);

        alertTitle.setText(title);
        alertMessage.setText(message);

        if(unSuccessful){
            imageView.setImageDrawable(ContextCompat.getDrawable(this,R.drawable.ic_error));
        }
        else if(successful){
            imageView.setImageDrawable(ContextCompat.getDrawable(this,R.drawable.ic_check));
        }

        dialog.setCanceledOnTouchOutside(true);

        dialog.show();

        //time to dismiss the dialog
        final Timer t = new Timer();
        t.schedule(new TimerTask() {
            public void run() {
                dialog.dismiss();
                t.cancel();
            }
        }, 2000);
        progressBar.setVisibility(View.GONE);
        buttonText.setText("Verify Email");
    }
}