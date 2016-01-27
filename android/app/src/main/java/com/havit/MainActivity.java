package com.havit;

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

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HavitApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
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
}
