
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Image, TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import { DrawerActions } from 'react-navigation';
import Modal from "react-native-modal";
import Toast from 'react-native-simple-toast';
import { Metrics } from '../../../Themes';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import Store from '../../../Stores';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api'
export default class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isModalDelete: false,
            shop_id: ''
        }
    }

    static navigationOptions = { header: null }
    deleteShop = async () => {
        if (store.SELECTED_SHOP.memberStatus === 'shopOwner') {
            this.setState({ loading: true })
            let params = {
                shopId: this.state.shop_id,
                userId: store.LOGIN_RESPONSE.userDetail.id
            }
            console.log('params=>',params);
            
            let delResponse = await api.post('deleteShop', params);
            console.log('response=>',delResponse);
            if (delResponse.status === true) {
                store.PRODUCT_DETAIL = [];
                store.PRODUCTS = [];
                Toast.show(delResponse.message);
                let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
                // console.log('dataRes===>', dataRes);
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
                    this.setState({
                        loading: false,
                        isModalDelete: false
                    })
                    this.props.navigation.push('Shops')
                }
            } else {
                this.setState({ loading: false })
            }
        } else {
            Toast.show('You are not authorized to create a category in this shop.', Toast.LONG)
        }
    }
    _deleteShop = async (id) => await this.setState({ isModalDelete: !this.state.isModalDelete, shop_id: id });
    setProduct(shop) {
        store.SELECTED_SHOP_NAME = shop.shop_name;
        store.SELECTED_SHOP = shop;
        store.CATEGORIES = [];
        store.PRODUCTS = [];
        for (let k = 0; k < store.PRODUCT_DETAIL.length; k++) {
            if (store.PRODUCT_DETAIL[k].shop.id === shop.id && store.PRODUCT_DETAIL[k].shop.checkStatus === false) {
                store.PRODUCT_DETAIL[k].shop.index = k;
                store.PRODUCT_DETAIL[k].shop.checkStatus = true;
                store.PRODUCT_DETAIL[k].shop.selected = true;
                store.CATEGORIES = store.PRODUCT_DETAIL[k].shop.category; // add categories into store array
                // console.log('selete category==>>',store.CATEGORIES);

                for (let i = 0; i < store.PRODUCT_DETAIL[k].shop.category.length; i++) {
                    for (let j = 0; j < store.PRODUCT_DETAIL[k].shop.category[i].categories.products.length; j++) {
                        store.PRODUCTS.push(store.PRODUCT_DETAIL[k].shop.category[i].categories.products[j]);
                        this.setState({ loading: false })
                    }
                }
                store.PRODUCTS = store.PRODUCTS.sort((a,b) => (a.daysToExpire > b.daysToExpire) ? 1 : ((b.daysToExpire > a.daysToExpire) ? -1 : 0));  
                //  console.log('select categ=',store.CATEGORIES);
                //  console.log('select products=',store.PRODUCTS);
                store.DRAWER = true;
                this.props.navigation.push('Drawer');
            } else {
                store.PRODUCT_DETAIL[k].shop.checkStatus = false;
                store.PRODUCT_DETAIL[k].shop.selected = false;
            }
        }
    }
    render() {
        let { orderStore } = Store;
        return (
            <View style={styles.container}>
                <View style={styles.shopListView}>
                    <FlatList
                        data={orderStore.PRODUCT_DETAIL}
                        style={{ flex: 1, marginBottom: 25 }}
                        renderItem={({ item }) =>
                            <TouchableOpacity style={styles.drawerItem}
                                onPress={() => { this.setProduct(item.shop) }}
                                delayLongPress={2000}
                                onLongPress={() => {
                                    if (item.shop.category.length === 0) {
                                        this._deleteShop(item.shop.id)
                                    } else {
                                        Toast.show('Please press the Shop to move forward')
                                    }
                                }}>
                                <Image style={[Styles.icons, { height: Metrics.screenHeight * 0.05, width: Metrics.screenWidth * 0.06 }]} source={images.cart} />
                                <View >
                                    <Text style={styles.shopName}>{item.shop.shop_name}</Text>
                                    <Text style={[styles.shopName, { fontSize: 10 }]}>{item.shop.memberStatus === 'shopMember' ? 'You have limited rights for this shop' : null}</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <Image style={[Styles.icons, { height: Metrics.screenHeight * 0.02 }]} source={images.whiteRightarrow} />
                                </View>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <Modal
                    isVisible={this.state.isModalDelete}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    backdropColor='white'
                    backdropOpacity={0.50}>
                    {
                        this.state.loading ?
                            <View style={styles.modelConDel}>
                                <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                            </View>
                            :
                            <View style={styles.modelConDel}>
                                <View style={styles.msgCon}>
                                    <Text style={styles.msgText}>Delete Shop</Text>
                                    <Text style={[styles.msgText, { fontSize: 14, marginHorizontal: 40 }]}>Would you like to delete this shop?</Text>
                                </View>
                                <View style={styles.btnConDel}>
                                    <TouchableOpacity style={[styles.btn, { borderRightWidth: 0.5 }]} onPress={() => this.setState({ isModalDelete: false })} >
                                        <Text style={[styles.btnText, { color: 'black' }]}>Cencel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btn} onPress={() => this.deleteShop()}>
                                        <Text style={[styles.btnText, { color: 'red' }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                    }
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row'
    },
    shopListView: {
        height: Metrics.screenHeight * 1,
        width: Metrics.screenWidth * 0.70,
        backgroundColor: '#3c5abc',

    },
    drawerItem: {
        height: Metrics.screenHeight * 0.08,
        width: Metrics.screenWidth * 0.65,
        alignSelf: 'center',
        borderColor: '#f9f9f9',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        flexDirection: 'row'
    },
    shopName: {
        fontSize: 15,
        color: '#f9f9f9',
        marginHorizontal: 10
    },
    categoryItem: {
        height: Metrics.screenHeight * 0.09,
        width: Metrics.screenWidth * 0.65,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
        elevation: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row'
    },
    modelCon: {
        height: Metrics.screenHeight * 0.35,
        width: Metrics.screenWidth * 0.90,
        backgroundColor: '#f9f9f9',
        alignSelf: 'center',
        borderRadius: 5,
        elevation: 10,
    },
    header: {
        height: Metrics.screenHeight * 0.06,
        // width: Metrics.screenWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3c5abc',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    headerText: {
        fontSize: 17,
        color: 'white',
    },
    shop: {
        height: Metrics.screenHeight * 0.10,
        width: Metrics.screenWidth * 0.80,
        // backgroundColor:'red',
        alignSelf: 'center'
    },
    text: {
        fontSize: 12,
        color: '#3c5abc'
    },
    pickerCon: {
        height: Metrics.screenHeight * 0.055,
        width: Metrics.screenWidth * 0.80,
        justifyContent: 'center',
        // alignItems:'center',
        alignSelf: 'center',
        // backgroundColor:'red',
        borderColor: '#3c5abc',
        borderWidth: 0.5,
        borderRadius: 5,
        marginVertical: 5
    },
    picker: {
        height: Metrics.screenHeight * 0.04,
        width: Metrics.screenWidth * 0.79,
        justifyContent: 'center',
        alignSelf: 'center',
        // fontSize: 12,
        color: '#3c5abc',
        // backgroundColor:'red',
    },
    pickerItem: {
        fontSize: 12,
        color: '#3c5abc',
        padding: 10
    },
    category: {
        flex: 1,
        fontSize: 12,
        color: '#3c5abc',
        alignSelf: 'stretch',
        height: Metrics.screenHeight * 0.06,
    },
    btnCon: {
        height: Metrics.screenHeight * 0.05,
        width: Metrics.screenWidth * 0.80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginVertical: 8,
        backgroundColor: '#3c5abc'
    },
    btnText: {
        fontSize: 15,
        color: 'white',
    },
    modelConDel: {
        height: Metrics.screenHeight * 0.25,
        width: Metrics.screenWidth * 0.8,
        backgroundColor: '#f9f9f9',
        alignSelf: 'center',
        borderRadius: 10,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    msgCon: {
        height: Metrics.screenHeight * 0.17,
        width: Metrics.screenWidth * 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnConDel: {
        height: Metrics.screenHeight * 0.08,
        width: Metrics.screenWidth * 0.8,
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderColor: 'gray'
    },
    btn: {
        height: Metrics.screenHeight * 0.08,
        width: Metrics.screenWidth * 0.4,

        justifyContent: 'center',
        alignItems: 'center'
    },
});