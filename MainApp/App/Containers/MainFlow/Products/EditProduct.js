import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Picker ,ActivityIndicator } from 'react-native';
import { height, width, totalSize } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Styles from '../../Styles/EditProfileStyles';
import Metrics from '../../../Themes/Metrics';
import size from '../../../Themes/Fonts';
import images from '../../../Themes/Images';
import Toast from 'react-native-simple-toast';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
import Modal from "react-native-modal";

let _this = null;

export default class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isModalVisible: false,
            is_cateModalVisible: false,
            is_imgModelVisible: false,
            name_flag: false,
            camera: false, 
            name: '',
            cate_id: '',
            avatarSource: null,
            image: {}
        };
    }
    static navigationOptions = ({ navigation }) => ({
        title: 'Edit Product',
        headerRight: (<TouchableOpacity style = { Styles.headerRight } onPress={()=>_this.editProduct()}><Text style={{color: 'white',fontSize: totalSize(1.6)}}>Save</Text></TouchableOpacity>),
        // headerLeft: (<View style = { Styles.headerLeft }></View>),
    })
    async componentWillMount() {
        let { item } = this.props.navigation.state.params.detail;
        // console.warn('item==>>',item);
        _this = this;
        await this.setState({
            name: item.product_name,
            cate_id: item.category_id,
        })
        await this.getCategory()
    }
    openImagePicker = () => {
        ImagePicker.openCamera({
            cropping: true,
            width: 500,
            height: 500,
            includeExif: true,
            avoidEmptySpaceAroundImage: true,
        }).then(image => {
            this.setState({
                camera: true, 
                avatarSource: { uri: image.path, type: image.mime, name: 'testPhoto' },
                image: { uri: image.path, width: image.width, height: image.height },
            });
        }).catch(e => alert(e));
    }
    getCategory = async () => {
        this.setState({ loading: true })
        //API for get Category
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopId: store.SELECTED_SHOP.id
        }
        let response = await api.post('getCategories', params);
        if (response.status === true) {
            store.CATEGORY_LIST = response.data;
            this.setState({ loading: false })
        }
    }
    editProduct = async () => {
        let { item } = this.props.navigation.state.params.detail;
        this.setState({ loading: true })
        // FormData Object
        const formData = new FormData();
        const photo = this.state.avatarSource;  
        formData.append('productId', item.id);
        formData.append('productName', this.state.name);
        formData.append('categoryId', this.state.cate_id);
        formData.append('expiryDate', item.expiry_date)
        if ( this.state.avatarSource !== null ) {
            formData.append('image', photo);
        }        
        // console.log('formData===>>>',formData);
        //Api calling
        await fetch('http://erouk.com/eroukApi/api/editProduct', {
            method: 'POST',
            body: formData
        }).then((response) => response.json())
            .then(func = async (response) => {
                //    console.log('response==>>>>>',response);
                this.setState({ loading: false })
                if (response.status) {
                    for (let i = 0; i < store.PRODUCTS.length; i++) {
                        if (item.id === store.PRODUCTS[i].id) {    
                            await this.props.navigation.state.params._updateDetail(response.product);
                            store.PRODUCTS[i].product_name = response.product.product_name;
                            store.PRODUCTS[i].category_id = response.product.category_id;
                            store.PRODUCTS[i].image = response.product.image;
                            // product = response.product;
                            this.setState({ loading: false })
                        }                           
                    }
                    Toast.show(response.message);
                    this.setState({ loading: false })
                } else {
                    this.setState({ loading: false })
                }
            }).catch((error) => {
                console.log('error is=', error);
                this.setState({ loading: false })
            });
    }
    _name = () => this.setState({ isModalVisible: true, name_flag: true });
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    _categoryModal = () => this.setState({ is_cateModalVisible: true })
    _imageModal = () => this.setState({ is_imgModalVisible: !this.state.is_imgModalVisible })

    render() {
        const { item } = this.props.navigation.state.params.detail;
        return (
            <View style={[Styles.container, { justifyContent: 'flex-start' }]}>
                <ScrollView>
                   {
                       this.state.loading?
                            <View style={{ height:height(96),width:width(100) , justifyContent:'center' , alignItems:'center' }}>
                                <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                            </View>
                            :
                            <View style={{ marginVertical: 10, marginHorizontal: 10, borderRadius: 5, backgroundColor: '#ffffff', elevation: 5, width: Metrics.screenWidth * 0.9, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{}}>
                                    <Text style={{ color: '#8091d0', fontSize: size.small }}>Product</Text>
                                    <Text style={{ color: 'gray', fontSize: size.small }}>{this.state.name}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={Styles.editBtn} onPress={this._name}>
                                        <Text style={[Styles.btnText, { fontSize: 12 }]}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ color: '#8091d0', fontSize: size.small }}>BarCode</Text>
                                <Text style={{ color: 'gray', fontSize: size.small }}>{item.barcode}</Text>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ color: '#8091d0', fontSize: size.small }}>Expiry Date</Text>
                                <Text style={{ color: 'gray', fontSize: size.small }}>{item.expiry_date}</Text>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ color: '#8091d0', fontSize: size.small }}>Shop</Text>
                                <Text style={{ color: 'gray', fontSize: size.small }}>{item.shop_name}</Text>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, alignItems: 'flex-start', justifyContent: 'center' }}>
                                <Text style={{ color: '#8091d0', fontSize: size.small }}>Added by</Text>
                                <Text style={{ color: 'gray', fontSize: size.small }}>{item.user_name + '  ' + item.created_at_date + '  ' + item.created_at_time}</Text>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', borderBottomWidth: 1, flexDirection: 'row', width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.09, alignItems: 'center', justifyContent: 'center' }}>
                                <View>
                                    <Text style={{ color: '#8091d0', fontSize: size.small }}>Category</Text>
                                    <Text style={{ color: 'gray', fontSize: size.small }}>{item.category_name}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={Styles.editBtn} onPress={this._categoryModal}>
                                        <Text style={[Styles.btnText, { fontSize: 12 }]}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ borderBottomColor: '#f6f6f6', flexDirection: 'row', borderBottomWidth: 1, width: Metrics.screenWidth * 0.8, height: Metrics.screenHeight * 0.32, alignItems: 'center', }}>
                                <Text style={{ color: '#8091d0', fontSize: size.small }}>Image</Text>
                                {
                                    this.state.camera?
                                        <Image style={{ height: Metrics.screenHeight * 0.25, width: Metrics.screenWidth * 0.5, resizeMode: 'contain', margin: 10 }} source={ this.state.image }></Image>
                                        :
                                        item.image === null?
                                             <Text style={{ fontSize: 20, marginHorizontal: 80 }}>No Image</Text>
                                            :
                                             <Image style={{ height: Metrics.screenHeight * 0.3, width: Metrics.screenWidth * 0.6, resizeMode: 'contain', margin: 10 }} source={{ uri: item.image }}></Image>
                                }
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <TouchableOpacity style={Styles.editBtn} onPress={this.openImagePicker}>
                                        <Text style={[Styles.btnText, { fontSize: 12 }]}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                   }
                </ScrollView>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    onBackdropPress={this._toggleModal}
                >
                    <View style={[Styles.modelCon, { height: height(30) }]}>
                        <View style={Styles.header}>
                            <Text style={Styles.headerText}>Edit Name</Text>
                        </View>
                        <View style={Styles.shop}>
                            <Text style={[Styles.text, { marginTop: 10 }]}>Name</Text>
                            <View style={Styles.pickerCon}>
                                <TextInput
                                    style={Styles.category}
                                    value={this.state.name}
                                    onChangeText={(value) => { this.setState({ name: value }) }}
                                    autoFocus={true}
                                    autoCorrect={true}
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={this._toggleModal}>
                            <Text style={Styles.btnText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.state.is_cateModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    onBackdropPress={this._categoryModal}
                >
                    {/* {
                        this.state.name_flag === true? */}
                    <View style={[Styles.modelCon, { height: height(30) }]}>
                        <View style={Styles.header}>
                            <Text style={Styles.headerText}>Edit Category</Text>
                        </View>
                        <View style={Styles.shop}>
                            <Text style={[Styles.text, { marginTop: 10 }]}>Category</Text>
                            <View style={Styles.pickerCon}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={this.state.cate_id}
                                    itemStyle={Styles.pickerItem}
                                    style={Styles.picker}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ cate_id: itemValue })}>
                                    <Picker.Item label="Select Category" />
                                    {
                                        store.CATEGORY_LIST.map((item, key) => {
                                            return (
                                                <Picker.Item key={key} label={item.category_name} value={item.id} />
                                            );
                                        })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={() => {
                            this.setState({ is_cateModalVisible: false })
                        }}>
                            <Text style={Styles.btnText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                    {/* : null
                    }     */}
                </Modal>
            </View>
        );
    }
}






