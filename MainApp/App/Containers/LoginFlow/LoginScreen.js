import React, {Component} from 'react';
import { View, Text, Button,TouchableOpacity, Image, ImageBackground ,ActivityIndicator} from 'react-native';
import { Metrics } from '../../Themes';
import Styles from '../../Containers/Styles/LoginStyles';
import images from '../../Themes/Images';
import {observer} from 'mobx-react';
import store from '../../Stores/orderStore'
import api from '../../lib/api';
import Toast from 'react-native-simple-toast';
var { FBLoginManager } = require('react-native-facebook-login');
import { GoogleSignin, statusCodes } from 'react-native-google-signin';

@observer
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        };
    }
    static navigationOptions = {
        header: null,
    }
    fbLogin = () => {
        FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native); // defaults to Native
        FBLoginManager.loginWithPermissions(["email"], functionFb = (error, data) => {
          if (!error && data.type === "success") {
            //Calling local func for login through google
            let profile = JSON.parse(data.profile);
            this.goToHome(profile.email, profile.name,'facebook');
             console.log("FaceBook Login: ", data);
          } else {
            Toast.show('It must be your network issue, please try again.', Toast.LONG);
            console.log("Error: ", error);
          }
        })
      }
      componentWillMount() {
        GoogleSignin.configure({
          iosClientId: '191792720370-rc4ospf26req749phf3d4l4sfj74gmf4.apps.googleusercontent.com'
        })
      }
      //// Google Login Methode 
      handleGoogleSignIn = async() => {
        await GoogleSignin.hasPlayServices();  
        GoogleSignin.signIn().then((user) => {
          //Calling local func for login through google
          console.warn('email==>>',user.user.email);
          this.goToHome(user.user.email, user.user.name,'google');
          console.log('googleLogin', user);
        }).catch((err) => {
          console.warn(err);
        }).done();
      }
      signIn = async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log('user info==>>>',userInfo);
          this.goToHome(userInfo.user.email, userInfo.user.name,'google');
          this.setState({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log('error signin cancel=>>',error);
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('error in progress=>>',error);
            // operation (f.e. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('error play=>>',error);
            // play services not available or outdated
          } else {
            console.log('error=>>',error);
            // some other error happened
          }
        }
      };  
    goToHome = async (email,name,login_type) => {
        //length: defines the length of characters to express in the string
         // generating random token 
         var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        var token = function() {
            return rand() + rand(); // to make it longer
        };         
        this.setState({loading: true})
        let params = {
            name: name, //usama,husain , name
            email: email, //usama@gmail.com , husain@gmail.com ,email
            token: token(),
            deviceToken: store.FCM_TOKEN,
            loginFrom: login_type ,//facebook
        }
        console.log('params',params);
        // API calling
        store.LOGIN_RESPONSE = await api.post('login',params);
        console.warn('loginResponse====>',store.LOGIN_RESPONSE);
        Toast.show(store.LOGIN_RESPONSE.Message);
        if(store.LOGIN_RESPONSE.status){
            if ( store.LOGIN_RESPONSE.data.length > 0 ) {
                console.log('Login Response===>',store.LOGIN_RESPONSE)
                store.PRODUCT_DETAIL = [];      
                store.PRODUCT_DETAIL = store.LOGIN_RESPONSE.data
                for (let i = 0; i < store.PRODUCT_DETAIL.length; i++) {
                    store.PRODUCT_DETAIL[i].shop.checkStatus = false;
                    store.PRODUCT_DETAIL[i].shop.selected = false;
                }
                store.SELECTED_SHOP_NAME = store.PRODUCT_DETAIL[0].shop.shop_name;
            }
            this.props.navigation.replace('Drawer')
            this.setState({loading: false})
        }else{
            this.setState({loading: false})
            store.PRODUCT_DETAIL = [];
            Toast.show('Invalid email');
        }
    }
  render() {
    return (
        <ImageBackground source ={ images.bgImage } style = { Styles.mainContainer }>
            <TouchableOpacity onPress = { ()=>this.fbLogin() }>
                <Image source = { images.fbBtnImage } style = { Styles.buttonView } />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleGoogleSignIn()}>
                <Image source = { images.googleBtnImage } style = { Styles.buttonView } />
            </TouchableOpacity>
            <View style={ Styles.buttonView }>
                {/* <Image source = { images.talkBtnImage } style = { Styles.buttonView } /> */}
            </View>
            <View style = { Styles.registerTextView }>
                {
                    !this.state.loading? null : <ActivityIndicator size="large" color="#0000ff" />
                }
                {/* <Text style = { Styles.registerText }>Already Registered?</Text> */}
            </View>           
        </ImageBackground>
    );
  }
}