
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,ImageBackground,Image,ScrollView,TouchableOpacity
} from 'react-native';
// import { TabNavigator } from 'react-navigation';
import { Avatar,Button } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
var { FBLoginManager } = require('react-native-facebook-login');
import { Metrics } from '../../../Themes';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
@observer export default class ViewProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isGoogleLogin: false
        }
    }
    static navigationOptions =({navigation})=> ({
        headerTitle:'View Profile',
        // headerLeft: (<TouchableOpacity style = { Styles.headerLeft } onPress={()=>navigation.push('EditProfile')}><Image source = { images.addUser } style = { [Styles.icons,{height: Metrics.screenWidth*0.06}] } /></TouchableOpacity>),
        headerRight: (<TouchableOpacity style = { Styles.headerRight } onPress={()=>navigation.push('EditProfile')}><Image source = { images.editProfile } style = { [Styles.icons,{height: Metrics.screenWidth*0.06}] } /></TouchableOpacity>),
        // headerRight: (<View style = { Styles.headerRight }><Image source = { images.searchIcon } style = { Styles.icons } /></View>),
    })
    componentWillMount = async() => {
        await this.isSignedIn();
    }
    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        await this.setState({ isGoogleLogin: isSignedIn });        
      };
    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          const res = await GoogleSignin.signOut();
          if (res) {
            this.props.navigation.replace('Login');
          }
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };
      handleLogoutFB=()=>{
        var _this = this;
        FBLoginManager.logout(function(error, data){
          if (!error) {
            _this.setState({ user : null});
            _this.props.navigation.replace('Login')
          } else {
            console.log(error, data);
          }
        });
      }
    logout = async() => {
        if ( this.state.isGoogleLogin ) {
            await this.signOut()
        } else {
            await this.handleLogoutFB()
        }
    }   
    render(){
        let data = store.LOGIN_RESPONSE.userDetail;
        return(
            <View style={styles.container}>
                <View style={styles.label}>
                   <Text style={styles.labelText}>ADMIN</Text>
                </View>
                <View style={styles.card}>
                   <View style={[styles.strip,{height: Metrics.screenHeight*0.10}]}>
                        <View style={{alignSelf:'stretch',justifyContent:'center'}}>    
                            <Avatar
                                medium
                                rounded
                                source={require('../../../Images/man.png')}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                                />
                        </View>
                        <View style={{flex:1,marginHorizontal:15,justifyContent:'center'}}>
                            <Text style={styles.titleText}>{ data.name }</Text>
                            {/* <Text style={{ fontSize: 12 }}>{data.login_from}</Text> */}
                        </View>
                        <TouchableOpacity style={{height: 20,width: 50,backgroundColor:'#3c5abc',justifyContent:'center',alignItems:'center',borderRadius: 3}}
                            onPress={()=>this.logout()}
                        >
                           <Text style={{ color:'white',fontSize: 12 }}>Logout</Text>
                        </TouchableOpacity>
                   </View>
                   <View style={[styles.strip,{height: Metrics.screenHeight*0.05}]}>
                     <Text style={styles.subTitleText}>{ data.address !== null ? data.address : 'Edit your address' }</Text>
                   </View>
                   <View style={[styles.strip,{height: Metrics.screenHeight*0.05}]}>
                     <Text style={styles.subTitleText}>{ data.mobile_number !== null ? data.mobile_number : 'Edit your contact number' }</Text>
                   </View>
                   <View style={[styles.strip,{height: Metrics.screenHeight*0.05,borderBottomWidth:0}]}>
                     <Text style={styles.subTitleText}>{ data.email }</Text>
                   </View>
                   {/* <View style={[styles.strip,{height: Metrics.screenHeight*0.05}]}>
                     <Text style={styles.subTitleText}>{ data.fb_url }</Text>
                   </View> */}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    label:{
      height: Metrics.screenHeight * 0.06,
      width: Metrics.screenWidth * 0.9,
      backgroundColor:'transparent',
      justifyContent:'center',
      alignSelf:'center'
    },
    labelText:{
        fontSize: 16,
        color:'#3c5abc',
        marginHorizontal:10  
    },
    card:{
        height: Metrics.screenHeight * 0.25,
        width: Metrics.screenWidth * 0.9,
        alignSelf:'center',
        backgroundColor:'#ffffff',
        elevation: 10,
        marginVertical:0,
        borderRadius:5
    },
    strip: {
        height: Metrics.screenHeight * 0.08,
        width: Metrics.screenWidth * 0.85,
        alignSelf:'center',
        marginHorizontal: 5,
        alignItems:'center',
        borderBottomWidth: 0.5,
        borderColor:'#3c5abc',
        flexDirection:'row'
    },
    titleText:{
        fontSize: 16,
        color:'#3c5abc',
        marginVertical:0,
    },
    subTitleText:{
        fontSize: 12,
        color:'#92a0d5',
        marginVertical:1
    },
    editBtn:{
        height: Metrics.screenHeight * 0.03,
        width: Metrics.screenWidth * 0.1,
        backgroundColor:'#2a3478',
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        fontSize: 12,
        color:'white',
        fontWeight:'normal',
        marginVertical:0
    },
  });