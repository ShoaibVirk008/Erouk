package com.erouk;

import android.app.Application;
import com.facebook.FacebookSdk;

import com.magus.fblogin.FacebookLoginPackage; // <--- import
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import cl.json.RNSharePackage;
import cl.json.ShareApplication;
//import com.evollu.react.fcm.FIRMessagingPackage;
import com.tkporter.sendsms.SendSMSPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.spyworldxp.barcodescanner.BarcodeScannerPackage;

import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
//RNFirebase packages
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new ReactNativePushNotificationPackage(),
            new RNGoogleSigninPackage(),
            new RNSharePackage(),
            //new FIRMessagingPackage(),
            new PickerPackage(),
            new BarcodeScannerPackage(),
            new VectorIconsPackage(),
            new ReactNativeContacts(),
            SendSMSPackage.getInstance(),
            new FacebookLoginPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  // @Override
  // public void onCreate() {
  //   super.onCreate();
  //   SoLoader.init(this, /* native exopackage */ false);
  // }
}
