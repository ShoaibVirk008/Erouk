
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View, ImageBackground, Image, TextInput, TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { width, height, totalSize } from 'react-native-dimension';
import Toast from 'react-native-simple-toast';
import { Metrics } from '../../../Themes';
import Styles from '../../Styles/CategoryStyles';
import images from '../../../Themes/Images';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore'
import api from '../../../lib/api';

@observer export default class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isModalVisible: false,
            name: '',
            number: '',
            address: '',
            name_flag: false,
            num_flag: false,
            add_flag: false
        }
    }
    static navigationOptions = {
        headerTitle: 'Edit Profile',
        // headerRight: (<View style = { Styles.headerRight }><Image source = { images.searchIcon } style = { Styles.icons } /></View>),
    }
    _name = () => this.setState({ isModalVisible: true ,name_flag:true , num_flag: false , add_flag: false  });

    _number = () => this.setState({ isModalVisible: true ,name_flag: false , num_flag: true , add_flag: false  });

    _address = () => this.setState({ isModalVisible: true ,name_flag: false , num_flag: false , add_flag: true  });

    _toggleModal = () => 
        this.setState({ isModalVisible: !this.state.isModalVisible });

    componentWillMount() {
        this.setState({
            name: store.LOGIN_RESPONSE.userDetail.name,
            number: store.LOGIN_RESPONSE.userDetail.mobile_number,
            address: store.LOGIN_RESPONSE.userDetail.address
        })
    }
    
    editProfile = async () => {
        this.setState({ loading: true })
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            name: this.state.name,
            mobileNumber: this.state.number,
            address: this.state.address
        }
        // API calling
        let response = await api.post('editProfile', params);
        if (response.status) {
            Toast.show(response.Message);
            store.LOGIN_RESPONSE.userDetail = response.data;
            this.setState({ loading: false, isModalVisible: false })
        } else {
            this.setState({ loading: false, isModalVisible: false })
        }
    }
    render() {
        let data = store.LOGIN_RESPONSE.userDetail;
        return (
            <View style={styles.container}>
                <View style={styles.label}>
                    <Text style={styles.labelText}>ADMIN</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.strip}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Name</Text>
                            <Text style={styles.subTitleText}>{data.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.editBtn} onPress={this._name}>
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={ styles.strip }>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Address</Text>
                            <Text style={styles.subTitleText}>{data.address !== null ? data.address : 'Edit your address'}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.editBtn} onPress={this._address}>
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.strip}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Phone no</Text>
                            <Text style={styles.subTitleText}>{data.mobile_number !== null ? data.mobile_number : 'Edit you number'}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <TouchableOpacity style={styles.editBtn} onPress={this._number}>
                                <Text style={styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.strip}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Email</Text>
                            <Text style={styles.subTitleText}>{data.email}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            {/* <TouchableOpacity style={styles.editBtn}>
                          <Text style={styles.btnText}>Edit</Text>
                       </TouchableOpacity>     */}
                        </View>
                    </View>
                    <View style={[styles.strip,{borderBottomWidth: 0}]}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.titleText}>Facebook</Text>
                            <Text style={styles.subTitleText}>{data.fb_url === null ? 'Usamaabutt@facebook.com' : data.fb_url}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            {/* <TouchableOpacity style={styles.editBtn}>
                          <Text style={styles.btnText}>Edit</Text>
                       </TouchableOpacity>     */}
                        </View>
                    </View>
                </View>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    onBackdropPress={this._toggleModal}
                >
                   {
                        this.state.name_flag === true?
                            <View style={[Styles.modelCon, { height: height(30) }]}>
                                <View style={Styles.header}>
                                    <Text style={Styles.headerText}>Edit Name</Text>
                                </View>
                                <View style={Styles.shop}>
                                    <Text style={[Styles.text, { marginTop: 10 }]}>Name</Text>
                                    <View style={Styles.pickerCon}>
                                        <TextInput
                                            style={Styles.category}
                                            // value={''}
                                            onChangeText={(value) => { this.setState({ name: value }) }}
                                            placeholder='Enter Name'
                                            placeholderTextColor={'#dedede'}
                                            underlineColorAndroid='transparent'
                                        />
                                    </View>
                                </View>
                                <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={()=>{
                                    if(this.state.name.length > 0 ) 
                                        this.editProfile()
                                    else 
                                        Toast.show('Enter your new name');
                                }}>
                                    <Text style={Styles.btnText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                            : null
                    }    
                    {
                                this.state.add_flag === true?
                                    <View style={[Styles.modelCon, { height: height(30) }]}>
                                        <View style={Styles.header}>
                                            <Text style={Styles.headerText}>Edit Address</Text>
                                        </View>
                                        <View style={Styles.shop}>
                                            <Text style={[Styles.text, { marginTop: 10 }]}>Address</Text>
                                            <View style={Styles.pickerCon}>
                                                <TextInput
                                                    style={Styles.category}
                                                    // value={''}
                                                    onChangeText={(value) => { this.setState({ address: value }) }}
                                                    placeholder='Enter Address'
                                                    placeholderTextColor={'#dedede'}
                                                    underlineColorAndroid='transparent'
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={()=>{
                                            if(this.state.address.length>0) 
                                                this.editProfile()
                                            else     
                                                Toast.show('Enter your new address')
                                        }}>
                                            <Text style={Styles.btnText}>OK</Text>
                                        </TouchableOpacity>
                                    </View> 
                                : null     
                    }
                    {
                        this.state.num_flag === true?
                        <View style={[Styles.modelCon, { height: height(30) }]}>
                            <View style={Styles.header}>
                                <Text style={Styles.headerText}>Edit Phone no</Text>
                            </View>
                            <View style={Styles.shop}>
                                <Text style={[Styles.text, { marginTop: 10 }]}>Phone no</Text>
                                <View style={Styles.pickerCon}>
                                    <TextInput
                                        style={Styles.category}
                                        // value={''}
                                        onChangeText={(value) => { this.setState({ number: value }) }}
                                        placeholder='Enter Phone no'
                                        placeholderTextColor={'#dedede'}
                                        underlineColorAndroid='transparent'
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={[Styles.btnCon, { marginTop: 20, height: height(6) }]} onPress={()=>{
                                if(this.state.number.length>0) 
                                    this.editProfile() 
                                else     
                                    Toast.show('Enter your new number')
                            }}>
                                <Text style={Styles.btnText}>Edit</Text>
                            </TouchableOpacity>
                        </View> 
                        : null
                        
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
    },
    label: {
        height: Metrics.screenHeight * 0.06,
        width: Metrics.screenWidth * 0.9,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    labelText: {
        fontSize: 16,
        color: '#3c5abc',
        marginHorizontal: 10
    },
    card: {
        height: Metrics.screenHeight * 0.4,
        width: Metrics.screenWidth * 0.9,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        elevation: 10,
        marginVertical: 0,
        borderRadius: 5
    },
    strip: {
        height: Metrics.screenHeight * 0.08,
        width: Metrics.screenWidth * 0.85,
        alignSelf: 'center',
        marginHorizontal: 5,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#3c5abc',
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 14,
        color: '#3c5abc',
        marginVertical: 0,
    },
    subTitleText: {
        fontSize: 12,
        color: '#92a0d5',
        marginVertical: 1
    },
    editBtn: {
        height: Metrics.screenHeight * 0.03,
        width: Metrics.screenWidth * 0.1,
        backgroundColor: '#2a3478',
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'normal',
        marginVertical: 0
    },
});