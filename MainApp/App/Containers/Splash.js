
import React, { Component } from 'react';
import { Image, View, Alert } from 'react-native';
import images from '../Themes/Images';
import Styles from './Styles/SplashStyles';
import firebase from 'react-native-firebase';
import store from '../Stores/orderStore'

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initNotif: ''
    };
  }
  static navigationOptions = {
    header: null,
  } 
  componentWillMount() {
    setTimeout(
      () => {
        this.props.navigation.replace('Login')
      }, 2000)
  }
  componentDidMount = async () => {

    firebase.messaging().getToken().then(token => {
      store.FCM_TOKEN = token
      console.log("TOKEN (getFireBaseToken)", store.FCM_TOKEN);
    });
    this.notificationListener = firebase.notifications().onNotification(notification => {
      //firebase.notifications().displayNotification(notification);
      Alert.alert(
        notification.title,
        notification.body,
        // [
        //   // {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //   // { text: 'Exit', onPress: () =>  this.exit()},
        //   { text: 'Retry', onPress: () => this.internetCheck() }
        // ],
        //{ cancelable: false }
      )
    })
  }
  render() {
    return (
      <View style={Styles.splashView}>
        <Image source={images.splashImage} style={Styles.splashLogo} />
      </View>
    );
  }
}




