
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, Switch, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, Vibration
} from 'react-native';
import { height, width, totalSize } from 'react-native-dimension';
import { Avatar, Button } from 'react-native-elements';
import Toast from 'react-native-simple-toast';
import { Metrics } from '../../../Themes';
import Modal from "react-native-modal";
import Styles from '../../Styles/CategoryStyles';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
import { Icon } from 'react-native-elements';

const DURATION = 10000
const PATTERN = [1000, 2000, 3000]
var scrnHeight = Metrics.screenHeight;
var scrWidth = Metrics.screenWidth;
@observer export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isModalVisible: false,
            isEditModalVisible: false,
            isCatagoryModalVisible: false,
            isEditCatModalVisible: false,
            catagory_name: '',
            catagory_id: '',
            shop_name: '',
            edit_shop_name: '',
            Loading_edit_shop_name:false,
            vibrate: false,
            sound: false
        }
    }
    static navigationOptions = {
        headerTitle: 'Settings',
        // headerLeft: (<View style = { Styles.headerLeft }><Image source = { images.addUser } style = { [Styles.icons,{height: Metrics.screenWidth*0.06}] } /></View>),
        // headerRight: (<View style = { Styles.headerRight }><Image source = { images.searchIcon } style = { Styles.icons } /></View>),
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
    componentWillMount = async () => {
        //API calling for Deleted Api History
        this.setState({ loading: true, edit_shop_name: store.SELECTED_SHOP_NAME })
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopId: store.SELECTED_SHOP.id
        }
        let response = await api.post('deleteProductHistory', params);
        if (response.status) {
            store.DELETED_HISTORY = response.data;
            this.setState({ loading: false })
        } else {
            this.setState({ loading: false })
        }
        // console.log('response Deleted====>>>', store.DELETED_HISTORY);
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    _toggleModalEdit = () =>
        this.setState({ isEditModalVisible: !this.state.isEditModalVisible });
    _toggleModalCatagory = () =>
        this.setState({ isCatagoryModalVisible: !this.state.isCatagoryModalVisible });
    _toggleModalEditCatagory = (id, name) =>
        this.setState({
            catagory_name: name,
            cataory_id: id,
            isEditCatModalVisible: !this.state.isEditCatModalVisible,
        });
    createShop = async () => {
        this.setState({ loading: true })
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopName: this.state.shop_name
        }
        let response = await api.post('createShop', params);
        if (response.status === true) {
            Toast.show(response.Message);
            store.PRODUCT_DETAIL = [];
            store.PRODUCTS = [];
            let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
            if (dataRes.status) {
                store.PRODUCT_DETAIL = dataRes.data;
                this.props.navigation.push('Shops')
            }
            this.setState({
                loading: false,
                isModalVisible: !this.state.isModalVisible
            })
        } else {
            Toast.show(response.Message);
            this.setState({ loading: false })
        }
    }
    editShop = async () => {
        if (this.state.edit_shop_name.length !== 0) {
            this.setState({Loading_edit_shop_name:true})
            let params = {
                shopId: store.SELECTED_SHOP.id,
                name: this.state.edit_shop_name
            }
            let response = await api.post('editShop', params)
            if (response.status) {
                Toast.show(response.message)
                this.setState({
                    isEditModalVisible: !this.state.isEditModalVisible
                })
                this.setState({Loading_edit_shop_name:false})
            } else {
                Toast.show(response.message)
                this.setState({
                    isEditModalVisible: !this.state.isEditModalVisible
                })
                this.setState({Loading_edit_shop_name:false})
            }
        } else {
            Toast.show('Please Enter Shop name')
        }
    }
    editCatagory = async () => {
        if (this.state.catagory_name.length !== 0 || this.state.catagory_id.length !== 0) {
            Toast.show('Catagory name has been updated')
            this.setState({
                isEditCatModalVisible: !this.state.isEditCatModalVisible
            })
        } else {
            this.setState({ loading: true })
            let params = {
                userId: store.LOGIN_RESPONSE.userDetail.id,
                shopName: this.state.shop_name
            }
            let response = await api.post('editeShop', params);
            if (response.status === true) {
                Toast.show(response.Message);
                store.PRODUCT_DETAIL = [];
                store.PRODUCTS = [];
                let dataRes = await api.post('getshopInfo', { userId: store.LOGIN_RESPONSE.userDetail.id });
                if (dataRes.status) {
                    store.PRODUCT_DETAIL = dataRes.data;
                    this.props.navigation.push('Shops')
                }
                this.setState({
                    loading: false,
                    isEditCatModalVisible: !this.state.isEditCatModalVisible
                })
            } else {
                Toast.show(response.Message);
                this.setState({ loading: false })
            }
        }
    }
    _vibrationControl = (value) => {
        this.setState({ vibrate: value })
        if (value) {
            Vibration.vibrate(DURATION)

            // Android: vibrate for 10s
            // iOS: duration is not configurable, vibrate for fixed time (about 500ms)

            // Vibration.vibrate(PATTERN)
            // Android: wait 1s -> vibrate 2s -> wait 3s
            // iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate

            // Vibration.vibrate(PATTERN, true)
            // Android: wait 1s -> vibrate 2s -> wait 3s -> wait 1s -> vibrate 2s -> wait 3s -> ...
            // iOS: wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> wait 1s -> vibrate -> wait 2s -> vibrate -> wait 3s -> vibrate -> ...
        } else {
            Vibration.cancel()
            // Android: vibration stopped
            // iOS: vibration stopped
        }
    }
    render() {
        let data = store.LOGIN_RESPONSE.userDetail;
        return (
            <View style={styles.container}>
                {
                    this.state.loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size='large' color='#3c5abc' animating={true} />
                        </View>
                        :
                        <ScrollView>
                            <TouchableOpacity style={styles.profileCard} onPress={() => this.props.navigation.push('ViewProfile')}>
                                <Avatar
                                    large
                                    rounded
                                    source={require('../../../Images/man.png')}
                                    // onPress={() => console.log("Works!")}
                                    activeOpacity={0.7}
                                    containerStyle={{ alignSelf: 'center', marginVertical: 10 }}
                                />
                                {/* <Text style={{fontSize: 10,alignSelf:'center'}}>{data.login_from}</Text> */}
                                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                    <Text style={styles.labelText}>{data.name}</Text>
                                </View>
                                <Text style={[[styles.labelText, { fontSize: 14, color: 'gray', opacity: 0.7 }]]}>{store.SELECTED_SHOP_NAME}</Text>
                            </TouchableOpacity>
                            <Text style={styles.titleText}>Account Settings</Text>
                            <View style={styles.cardView}>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Admin Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{data.name}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={[styles.strip, { borderBottomWidth: 0.5 }]} onPress={() => {
                                    if (store.SELECTED_SHOP.memberStatus === 'shopOwner') {
                                        this.props.navigation.push('TeamMembers')
                                    } else {
                                        Toast.show('You are not authorized to see the Team Members of this shop.', Toast.LONG)
                                    }
                                }}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Team Members</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>View</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.strip, { borderBottomWidth: 0.5 }]} onPress={() => this.props.navigation.push('NotificationSetting')}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Expiry Date Notification</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Image style={{ height: scrnHeight * 0.02, width: scrWidth * 0.05, resizeMode: 'contain', margin: 0, marginHorizontal: 3, marginTop: 0 }} source={images.rightArrowIcon} />
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Vibrate</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Switch
                                            disabled={false}
                                            trackColor='white'
                                            ios_backgroundColor='white'
                                            onValueChange={(value) => { this._vibrationControl(value) }}
                                            thumbColor='#3c5abc'
                                            value={this.state.vibrate}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.strip, { borderBottomWidth: 0 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Sound</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Switch
                                            disabled={false}
                                            trackColor='white'
                                            ios_backgroundColor='white'
                                            onValueChange={() => this.setState({ sound: !this.state.sound })}
                                            thumbColor='#3c5abc'
                                            value={this.state.sound}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.titleText}>Current Shop Setting</Text>
                            <View style={[styles.cardView, { height: Metrics.screenHeight * 0.25 }]}>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Shop Name</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{store.SELECTED_SHOP_NAME}</Text>
                                    </View>
                                    <View style={{ width: width(1) }}></View>
                                    <View style={{ justifyContent: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this._toggleModalEdit()} style={{ width: totalSize(3), height: totalSize(3), backgroundColor: '#3c5abc', borderRadius: 100, elevation: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name='edit' size={totalSize(2)} type='material-icon' color='#dedede' />
                                        </TouchableOpacity>
                                    </View>



                                </View>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Time Zone</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>GMT+05:00</Text>
                                    </View>
                                </View>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Total Categories</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{store.CATEGORIES.length}</Text>
                                    </View>
                                    <View style={{ width: width(1) }}></View>
                                    <View style={{ justifyContent: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => this._toggleModalCatagory()} style={{ width: totalSize(3), height: totalSize(3), backgroundColor: '#3c5abc', borderRadius: 100, elevation: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                                            <Icon name='edit' size={totalSize(2)} type='material-icon' color='#dedede' />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Total Products</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{store.PRODUCTS.length} / Unlimited</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.strip} onPress={() => this.props.navigation.push('DeletedProductList')}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Deleted History</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{store.DELETED_HISTORY.length}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* <Text style={styles.titleText}>Payment Setting</Text>
                            <View style={[styles.cardView, { height: Metrics.screenHeight * 0.1 }]}>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Product Count</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>0 / Unlimited</Text>
                                    </View>
                                </View>
                                <View style={styles.strip}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Premium Payment</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>Expire at: 22 Sept. 2010</Text>
                                    </View>
                                </View>
                            </View> */}
                            <Text style={styles.titleText}>Change Shop</Text>
                            <View style={[styles.cardView, { marginBottom: 30, height: Metrics.screenHeight * 0.1 }]}>
                                <View style={[styles.strip, { borderBottomWidth: 0.5 }]}>
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>My Shops</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}>{store.PRODUCT_DETAIL.length}</Text>
                                    </View>
                                </View>
                                <View style={styles.strip}>
                                    <Icon name='add' size={totalSize(2.5)} type='material-icon' color='#3c5abc' />
                                    <TouchableOpacity style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} onPress={() => this.setState({ isModalVisible: true })}>
                                        <Text style={[styles.stripText, { color: '#3c5abc' }]}>Add New Shop</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                        <Text style={styles.stripText}></Text>
                                    </View>
                                </View>
                            </View>
                            <Modal
                                isVisible={this.state.isModalVisible}
                                animationIn='zoomInDown'
                                animationOut='zoomOutUp'
                                onBackdropPress={this._toggleModal}
                            >
                                <View style={[Styles.modelCon, { height: height(30) }]}>
                                    <View style={Styles.header}>
                                        <Text style={Styles.headerText}>Add Shop</Text>
                                    </View>
                                    <View style={Styles.shop}>
                                        <Text style={[Styles.text, { marginTop: 10 }]}>Shop</Text>
                                        <View style={Styles.pickerCon}>
                                            <TextInput
                                                style={Styles.category}
                                                // value={''}
                                                onChangeText={(value) => { this.setState({ shop_name: value }) }}
                                                placeholder='Enter Shop Name'
                                                placeholderTextColor={'#dedede'}
                                                underlineColorAndroid='transparent'
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={() => this.createShop()}>
                                        <Text style={Styles.btnText}>Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal
                                isVisible={this.state.isEditModalVisible}
                                animationIn='zoomInDown'
                                animationOut='zoomOutUp'
                                onBackdropPress={this._toggleModalEdit}
                            >
                                <View style={[Styles.modelCon, { height: height(30) }]}>
                                    <View style={Styles.header}>
                                        <Text style={Styles.headerText}>Edit Shop</Text>
                                    </View>
                                    <View style={Styles.shop}>
                                        <Text style={[Styles.text, { marginTop: 10 }]}>Shop</Text>
                                        <View style={Styles.pickerCon}>
                                            <TextInput
                                                style={Styles.category}
                                                // value={''}
                                                onChangeText={(value) => { this.setState({ edit_shop_name: value }) }}
                                                value={this.state.edit_shop_name}
                                                placeholderTextColor={'#dedede'}
                                                underlineColorAndroid='transparent'
                                            />
                                        </View>
                                    </View>
                                    <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={() => this.editShop()} >
                                        {
                                            this.state.Loading_edit_shop_name?
                                            <ActivityIndicator size='small' color='white'/>
                                            :
                                            <Text style={Styles.btnText}>Update</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </Modal>
                            <Modal
                                isVisible={this.state.isCatagoryModalVisible}
                                animationIn='zoomInDown'
                                animationOut='zoomOutUp'
                                onBackdropPress={this._toggleModalCatagory}
                            >
                                <View style={[Styles.modelCon, { height: height(60) }]}>
                                    <View style={Styles.header}>
                                        <Text style={Styles.headerText}>Cataory</Text>
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                        {
                                            store.CATEGORIES.map((item, key) => {
                                                return (
                                                    <View key={key} style={{ height: height(5), width: width(80), borderColor: 'gray', borderBottomWidth: 0.5, marginVertical: 2, flexDirection: 'row', justifyContent: 'center' }}>
                                                        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <Text >{item.categories.category_name}</Text>
                                                        </View>
                                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                                                            <TouchableOpacity onPress={() => this._toggleModalEditCatagory(item.categories.id, item.categories.category_name)} style={{ width: totalSize(3), height: totalSize(3), backgroundColor: '#3c5abc', borderRadius: 100, elevation: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                                                                <Icon name='edit' size={totalSize(2)} type='material-icon' color='white' />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                        <Modal
                                            isVisible={this.state.isEditCatModalVisible}
                                            animationIn='zoomInDown'
                                            animationOut='zoomOutUp'
                                            onBackdropPress={this._toggleModalEditCatagory}
                                        >
                                            <View style={[Styles.modelCon, { height: height(30) }]}>
                                                <View style={Styles.header}>
                                                    <Text style={Styles.headerText}>Edit Catagory</Text>
                                                </View>
                                                <View style={Styles.shop}>
                                                    <Text style={[Styles.text, { marginTop: 10 }]}>Catagory</Text>
                                                    <View style={Styles.pickerCon}>
                                                        <TextInput
                                                            style={Styles.category}
                                                            // value={''}
                                                            onChangeText={(value) => { this.setState({ catagory_name: value }) }}
                                                            value={this.state.catagory_name}
                                                            placeholderTextColor={'#dedede'}
                                                            underlineColorAndroid='transparent'
                                                        />
                                                    </View>
                                                </View>
                                                <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={() => this.editCatagory()} >
                                                    <Text style={Styles.btnText}>Update</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Modal>
                                    </View>

                                </View>
                            </Modal>
                        </ScrollView>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    profileCard: {
        height: Metrics.screenHeight * 0.25,
        width: Metrics.screenWidth * 0.9,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 3,
        marginVertical: 10,
        borderRadius: 5
    },
    labelText: {
        fontSize: 16,
        color: '#3c5abc',
        alignSelf: 'center'
    },
    titleText: {
        fontSize: 14,
        color: 'gray',
        opacity: 0.7,
        marginHorizontal: 35,
        marginVertical: 5
    },
    cardView: {
        height: Metrics.screenHeight * 0.25,
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