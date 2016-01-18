package com.havit;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter;

/**
 * Created by gr4yscale on 18/01/2016.
 */

public final class ReceiveIntentManager extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public ReceiveIntentManager(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ReceiveIntent";
    }


    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void onHostResume() {
        Log.e("ReceiveIntent", "resumed");
        Activity currentActivity = getCurrentActivity();

        if (currentActivity != null) {
            Intent intent = currentActivity.getIntent();
            String action = intent.getAction();
            String type = intent.getType();
            String url = null;

            if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
                url = intent.getStringExtra(Intent.EXTRA_TEXT);
            }
            else if (Intent.ACTION_VIEW.equals(action) && "text/plain".equals(type)) {
                url = intent.getDataString();
            }

            if (url != null) {
                Log.e("ReceiveIntent", url);

                getReactApplicationContext().getJSModule(RCTDeviceEventEmitter.class)
                        .emit("IntentReceived", url);
            }
        }

    }

    @Override
    public void onHostDestroy() {
        Log.e("ReceiveIntent", "destroyed");
    }

    @Override
    public void onHostPause() {
        Log.e("ReceiveIntent", "paused");
    }
}