import React, { Component } from 'react';
import { View, Text,ActivityIndicator,Platform,PermissionsAndroid } from 'react-native';
import BarcodeScanner, { Exception, FocusMode, CameraFillMode, FlashMode, BarcodeType, 
    pauseScanner, resumeScanner, TorchMode 
} from 'react-native-barcode-scanner-google';
import { height , width , totalSize } from 'react-native-dimension';
class BarCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
        permission: false
    };
  }
  static navigationOptions = {
      headerTitle:'BarCode Scanner'
  }
  componentWillMount = async() => {
    await this.requestPermissions()
  }
  requestPermissions = async () => {
    if(Platform.OS === 'android') { 
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
        if ( result ) {
            this.setState({ permission: true })
        }else {
            this.setState({ permission: false })
        }
        return result === PermissionsAndroid.RESULTS.GRANTED || result === true
    }
    return true;
  }
  render() {
      let { params } = this.props.navigation.state;
    return (
      <View style={{flex:1}}>
        {
            this.state.permission?
                <BarcodeScanner
                    style={{flex:1}}
                    onBarcodeRead={({data, type}) => {
                        // handle your scanned barcodes here!
                        // as an example, we show an alert:
                        console.warn('data:',data);
                        params.barCode(data);
                        this.props.navigation.goBack();
                    //   Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
                    }}
                    onException={exceptionKey => {
                        // check instructions on Github for a more detailed overview of these exceptions.
                        switch (exceptionKey) {
                            case Exception.NO_PLAY_SERVICES:
                                // tell the user they need to update Google Play Services
                            case Exception.LOW_STORAGE:
                                // tell the user their device doesn't have enough storage to fit the barcode scanning magic
                            case Exception.NOT_OPERATIONAL:
                                // Google's barcode magic is being downloaded, but is not yet operational.
                            default: break;
                        }
                    }}
                    focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
                    cameraFillMode={CameraFillMode.FIT /* could also be FIT */}
                    barcodeType={BarcodeType.CODE_128 | BarcodeType.EAN_13 | BarcodeType.EAN_8 /* replace with ALL for all alternatives */}
                    FlashMode={FlashMode.ON /* 0 is OFF or 1 is TORCH  */}
                //   torchMode={TorchMode.ON}
                />
                :
                <View style={{ flex:1, justifyContent:'center',alignItems:'center' }}>
                    <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                </View>
        }
         
      </View>
    );
  }
}

export default BarCodeScanner;
