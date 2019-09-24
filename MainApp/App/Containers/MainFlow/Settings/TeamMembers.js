
import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator ,TextInput } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Metrics } from '../../../Themes';
import styles from '../../Styles/TeamMemberStyles';
import images from '../../../Themes/Images';
import Modal from "react-native-modal";
import Share, { ShareSheet, Button } from 'react-native-share';
import { Avatar } from 'react-native-elements';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/AntDesign'
@observer export default class TeamMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            email: '',
            members: [],
            isModalVisible: false,
            is_inviteLoader: false,
            share_option: false
        }
    }
    static navigationOptions = {
        headerTitle: 'Team Members',
        // headerLeft: (<View style = { styles.headerLeft }><Image source = { images.crossBtn } style = { styles.icons } /></View>),
        // headerBackTitle: null,
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
    }
    onCancel() {
        // console.log("CANCEL")
        this.setState({ visible: false });
    }
    onOpen() {
        // console.log("OPEN")
        this.setState({ visible: true });
    }
    componentWillMount = async () => {
        //API calling for team members of shop
        this.setState({ loading: true })
        let params = {
            shopId: store.SELECTED_SHOP.id,
            userId: store.LOGIN_RESPONSE.userDetail.id,
        };
        let response = await api.post('shopMemberName', params);
        console.log('shopMembers===>>>', response);
        if (response.status) {
            await this.setState({ members: response.data })
            this.setState({ loading: false })
        } else { 
            this.setState({ loading: false })
        }
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    invite_member = async(Share) => {
        var Share = require('react-native-share');
        
         //length: defines the length of characters to express in the string
         // generating random token 
        var rand = function() {
            return Math.random().toString(36).substr(2); // remove `0.`
        };
        var token = function() {
            return rand() + rand(); // to make it longer
        };         
         //API calling for team invite members for shop
         this.setState({ is_inviteLoader: true })
         let params = {
             shopId: store.SELECTED_SHOP.id,
             activationCode: token(),
             inviteUserIdFrom: store.LOGIN_RESPONSE.userDetail.id,
             email: [this.state.email],
         };
         let response = await api.post('inviteMembers', params);         
         if (response.status) {
             this.setState({ is_inviteLoader: false ,isModalVisible: false })
             Toast.show(response.message);
            //  Share.open(shareOptions);
         } else {
             this.setState({ is_inviteLoader: false , isModalVisible: false ,share_option: true })
         }
    }   
    deleteMember = async( mem_id ) => {
        this.setState({ loading: true })
         let params = {
             shopId: store.SELECTED_SHOP.id,
             shopMemberId: mem_id,
             userId: store.LOGIN_RESPONSE.userDetail.id,
             deleteType: 'remove',
         };
         let response = await api.post('deleteMember', params);         
        //  console.log('deleteMember==>>>',response);
         if (response.status) {
            for (let i = 0; i < this.state.members.length; i++) {
                if ( this.state.members[i].user_id === mem_id ) {
                    this.state.members.splice(i,1)
                }
            }
             this.setState({ loading: false })
             Toast.show(response.message);
         } else {
             this.setState({ loading: false })
         }
    }
    render() {
        let shareOptions = {
            title: "Erouk",
            message: "Application Invitation Message",
            url: "https://play.google.com/store/apps/details?id=com.erouk",
            subject: "Share Link" //  for email
        };
        return (
            <View style={styles.container}>
                {/* <Text style={styles.shopName}>Shop A</Text>
                <Text style={styles.description}>Share products and expiry date with other members</Text> */}
                <ScrollView>
                    <View style={{ height: height(5), width: width(100), backgroundColor: 'rgba(60,90,188,0.5)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: totalSize(1.7) }}>Admin</Text>
                    </View>
                    <View style={{ height: height(10), width: width(100), flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar
                            small
                            rounded
                            source={require('../../../Images/man.png')}
                            activeOpacity={0.7}
                            containerStyle={{ marginVertical: 10, marginLeft: 20 }}
                        />
                        <Text style={{ color: '#3c5abc', fontSize: totalSize(1.8), marginHorizontal: 15 }}>{store.LOGIN_RESPONSE.userDetail.name}</Text>
                    </View>
                    <View style={{ height: height(5), width: width(100), backgroundColor: 'rgba(60,90,188,0.5)', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: totalSize(1.7) }}>Members</Text>
                    </View>
                    {
                        this.state.members.map((item, key) => {
                            return (
                                <View key={key} style={{ height: height(7), width: width(100), flexDirection: 'row', alignItems: 'center' }}>
                                    <Avatar
                                        small
                                        rounded
                                        source={require('../../../Images/man.png')}
                                        activeOpacity={0.7}
                                        containerStyle={{ marginVertical: 10, marginLeft: 20 }}
                                    />
                                    <View style={{width:width(75), marginHorizontal: 15,flexDirection:'row',borderBottomColor:'#999',borderBottomWidth: 0.4}}>
                                         <Text style={{ color: '#3c5abc', width:width(69),fontSize: totalSize(1.8),marginHorizontal:3 }}>{item.user_name}</Text>
                                         <TouchableOpacity onPress={()=>this.deleteMember(item.user_id)}>
                                             <Icon name='delete' size={20} color='#3c5abc'/>
                                         </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })
                    }
                    <View style={{flex:1}}>
                        <Text style={{fontSize:totalSize(1.8),color:'#3c5abc',fontWeight:'500',marginHorizontal: 25,marginVertical: 10}}>ADMIN</Text>
                        <Text style={{fontSize:totalSize(1.5),marginHorizontal: 25}}>Manage Products and categories.</Text>
                        <Text style={{fontSize:totalSize(1.8),color:'#3c5abc',fontWeight:'500',marginHorizontal: 25,marginVertical: 10}}>MEMBERS</Text>
                        <Text style={{fontSize:totalSize(1.5),marginHorizontal: 25}}>Can only add products.</Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.linkView} onPress={() => {  this.setState({ isModalVisible: true }) }}>
                    <View style={styles.logoView}>
                        <View style={{ height: Metrics.screenHeight * 0.10, width: Metrics.screenWidth * 0.17, borderRadius: 100, backgroundColor: '#f8be12', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: Metrics.screenHeight * 0.04, width: Metrics.screenWidth * 0.08, resizeMode: 'contain' }} source={images.InviteLink} />
                        </View>
                    </View>
                    <View style={styles.textView}>
                        <Text style={{ fontSize: 16, color: '#676f9f', marginVertical: 1 }}>Share Invite Link</Text>
                        <Text style={{ fontSize: 14, color: 'gray', marginVertical: 1 }}>Share via messenger,email or sms.</Text>
                    </View>
                </TouchableOpacity>
                {
                    this.state.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.loading ? <ActivityIndicator size='large' /> : null}
                        </View>
                        :
                        null
                }
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    onBackdropPress={this._toggleModal}
                >
                    <View style={[styles.modelCon, { height: height(30) }]}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Your partner Email</Text>
                        </View>
                        <View style={styles.shop}>
                            <Text style={[styles.text, { marginTop: 10 }]}>Email</Text>
                            <View style={styles.pickerCon}>
                                <TextInput
                                    style={styles.category}
                                    // value={''}
                                    onChangeText={(value) => { this.setState({ email: value }) }}
                                    placeholder='Enter Email'
                                    placeholderTextColor={'#dedede'}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={() => {this.invite_member(Share) , Share.open(shareOptions)}}>
                            {
                                this.state.is_inviteLoader?
                                    <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                                    :
                                    <Text style={styles.btnText}>send</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}
