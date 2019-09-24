
import React, { Component } from 'react';
import { Platform, TouchableOpacity, Text, View, ScrollView, Dimensions, Image, TextInput, Picker, ActivityIndicator } from 'react-native';
import Styles from '../../Styles/AddProductStyles';
import images from '../../../Themes/Images';
import Metrics from '../../../Themes/Metrics';
import { Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import FullButton from '../../../Components/FullButton';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
import BarCodeScanner from './BarCodeScanner'
@observer
export default class AddProduct extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isDateTimePickerVisible: false,
            barCode: '',
            productName: '',
            shopID: '',
            cateID: '',
            dateTime: '',
            avatarSource: null,
            image: null,
            recoveryImg: null,
            is_editable: true,
            product_id: ''
        }
    }
    static navigationOptions = {
        title: 'Add Products',
        // headerRight: (<View style={Styles.headerRight}><Text>Save</Text></View>),
        // headerLeft: (<View style = { Styles.headerLeft }></View>),
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
    async componentWillMount() {
        //API for get Shops
        // let params = {
        //     userId: store.LOGIN_RESPONSE.userDetail.id,
        // }
        // let response = await api.post('getShops', params);
        // store.SHOPS_LIST = response.data;
        // getting categories
        // console.warn('shop id=>>>', store.SELECTED_SHOP.id);
        await this.getCategory(store.SELECTED_SHOP.id); // get categories by keeping shop static
    }
    getCategory = async (itemValue) => {
        // console.warn(itemValue);
        this.setState({
            shopID: store.SELECTED_SHOP.id,
            loading: true
        })
        //API for get Category
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopId: itemValue
        }
        let response = await api.post('getCategories', params);
        if (response.status === true) {
            store.CATEGORY_LIST = response.data;
            this.setState({ loading: false })
        }
    }
    openImagePicker = () => {
        ImagePicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            includeExif: true,
            avoidEmptySpaceAroundImage: true,
        }).then(image => {
            // this.image_update(image)
            //  console.log('received image', image);
            this.setState({
                avatarSource: { uri: image.path, type: image.mime, name: 'testPhoto' },
                image: { uri: image.path, width: image.width, height: image.height },
            });
        }).catch(e => alert(e));
    }
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        // console.log('A date has been picked: ', date);
        this.setState({ dateTime: date })
        this._hideDateTimePicker();
    };
    _toggleModal = () => {
        for (let i = 0; i < store.PRODUCT_DETAIL.length; i++) {
            const element = array[i];
        }
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    _barCode = (num) => this.setState({ barCode: num })

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        var date = [year, month, day].join('-');
        this.setState({ dateTime: date })
        // console.warn('date=', this.state.dateTime);

        return [year, month, day].join('-');
    }
    formValidation = () => {
        if ( this.state.barCode.length === 0) {
            Toast.show('Please enter a barcode number or scan the barcode')
        } else {
            if (this.state.productName.length === 0) {
                Toast.show('Please enter a name of product')
            } else {
                if (this.state.cateID.length === 0) {
                    Toast.show('Please select a category')
                } else {
                    if (this.state.avatarSource === null) {
                        Toast.show('Please take an image')
                    } else {
                        if (this.state.dateTime.length === 0) {
                            Toast.show('Please enter a the expiry date')
                        } else {
                            this.createProduct()
                        }
                    }
                }
            }
        }
    }
    reCall = async () => {
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
            console.log('prod===>>',store.PRODUCTS);
            // console.log('Product after added===>>>>', store.PRODUCTS);
            this.props.navigation.push('Shops')
        }
    }
    createProduct = async () => {
        store.PRODUCT_DETAIL = [];
        store.PRODUCTS = [];
        var date = await this.formatDate(this.state.dateTime)
        const formData = new FormData();
        const photo = this.state.avatarSource;
        formData.append('userId', store.LOGIN_RESPONSE.userDetail.id);
        formData.append('barCode', this.state.barCode);
        formData.append('productName', this.state.productName);
        formData.append('shopId', store.SELECTED_SHOP.id);
        formData.append('categoryId', this.state.cateID);
        formData.append('quantity', 1);
        formData.append('expiryDate', date);
        // console.log('formData=>>>', formData);
        if (this.state.avatarSource !== null) {
            formData.append('image', photo);
        }

        this.setState({ loading: true })
        await fetch('http://erouk.com/eroukApi/api/addProduct', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then(func = async (response) => {
                // console.log('Productresponse==', response);
                this.setState({ loading: false })
                if (response.status) {
                    Toast.show(response.message);
                    await this.reCall()
                    await this.setState({
                        loading: false,
                        barCode: '',
                        productName: '',
                        cateID:'',
                        dateTime: '',
                        image: null,
                        avatarSource:null,
                    })
                } else {
                    this.setState({
                        barCode: response.data.barcode,
                        productName: response.data.product_name,
                        dateTime: response.data.expiry_date,
                        recoveryImg: response.data.image,
                        product_id: response.data.id,
                        is_editable: false
                    })
                    Toast.show(response.message, Toast.LONG);
                }
            }).catch((error) => {
                console.log('error is=', error);
                this.setState({ loading: false })
            });
    }
    expiryDateChange = async () => {
        this.setState({ loading: true })
        //API for get Shops
        let params = {
            productId: this.state.product_id,
            expiryDate: this.state.dateTime
        }
        let response = await api.post('updateProductExpiryDate', params);
        if (response.success) {
            await this.reCall()
            await this.setState({
                loading: false,
                barCode: '',
                productName: '',
                dateTime: '',
                image: null,
                is_editable: true
            })
            Toast.show(response.message, Toast.LONG);
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
            Toast.show(response.message, Toast.LONG);
        }
    }
    render() {
        return (
            <View style={Styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View style={Styles.barCoderow}>
                        <Text style={Styles.labelText}>Barcode Number</Text>
                        <View style={Styles.InputView}>
                            <TextInput
                                style={Styles.codeInputWidth}
                                onChangeText={(value) => { this.setState({ barCode: value }) }}
                                underlineColorAndroid='transparent'
                                keyboardType='number-pad'
                                editable={this.state.is_editable}
                                value={this.state.barCode.length > 0 ? this.state.barCode : null}
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.push('BarCodeScanner', { barCode: this._barCode })}>
                                <Image source={images.barcodeImage} style={Styles.barCodeImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <Text style={Styles.labelText}>Product Name</Text>
                        <View style={Styles.InputView}>
                            <TextInput
                                style={Styles.textInput}
                                value={this.state.productName}
                                editable={this.state.is_editable}
                                onChangeText={(value) => { this.setState({ productName: value }) }}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <Text style={Styles.labelText}>Shop</Text>
                        <View style={[Styles.pickerCon, { alignItems: 'flex-start' }]} >
                            <Text style={[Styles.pickerItem, { marginHorizontal: 15 }]}>{store.SELECTED_SHOP_NAME}</Text>
                        </View>
                    </View>
                    <View style={Styles.row}>
                        <Text style={Styles.labelText}>Category</Text>
                        <View style={Styles.pickerCon} >
                            <Picker
                                mode='dropdown'
                                selectedValue={this.state.cateID}
                                itemStyle={Styles.pickerItem}
                                enabled={this.state.is_editable}
                                style={Styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({ cateID: itemValue })}>
                                <Picker.Item label="Select Category" />
                                {
                                    store.CATEGORIES.map((item, key) => {
                                        return (
                                            <Picker.Item key={key} label={item.categories.category_name} value={item.categories.id} />
                                        );
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <DateTimePicker
                        mode="date"
                        format="DD-MM-YYYY"
                        isVisible={this.state.isDateTimePickerVisible}
                        onDateChange={(date) => { this.formatDate(date) }}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                        datePickerModeAndroid={'spinner'}
                    />
                    <View style={Styles.row}>
                        <Text style={Styles.labelText}>Expiry Date</Text>
                        <View style={Styles.InputView}>
                            <TextInput
                                style={Styles.textInput}
                                placeholder={this.state.dateTime}
                                placeholderTextColor="#818cbf"
                                onFocus={() => this._showDateTimePicker()}
                            />
                        </View>
                    </View>
                    <View style={Styles.secondRow}>
                        <View style={[Styles.imageUploadRow, { height: this.state.image === null ? Metrics.screenHeight * 0.20 : null }]}>
                            <TouchableOpacity style={Styles.imgUploadButton} onPress={() => this.openImagePicker()} >
                                <Text style={Styles.buttonLabel} >image upload</Text>
                            </TouchableOpacity>
                            <Image source={this.state.recoveryImg === null ? this.state.image : { uri: this.state.recoveryImg }} style={Styles.productImage} />
                            <View style={Styles.imageStatus} >
                                {/* <Text style={Styles.simpleText}>File Uploaded Successfully!</Text> */}
                            </View>
                        </View>
                        <View style={Styles.emptyrow}></View>
                        {/* <FullButton text={'Add Product'} onPress={() => this.createProduct()} /> */}
                        <TouchableOpacity style={Styles.button} onPress={() => {
                            if (this.state.is_editable) {
                                this.formValidation()
                            } else {
                                this.expiryDateChange()
                            }
                        }}>
                            {
                                this.state.loading ?
                                    <ActivityIndicator size="large" color="white" animating={true} />
                                    :
                                    <Text style={Styles.buttonTextAdd}>Add Product</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
