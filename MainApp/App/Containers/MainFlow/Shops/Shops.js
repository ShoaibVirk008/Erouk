
import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { height, width, totalSize } from 'react-native-dimension';
//import FCM, { NotificationActionType, NotificationOpen, Notification } from "react-native-fcm";
import ShopsList from './ShopsList';
import { Icon, Input } from 'react-native-elements';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
let _this = null;
@observer export default class Shops extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            product_id: 0,
            loading: false,
            searchText: '',
            searchedProduct: [],
            refreshing: false,
        }
    }
    static navigationOptions = ({ navigation, props }) => ({
        headerTitle: store.SELECTED_SHOP_NAME,
        headerRight: (<TouchableOpacity style={Styles.headerRight} onPress={() => navigation.push('NotificationList', { reFreshStore: _this.reFreshStore })}><Image source={images.notification} style={Styles.icons} /><Text style={{ marginLeft: 15, position: 'absolute', color: 'white', fontWeight: 'bold' }}>{store.LOGIN_RESPONSE.shopInvititions.length}</Text></TouchableOpacity>),
        //headerLeft: (<TouchableOpacity style={Styles.headerLeft} onPress={() => navigation.push('ViewProfile')}><Image source={images.profileIcon} style={Styles.icons} /></TouchableOpacity>),
        headerBackTitle: null,
        initialRouteName: 'Shops',
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
    componentDidMount() {
        _this = this;
        // FCM.getInitialNotification().then(notif=>alert("INITIAL:\n" + JSON.stringify(notif)));
    }
    componentWillMount() {
        var index = store.SELECTED_SHOP.index;
        if (store.DRAWER === false && store.PRODUCT_DETAIL.length > 0) {
            store.SELECTED_SHOP_NAME = store.PRODUCT_DETAIL[0].shop.shop_name;
            store.CATEGORIES = store.PRODUCT_DETAIL[0].shop.category;
            store.SELECTED_SHOP = store.PRODUCT_DETAIL[0].shop;
            for (let i = 0; i < store.PRODUCT_DETAIL[0].shop.category.length; i++) {
                for (let j = 0; j < store.PRODUCT_DETAIL[0].shop.category[i].categories.products.length; j++) {
                    store.PRODUCTS.push(store.PRODUCT_DETAIL[0].shop.category[i].categories.products[j]);
                }
            }
            store.PRODUCTS = store.PRODUCTS.sort((a, b) => (a.remaining_days > b.remaining_days) ? 1 : ((b.remaining_days > a.remaining_days) ? -1 : 0));
        }
    }
    _toggleModal = (id) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
        });
        store.product_id = id
        // console.warn('id', store.product_id);
    }
    reFreshStore = async () => {
        this.setState({ refreshing: true })
        let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
        if (dataRes.status) {
            console.warn('Shop Info==>', dataRes)
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
                    this.setState({ refreshing: false })
                }
            })
        }
    }
    deleteProduct = async () => {
        // store.PRODUCT_DETAIL = [];
        // store.PRODUCTS = [];
        this.setState({ loading: true })
        let params = {
            productId: store.product_id
        }
        let del = await api.post('deleteProduct', params);
        if (del.status === true) {
            await this.getProducts()
            this.setState({ loading: false })
            Toast.show(del.message);
            this.props.navigation.push('Drawer')
        }
        // console.log('loginResponse=');
    }
    getProducts = async () => {

        let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
        if (dataRes.status) {
            store.PRODUCT_DETAIL = [];
            store.PRODUCTS = [];
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
            store.PRODUCTS = store.PRODUCTS.sort((a, b) => (a.remaining_days > b.remaining_days) ? 1 : ((b.remaining_days > a.remaining_days) ? -1 : 0));
            console.log('prod===>>', store.PRODUCTS);

            this.setState({ isModalVisible: false })
        }
    }
    searchProduct = async () => {
        store.SEARCED_PRODUCTS = [];
        if (this.state.searchText.length > 0) {
            store.PRODUCTS.forEach((item) => {
                if (item.product_name.includes(this.state.searchText)) {
                    store.SEARCED_PRODUCTS.push(item);
                }
            });
        } else {
            store.SEARCED_PRODUCTS = [];
        }
        Keyboard.dismiss();
        await this.setState({ searchedProduct: store.SEARCED_PRODUCTS })
    }
    render() {
        return (
            <View style={Styles.container}>
                {/* <View style={{ height: height(5), width: width(100), backgroundColor: 'white' }}>
                    <Text style={Styles.shopName}>{store.SELECTED_SHOP_NAME}</Text>
                </View> */}
                <View style={{ height: height(6), width: width(90), flexDirection: 'row', backgroundColor: '#fff', borderRadius: 5, marginVertical: 10, elevation: 5, alignItems: 'center' }}>
                    <TextInput
                        onChangeText={(value) => this.setState({ searchText: value })}
                        placeholder='Search'
                        value={this.state.searchText}
                        style={{ height: height(6), width: width(75), paddingHorizontal: 10 }}
                    />
                    <TouchableOpacity onPress={() => {
                        if (store.SEARCED_PRODUCTS.length > 0) {
                            store.SEARCED_PRODUCTS = [];
                            this.setState({ searchText: '' })
                        } else {
                            this.searchProduct()
                        }
                    }}>
                        <Image source={store.SEARCED_PRODUCTS.length > 0 ? require('../../../Images/cancel.png') : require('../../../Images/search-icon.png')} style={{ height: height(3), width: width(10), resizeMode: 'contain', marginHorizontal: 10 }} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.loading ?
                        <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                        :
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.getProducts}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={store.SEARCED_PRODUCTS.length > 0 ? store.SEARCED_PRODUCTS : store.PRODUCTS}
                            renderItem={(item) => <ShopsList key={item.id} item={item} _toggleModal={this._toggleModal} onPress={() => this.props.navigation.navigate('ProductDetail', { detail: item })} />}
                        />
                }
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
                                    <Text style={Styles.msgText}>Delete Product</Text>
                                    <Text style={[Styles.msgText, { fontSize: 14, marginHorizontal: 40 }]}>Would you like to delete this product?</Text>
                                </View>
                                <View style={Styles.btnCon}>
                                    <TouchableOpacity style={[Styles.btn, { borderRightWidth: 0.5 }]} onPress={() => this.setState({ isModalVisible: false })} >
                                        <Text style={Styles.btnText}>Cencel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={Styles.btn} onPress={() => this.deleteProduct()}>
                                        <Text style={[Styles.btnText, { color: 'red' }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </Modal>
            </View>
        );
    }
}
