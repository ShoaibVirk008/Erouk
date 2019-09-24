
import React, { Component } from 'react';
import { View, FlatList, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import CategoryList from './CategoryList';
import Styles from '../../Styles/CategoryStyles';
import images from '../../../Themes/Images';
import { Icon } from 'react-native-elements';
import api from '../../../lib/api'
import { observer } from 'mobx-react'; 
import store from '../../../Stores/orderStore'
import Toast from 'react-native-simple-toast';
import { Metrics } from '../../../Themes';

@observer export default class Category extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isModalVisible: false,
            isModalDelete: false,
            shopId: '',
            cate_name: '',
            cate_id: ''
        }
    }
    // header
    static navigationOptions = {
        headerTitle: 'Category',
        // headerRight: (<View style = { Styles.headerRight }><Image source = { images.profileIcon } style = { Styles.icons } /></View>),
        // headerLeft: (<View style = { Styles.headerLeft }></View>),
        // tabBarIcon: (<Icon name='list' type='simple-line-ico' />),
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
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _deleteCategory = (id) => this.setState({ isModalDelete: !this.state.isModalDelete, cate_id: id });
    async componentWillMount() {
        this.setState({ loading: true })
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        let response = await api.post('getShops', params);
        store.SHOPS_LIST = response.data;
        // store.CATEGORY_LIST = await api.post('getCategories',object);
        // console.log('Shops are =',store.SHOPS_LIST);
        this.setState({ loading: false })
    }
    addCategory = async () => {
        if (this.state.cate_name) {
            store.PRODUCT_DETAIL = [];
            store.PRODUCTS = [];
            this.setState({ loading: true })
            // console.log('Selected shop====>', store.SELECTED_SHOP);
            let params = {
                userId: store.LOGIN_RESPONSE.userDetail.id,
                shopId: store.SELECTED_SHOP.id,
                categoryName: this.state.cate_name
            }
            // console.log('params====>', params);
            let response = await api.post('createCaegory', params);
            // console.log('response===>', response);
            if (response.status === true) {
                Toast.show(response.Message);
                let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
                if (dataRes.status) {
                    store.PRODUCT_DETAIL = dataRes.data;
                    store.DRAWER = true;
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
                store.PRODUCTS = store.PRODUCTS.sort((a,b) => (a.daysToExpire > b.daysToExpire) ? 1 : ((b.daysToExpire > a.daysToExpire) ? -1 : 0));                 }
                this.setState({
                    loading: false,
                    isModalVisible: !this.state.isModalVisible
                })
                this.props.navigation.push('Shops')
            } else {
                this.setState({ loading: false })
            }
        } else {
            Toast.show('Please enter any name of category', Toast.LONG);
        }
    }

    deleteCategory = async () => {
        this.setState({ loading: true })
        let params = {
            categoryId: this.state.cate_id
        }
        let delResponse = await api.post('deleteCategory', params);
        // console.log('DeleteResponse====>>>', delResponse);
        if (delResponse.status === "true") {
            store.PRODUCT_DETAIL = [];
            store.PRODUCTS = [];
            Toast.show(delResponse.message);
            let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
            if (dataRes.status) {
                store.PRODUCT_DETAIL = dataRes.data;
                store.DRAWER = true;
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
                this.setState({
                    loading: false,
                    isModalDelete: !this.state.isModalDelete
                })
                // this.props.navigation.push('Drawer')
                this.props.navigation.push('Shops')
            }
        } else {
            this.setState({ loading: false })
        }
        // console.log('loginResponse=');
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        
        return (
            <View style={Styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={Styles.InputView}>
                        {/* <TextInput
                            style={Styles.codeInputWidth}
                            value={''}
                            onChangeText={() => { }}
                            placeholder={'Search'}
                            placeholderTextColor={'#dedede'}
                        />
                        <TouchableOpacity onPress={() => alert('hello')}>
                            <Image source={images.searchIconGrey} style={Styles.barCodeImage} />
                        </TouchableOpacity> */}
                    </View>

                    <View style={{ flex: 1, elevation: 5, marginHorizontal: 5, backgroundColor: '#ffffff', borderRadius: 5, borderTopRightRadius: 0, borderTopLeftRadius: 0, width: Metrics.screenWidth * 0.9, justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                        <TouchableOpacity style={Styles.addProductButton} onPress={this._toggleModal} >
                            <Text style={Styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                        <FlatList
                            data={store.CATEGORIES}
                            renderItem={({ item }) => <CategoryList item={item} _deleteCategory={this._deleteCategory} navigation={this.props.navigation} />}
                        />
                    </View>
                    <Modal
                        isVisible={this.state.isModalVisible}
                        animationIn='zoomInDown'
                        animationOut='zoomOutUp'
                        onBackdropPress={this._toggleModal}
                    >
                        <View style={Styles.modelCon}>
                            <View style={Styles.header}>
                                <Text style={Styles.headerText}>Add Category</Text>
                            </View>
                            <View style={Styles.shop}>
                                <Text style={[Styles.text, { marginTop: 10 }]}>Shop</Text>
                                <View style={Styles.pickerCon}>
                                    <Text style={Styles.pickerItem}>{store.SELECTED_SHOP_NAME}</Text>
                                </View>
                            </View>
                            <View style={Styles.shop}>
                                <Text style={[Styles.text, { marginTop: 10 }]}>Category</Text>
                                <View style={Styles.pickerCon}>
                                    <TextInput
                                        style={Styles.category}
                                        onChangeText={(value) => { this.setState({ cate_name: value }) }}
                                        placeholder='Enter Category Name'
                                        placeholderTextColor={'#dedede'}
                                        underlineColorAndroid='transparent'
                                        autoFocus={true}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={Styles.btnCon} onPress={() => {
                                if (store.SELECTED_SHOP.memberStatus === 'shopOwner') {
                                    this.addCategory()
                                } else {
                                    Toast.show('You are not authorized to create a category in this shop.', Toast.LONG)
                                }
                            }}>
                                <Text style={Styles.btnText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Modal
                        isVisible={this.state.isModalDelete}
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
                                <View style={Styles.modelConDel}>
                                    <View style={Styles.msgCon}>
                                        <Text style={Styles.msgText}>Delete Category</Text>
                                        <Text style={[Styles.msgText, { fontSize: 14, marginHorizontal: 40 }]}>Would you like to delete this Category?</Text>
                                    </View>
                                    <View style={Styles.btnConDel}>
                                        <TouchableOpacity style={[Styles.btn, { borderRightWidth: 0.5 }]} onPress={() => this.setState({ isModalDelete: false })} >
                                            <Text style={[Styles.btnText, { color: 'black' }]}>Cencel</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.btn} onPress={() => {
                                            if (store.SELECTED_SHOP.memberStatus === 'shopOwner') {
                                                this.deleteCategory()
                                            } else {
                                                Toast.show('You are not authorized to create a category in this shop.', Toast.LONG)
                                            }
                                        }}>
                                            <Text style={[Styles.btnText, { color: 'red' }]}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        }
                    </Modal>
                </ScrollView>
            </View>
        );
    }
}

