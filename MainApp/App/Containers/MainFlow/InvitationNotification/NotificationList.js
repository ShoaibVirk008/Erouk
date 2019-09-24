
import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import { height, width, totalSize } from 'react-native-dimension';
//import FCM, { NotificationActionType, NotificationOpen, Notification } from "react-native-fcm";
import NotificationItem from './NotificationItem';
import { Icon } from 'react-native-elements';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';

@observer export default class NotificationList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            loading: false,
            activat_code: ''
        }
    }
    componentWillMount = async( ) => {
        
    }
    static navigationOptions =  ({ navigation,props }) => ({
        headerTitle: 'Invitation Notifications',
        headerStyle: {
            backgroundColor: '#3c5abc',
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'normal',
            alignSelf: 'center',
            textAlign: 'center',
            // width: Metrics.screenWidth - Metrics.screenWidth * 0.35,
        },
        headerTintColor: 'white'
    });
    _toggleModal = async(activation_code) => 
        await this.setState({ isModalVisible: !this.state.isModalVisible , activat_code: activation_code })

    accept_invitation = async() => {
         //API calling for accepting invitation for shop
         this.setState({ loading: true })
         let params = {
             activationCode: this.state.activat_code,
             userId: store.LOGIN_RESPONSE.userDetail.id,
             email: store.LOGIN_RESPONSE.userDetail.email,
         };
         let response = await api.post('acceptInvitition', params);         
         if (response.status) {
            // for get singleShopdata
            //  parameters = {
            //     userId: store.LOGIN_RESPONSE.userDetail.id , 
            //     shopId: response.shopId 
            //  }
            store.PRODUCT_DETAIL = [];
            store.PRODUCTS = [];
            this.setState({ loading: true })
            let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id }); 
            if (dataRes.status) {
                store.PRODUCT_DETAIL = dataRes.data;
                store.PRODUCT_DETAIL.forEach(shop => {
                    if (shop.shop.id === store.SELECTED_SHOP.id) {
                        store.SELECTED_SHOP_NAME = shop.shop.shop_name;
                        store.CATEGORIES = shop.shop.category;
                        store.SELECTED_SHOP = shop.shop;
                        for (let i = 0; i < shop.shop.category.length; i++) {
                            for (let j = 0; j < shop.shop.category[i].categories.products.length; j++) {
                                store.PRODUCTS.push(shop.shop.category[i].categories.products[j]);
                            }
                        }
                    }
                })
            }    
            // await this.props.navigation.state.params.reFreshStore();
            this.setState({ loading: false ,isModalVisible: false })
            Toast.show(response.message);
            this.props.navigation.goBack()
         } else {
            Toast.show(response.message);
             this.setState({ loading: false , isModalVisible: false })
         }
    }
    render() {
        return (
            <View style={Styles.container}>
                <View style={{ height: height(5), width: width(100), backgroundColor: 'white' }}>
                    {/* <Text style={Styles.shopName}>{store.SELECTED_SHOP_NAME}</Text> */}
                    <Text style={Styles.shopName}>All Invitations List</Text>
                </View>
                <FlatList
                    data={store.LOGIN_RESPONSE.shopInvititions}
                    renderItem={(item) => <NotificationItem key={item.id} item={item}  _toggleModal= { this._toggleModal }  />}
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    backdropColor='white'
                    backdropOpacity={0.50}>
                    {
                        this.state.loading ?
                            <View style={Styles.modelCon}>
                                <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                            </View>
                            :
                            <View style={Styles.modelCon}>
                                <View style={Styles.msgCon}>
                                    <Text style={Styles.msgText}>Invitation</Text>
                                    <Text style={[Styles.msgText, { fontSize: 14, marginHorizontal: 40 }]}>Would you like to accept or reject?</Text>
                                </View>
                                <View style={Styles.btnCon}>
                                    <TouchableOpacity style={[Styles.btn, { borderRightWidth: 0.5 }]} onPress={() => this.setState({ isModalVisible: false })} >
                                        <Text style={[Styles.btnText, { color: 'red' }]}>Reject</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Styles.btn} onPress={() => this.accept_invitation()}>
                                        <Text style={[Styles.btnText, { color: '#3c5abc' }]}>Accept</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </Modal>
            </View>
        );
    }
}