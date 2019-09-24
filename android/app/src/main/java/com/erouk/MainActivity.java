package com.erouk;
import android.content.Intent;
import com.tkporter.sendsms.SendSMSPackage;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    
    @Override
    protected String getMainComponentName() {
        return "Erouk";
    }
    
    //  @Override
    //  public void onNewIntent(Intent intent) {
    //      super.onNewIntent(intent);
    //      setIntent(intent);
    //  }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        //probably some other stuff here
        
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }
}
