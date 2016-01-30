package com.havit;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

/** Native Modules */
import com.smixx.reactnativeicons.ReactNativeIcons;
import com.smixx.reactnativeicons.IconFont;
import com.projectseptember.RNGL.RNGLPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import ca.jaysoo.activityandroid.ActivityAndroidPackage;

/** HockeyApp */

import net.hockeyapp.android.CrashManager;
import net.hockeyapp.android.UpdateManager;

public class MainActivity extends ReactActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        checkForUpdates(); // HockeyApp
    }

    @Override
    protected void onPause() {
        super.onPause();
        UpdateManager.unregister();
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

    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new ReceiveIntentPackage(),
        new RNGLPackage(),
        new ReactMaterialKitPackage(),
        new LinearGradientPackage(),
        new ReactNativeIcons(),
        new ReactNativeIcons(Arrays.asList(
            new IconFont("ion", "ionicons.ttf")
            )
        ),
        new ActivityAndroidPackage(this)
      );
    }

    private void checkForUpdates() {
        // Remove this for store / production builds!
        UpdateManager.register(this, "[redacted]");
    }

    private void checkForCrashes() {
        CrashManager.register(this, "[redacted]");
    }
}
