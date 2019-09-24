
import React, { Component } from 'react';
import { StatusBar, I18nManager, Platform,Text, View, TouchableOpacity,AsyncStorage } from 'react-native';
//import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";
import AppNavigation from './MainApp/App/Navigation/AppNavigation';
import store from './MainApp/App/Stores/orderStore';
import { height, width, totalSize } from 'react-native-dimension';
import Modal from "react-native-modal";

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      fcm: null
    }
    I18nManager.forceRTL(false); 
  }
  // componentWillMount=async()=>{
  //   await FCM.requestPermissions({ badge: true, sound: true, alert: true })
  //   // FCM.requestPermissions();
  //   FCM.getFCMToken().then(token => {
  //     store.FCM_TOKEN = token;
  //     console.log("TOKEN:", store.FCM_TOKEN);
  //     console.warn("Token==>",token);
  //   });
  //  await FCM.requestPermissions({ badge: true, sound: true, alert: true })
  //  FCM.getInitialNotification().then(notif=>console.log("INITIAL:\n" + JSON.stringify(notif)));
  //}
  
  // componentDidMount = () => {
  //   FCM.on(FCMEvent.Notification, async(notif) => {
  //     console.log("Notification", notif);
  //     console.warn("Notification", notif.fcm);
  //     await this.setState({ fcm: notif , isModalVisible: true })
  //   });
  // }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="#3c5abc"
          barStyle="light-content"
        />
        <AppNavigation />
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationInTiming={1000}
                    animationOutTiming={1000}
                    backdropTransitionInTiming={1000}
                    backdropTransitionOutTiming={1000}
                    avoidKeyboard={false}
                    hasBackdrop={false}
                    backdropColor='transparent'
                    animationIn='slideInLeft'
                    animationOut='slideOutRight'
                    onBackButtonPress={()=>this.setState({ isModalVisible: !this.state.isModalVisible })}
                    backdropOpacity={0.50}
                    style={{ flex:1,marginHorizontal: 0, marginVertical: 0,alignSelf:'center' }}
                    >
                    <View style={{ flex:1 }}>
                      <TouchableOpacity style={{ height:height(11),width:width(95),elevation: 5,alignSefl:'flex-start',backgroundColor:'white',borderRadius: 10 }} onPress={()=> {this.setState({ isModalVisible: !this.state.isModalVisible })}}>
                        <Text style={{ fontSize: 13,color:'red',fontWeight:'500',marginHorizontal: 15,marginVertical: 3,marginTop: 7 }}>{this.state.fcm !== null? this.state.fcm.fcm.title : null}</Text>
                        <Text style={{ fontSize: 12,color:'#8a8a8a',marginHorizontal: 15 }}>{this.state.fcm !== null? this.state.fcm.fcm.body : null}</Text>
                      </TouchableOpacity>
                    </View>
                </Modal>
      </View>
    );
  }
}