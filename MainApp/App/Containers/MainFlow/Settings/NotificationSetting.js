
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, ScrollView, TouchableOpacity, Switch, ActivityIndicator
} from 'react-native';
import { height, width, totalSize } from 'react-native-dimension';
import { Avatar, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Metrics } from '../../../Themes';
import { CheckBox } from 'react-native-elements'
import Styles from '../../Styles/CategoryStyles';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';

@observer export default class NotificationSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            is_toggle: false,
            notificationTimes: []
        }
    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Notification Setting',
        // headerLeft: (<View style = { Styles.headerLeft }><Image source = { images.addUser } style = { [Styles.icons,{height: Metrics.screenWidth*0.06}] } /></View>),
        headerRight: (<TouchableOpacity style={Styles.headerRight} onPress={()=>navigation.state.params.notifySettings()}>{navigation.state.loading? null : <Text style={{ color: 'white' }}>Save</Text>}</TouchableOpacity>),
        headerStyle: {
            backgroundColor: '#3c5abc',
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'normal',
            alignSelf: 'center',
            textAlign: 'center',
        },
        headerTintColor: 'white'
    })
    componentWillMount = async() => {
        this.setState({ loading: true })
        if (store.LOGIN_RESPONSE.expiryTimesNotifications.length > 0) {
            this.setState({ is_toggle: true })
        }
        store.TIME.forEach( item =>{
            store.LOGIN_RESPONSE.expiryTimesNotifications.forEach( timer =>{
                if ( item.value === timer.time ) {
                    item.check = true;
                    item.added = true;
                    store.NOTIFICATION_TIME.push(item.value)
                } else {
                    item.check === false;
                }
            });
        });
        this.setState({ loading: false })        
    }
    _toggle = () =>
        this.setState({ is_toggle: !this.state.is_toggle });
    
    selectTime = (item) =>{        
        store.TIME.forEach((obj)=>{
            if ( obj.id === item.id ) {
                obj.check = !obj.check;
                if ( obj.check ) {
                    store.NOTIFICATION_TIME.push(obj.value)
                }else{
                    for (let i = 0; i < store.NOTIFICATION_TIME.length; i++) {
                       if ( obj.value === store.NOTIFICATION_TIME[i] ) {
                        store.NOTIFICATION_TIME.splice(i, 1)
                       } 
                    }
                }
            } 
        })
        this.setState({loading:false})
        // console.warn('arr=>',this.state.notificationTimes);
    }    
    componentDidMount() {
        this.props.navigation.setParams({
            notifySettings: this.notificationSettings,
        });
    }
    notificationSettings = async() => {
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            notificationStatus: this.state.is_toggle,
            notificationTimes: store.NOTIFICATION_TIME
        }
        if ( this.state.is_toggle === false ) {
            Toast.show('Please on notification option');
        }else {
            if ( store.NOTIFICATION_TIME.length === 0 ) {
                Toast.show('Please select any time');
            } else {
                this.setState({ loading: true })
                response = await api.post('productExpiryNotificationSettings',params);                
                if (response.status) {
                    store.LOGIN_RESPONSE.expiryTimesNotifications  = response.expiryTimesNotifications;
                    this.setState({ loading: false })
                    Toast.show(response.message)
                } else {
                    this.setState({ loading: false })
                    Toast.show(response.message)
                }
            }
        }
    }
    render() {
        let data = store.LOGIN_RESPONSE.userDetail;        
        if (this.state.loading) {
            <View style={{ flex: 1,alignItems:'center',justifyContent:'center',position:'absolute' }}>
                <ActivityIndicator size='large' color='#3c5abc' animating={true} />
            </View>
        }
        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.titleText}>Notification</Text>
                <View style={styles.cardView}>
                    <TouchableOpacity style={styles.strip}>
                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={[styles.stripText, { color: '#3c5abc' }]}>Expiry Date Notification</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                            <Switch
                                disabled={false}
                                onValueChange={() => this._toggle()}
                                thumbColor='#3c5abc'
                                value={this.state.is_toggle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.titleText}>Time Settings</Text>
                <View style={styles.cardView}>
                    {
                        store.TIME.map((item, key) => {
                            return (
                                <View key={key} style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
                                        <CheckBox
                                            title= { item.value }
                                            onPress={()=> this.selectTime(item)}
                                            checked={ item.check }
                                            size={20}
                                            checkedColor='#3c5abc'
                                            textStyle={{color:'#3c5abc',fontWeight:'300',fontSize: totalSize(1.6)}}
                                            containerStyle={{backgroundColor:'transparent',borderColor:'transparent',marginLeft: 0}}
                                        />
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}></View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    titleText: {
        fontSize: 12,
        color: 'gray',
        opacity: 0.7,
        marginHorizontal: 35,
        marginVertical: 5
    },
    cardView: {
        // height: Metrics.screenHeight * 0.05,
        width: Metrics.screenWidth * 0.9,
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 3,
        marginVertical: 5,
        backgroundColor: '#f9f9f9'
    },
    strip: {
        height: Metrics.screenHeight * 0.05,
        width: Metrics.screenWidth * 0.85,
        borderColor: '#3c5abc',
        justifyContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
    stripText: {
        fontSize: 13,
        color: 'gray',
    }
});