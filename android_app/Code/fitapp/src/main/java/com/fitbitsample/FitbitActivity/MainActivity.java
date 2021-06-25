package com.fitbitsample.FitbitActivity;


import android.content.Context;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;

import androidx.appcompat.app.AppCompatActivity;
import androidx.databinding.DataBindingUtil;

import com.fitbitsample.R;
import com.fitbitsample.databinding.ActivityMainBinding;
import com.fitbitsample.ViewFragments.ViewFitbitDataFragment;
import com.fitbitsample.ViewFragments.LogintoFitbitFragment;
import com.fitbitsample.FitbitSharedPref.AppPreference;
import com.fitbitsample.FragmentTraceManager.FragmentStack;
import com.fitbitsample.FragmentTraceManager.FragmentStackHandler;


public class MainActivity extends AppCompatActivity {

    public final String TAG = MainActivity.this.getClass().getSimpleName();
    private ActivityMainBinding activityMainBinding;
    private FragmentStackHandler fragmentStackHandler;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activityMainBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        fragmentStackHandler = new FragmentStackHandler(getSupportFragmentManager(), new FragmentStack());
        init();

    }

    private void init() {
        checkStatus();
    }

    public void setTitle(String title) {
        activityMainBinding.toolbarTitle.setText(FitbitDataFormat.capitalizeFirstLetter(title));
    }

    private void checkStatus() {
        //check for previous authorization
        Context context = getApplicationContext();
        AppPreference.init(context);
        boolean haveToken = AppPreference.getInstance().getBoolean(PrefConstants.HAVE_AUTHORIZATION, false);
        if (!haveToken) {
            //show fitbit login page
            showLogin();
            //finishAfterTransition();
        } else {
            //show retrieved data from api calls
            showDashboard();
        }
    }

    public void showDashboard() {
        if (!(fragmentStackHandler.getLastFragment() instanceof ViewFitbitDataFragment)) {
            androidx.fragment.app.Fragment fragment = new ViewFitbitDataFragment();
            fragmentStackHandler.startAndAddFragmentAndCloseAllLastFragmentInStack(fragment, activityMainBinding.homeContainer.getId());
        }
    }

    private void showLogin() {
        if (!(fragmentStackHandler.getLastFragment() instanceof LogintoFitbitFragment)) {
            androidx.fragment.app.Fragment fragment = new LogintoFitbitFragment();
            fragmentStackHandler.startAndAddFragmentAndCloseAllLastFragmentInStack(fragment, activityMainBinding.homeContainer.getId());
        }
    }



    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
