package com.havit;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

/** HockeyApp */

// import net.hockeyapp.android.CrashManager;
// import net.hockeyapp.android.UpdateManager;

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        checkForUpdates(); // HockeyApp
    }

    @Override
    protected void onPause() {
        super.onPause();
        // UpdateManager.unregister();
    }

    @Override
    protected void onResume() {
        super.onResume();
        checkForCrashes();
    }

    @Override
    protected String getMainComponentName() {
        return "HavitApp";
    }


    private void checkForUpdates() {
        // Remove this for store / production builds!
        // UpdateManager.register(this, "[redacted]");
    }

    private void checkForCrashes() {
        // CrashManager.register(this, "[redacted]");
    }
}
