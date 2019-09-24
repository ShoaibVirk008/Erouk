
import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal";
import { height, width, totalSize } from 'react-native-dimension';
//import FCM, { NotificationActionType, NotificationOpen, Notification } from "react-native-fcm";
import ProductItem from './ProductItem';
import { Icon } from 'react-native-elements';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';

@observer export default class DeletedProductList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            product_id: 0,
            loading: false
        }
    }
    componentWillMount = async( ) => {
        
    }
    static navigationOptions =  ({ navigation,props }) => ({
        headerTitle: 'Product History',
        // headerRight: (<View style={Styles.headerRight}><Image source={images.searchIcon} style={Styles.icons} /></View>),
        // headerLeft: (<TouchableOpacity style={Styles.headerLeft} onPress={() => navigation.push('ViewProfile')}><Image source={images.profileIcon} style={Styles.icons} /></TouchableOpacity>),
        // headerBackTitle: null,
        // initialRouteName: 'Shops',
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
    render() {
        return (
            <View style={Styles.container}>
                <View style={{ height: height(5), width: width(100), backgroundColor: 'white' }}>
                    {/* <Text style={Styles.shopName}>{store.SELECTED_SHOP_NAME}</Text> */}
                    <Text style={Styles.shopName}>All Deleted Products</Text>
                </View>
                <FlatList
                    data={store.DELETED_HISTORY}
                    renderItem={(item) => <ProductItem key={item.id} item={item} _toggleModal={this._toggleModal} onPress={() => this.props.navigation.navigate('DeletedProductDetail', { detail: item })} />}
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