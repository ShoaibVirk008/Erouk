
import React, { Component } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import ProductList from './ProductList';
import Modal from "react-native-modal";
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import Metrics from '../../../Themes/Metrics';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';

@observer
export default class Products extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            loading: false
        }
    }
    static navigationOptions = {
        title: 'Product List',
        // headerRight: (<View style={{ width: Metrics.screenWidth - Metrics.screenWidth * 0.75, flexDirection: 'row', justifyContent: 'center' }}>
        //     <Image source={images.addMemberIcon} style={[Styles.icons, { marginRight: 20 }]} />
        //     <Image source={images.searchIcon} style={Styles.icons} />
        // </View>),
        // headerLeft: (<View style = { Styles.headerLeft }><Image source = { images.profileIcon } style = { Styles.icons } /></View>),
        headerBackTitle: null,
    }
    _toggleModal = (id) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
        });
        store.product_id = id
        // console.warn('id', store.product_id);
    }
    deleteProduct = async () => {
        store.PRODUCT_DETAIL = [];
        store.PRODUCTS = [];
        this.setState({ loading: true })
        let params = {
            productId: store.product_id
        }
        let del = await api.post('deleteProduct', params);
        if (del.status === true) {
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
                store.PRODUCTS = store.PRODUCTS.sort((a,b) => (a.daysToExpire > b.daysToExpire) ? 1 : ((b.daysToExpire > a.daysToExpire) ? -1 : 0));
                console.log('prod===>>',store.PRODUCTS);
                
                this.setState({ isModalVisible: false })
            }
            this.setState({ loading: false })
            Toast.show(del.message);
            this.props.navigation.push('Drawer')
        }
        // console.log('loginResponse=');
    }
    goTo = (reute, params) => {
        this.props.navigation.navigate(reute, params);
    }
    render() {
        let { params } = this.props.navigation.state;
        return (
            <View style={Styles.container}>
                <TouchableOpacity style={styles.addProductButton} onPress={() => this.goTo('AddProduct', null)} >
                    <Text style={styles.buttonText}>Add</Text >
                </TouchableOpacity>
                <FlatList
                    data={params.products}
                    renderItem={(item) => <ProductList item={item} _toggleModal={this._toggleModal} onPress={() => this.goTo('ProductDetail', { detail: item })} />}
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

const styles = StyleSheet.create({
    addProductButton: {
        width: Metrics.screenWidth * 0.93,
        height: Metrics.screenHeight * 0.065,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3c5abc',
    },
    buttonText: {
        fontSize: 14,
        color: '#dadada'
    }
})