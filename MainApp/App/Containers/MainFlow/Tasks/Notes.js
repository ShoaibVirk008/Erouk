
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, TextInput, View, Picker, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Metrics } from '../../../Themes';
import Styles from '../../Styles/NoteStyles';
import Contacts from 'react-native-contacts';
import Share, { ShareSheet, Button } from 'react-native-share';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import Icon2 from 'react-native-vector-icons/AntDesign'


@observer export default class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            visible: false,
            loading: false,
            isDateTimePickerVisible: false,
            Note: '',
            note_list: [
                { id: 1, note: 'This is note detail, here user can write any thing and then can save it for the future use, This is note detail, here user can write any thing and then can save it for the future use', Date: 'Jul 2' },
                { id: 2, note: 'This is note detail, here user can write any thing and then can save it for the future useThis is note detail, here user can write any thing and then can save it for the future useThis is note detail, here user can write any thing and then can save it for the future use', Date: 'Jul 25' },
                { id: 3, note: 'This is note detail, here user can write any thing and then can save it for the future useThis is note detail, here user can write any thing and then can save it for the future useThis is note detail, here user can write any thing and then can save it for the future use', Date: 'mar 10' },
                { id: 4, note: 'This is note detail, here user can write any thing and then can save it for the future useThis is note detail, here user can write any thing and then can save it for the future use ', Date: 'aug 31' },
            ],
            loading_addNote: false
        }
    }
     static navigationOptions = {
         header:null,
    //     headerTitle: 'Task',
    //     // headerLeft: (<View style = { styles.headerLeft }><Image source = { images.crossBtn } style = { styles.icons } /></View>),
    //     // headerBackTitle: null,
    //     headerStyle: {
    //         backgroundColor: '#3c5abc',
    //     },
    //     headerTitleStyle: {
    //         fontSize: 18,
    //         fontWeight: 'normal',
    //         alignSelf: 'center',
    //         textAlign: 'center',
    //     },
    //     headerTintColor: 'white'
     }


    static navigationOptions = {
        header: null
    }
    // _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    // _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    // _handleDatePicked = (date) => {
    //     // console.log('A date has been picked: ', date);
    //     this.setState({ dateTime: date })
    //     this._hideDateTimePicker();
    // }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    // onCancel() {
    //     console.log("CANCEL")
    //     this.setState({ visible: false });
    // }
    // onOpen() {
    //     console.log("OPEN")
    //     this.setState({ visible: true });
    // }
    componentWillMount = async () => {
        await this.getCategory(store.SELECTED_SHOP.id);
        //     this.setState({loading: true})
        //     Contacts.getAll((err, contacts) => {
        //         store.CONTACT_LIST = contacts;
        //         this.setState({loading: false})
        //     //   console.warn('contact are=',store.CONTACT_LIST);
        //   });
        //   await this.getContacts();
    }
    // getCategory = async (itemValue) => {
    //     // console.warn(itemValue);
    //     this.setState({
    //         shopID: store.SELECTED_SHOP.id,
    //         loading: true
    //     })
    //     //API for get Category
    //     let params = {
    //         userId: store.LOGIN_RESPONSE.userDetail.id,
    //         shopId: itemValue
    //     }
    //     let response = await api.post('getCategories', params);
    //     if (response.status === true) {
    //         store.CATEGORY_LIST = response.data;
    //         this.setState({ loading: false })
    //     }
    // }

    addNote = async () => {
        this.setState({ loading_addNote: true })
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopId:store.SELECTED_SHOP.id,
            note:this.state.Note
        }
        console.warn('Params==>', params)
        let response = await api.post('createNote', params)
        if (response.status) {
            Toast.show(response.message, Toast.LONG);
            this._toggleModal()
            this.setState({
                loading_addNote: false,
                Note: '',
            })
        } else {
            Toast.show(response.message, Toast.LONG);
            this.setState({ loading_addNote: false })
        }

    }
    // getContacts() {
    //     if (Platform.OS == 'android') {
    //         PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //             {
    //                 'title': 'Contacts',
    //                 'message': 'Describing why I need to access contact information.'
    //             }
    //         )
    //             .then(granted => {
    //                 if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //                     this.setState({ loading: true })
    //                     Contacts.getAll((err, contacts) => {
    //                         this.setState({
    //                             contacts: contacts
    //                         });
    //                         this.setState({ loading: false })
    //                         // console.warn('contact are=', this.state.contacts);
    //                     });
    //                 }
    //                 else {
    //                     // Handle
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log('PermissionsAndroid', err)
    //             })
    //     }
    // }
    // formatDate(date) {
    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();

    //     if (month.length < 2) month = '0' + month;
    //     if (day.length < 2) day = '0' + day;
    //     var date = [year, month, day].join('-');
    //     this.setState({ dateTime: date })
    //     // console.warn('date=', this.state.dateTime);

    //     return [year, month, day].join('-');
    // }
    note_detail=async (note)=>{
        store.NOTE_DETAIL=note
        this.props.navigation.navigate('NoteDetail')
        console.warn('Note detail ===>',store.NOTE_DETAIL)
      }
    render() {
        let shareOptions = {
            title: "React Native",
            message: "Invitation message",
            url: "http://facebook.github.   /react-native/",
            subject: "Share Link" //  for email
        };
        return (
            <View style={Styles.container}>
                {/* <Text style={styles.shopName}>Shop A</Text>
                <Text style={styles.description}>Share products and expiry date with other members</Text>
                <TouchableOpacity style={styles.linkView}onPress={()=>{ Share.open(shareOptions) }}>
                    <View style={styles.logoView}>
                        <View style={{ height: Metrics.screenHeight * 0.10, width: Metrics.screenWidth * 0.17, borderRadius: 100, backgroundColor: '#f8be12', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: Metrics.screenHeight * 0.04, width: Metrics.screenWidth * 0.08, resizeMode: 'contain' }} source={images.InviteLink} />
                        </View>
                    </View>
                    <View style={styles.textView}>
                        <Text style={{ fontSize: 16, color: '#676f9f', marginVertical: 1 }}>Share Invite Link</Text>
                        <Text style={{ fontSize: 14, color: 'gray', marginVertical: 1 }}>Share via messenger,email or sms.</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.memberView} onPress={() => this.props.navigation.push('ContactList')}>
                    <View style={styles.logoView}>
                        <View style={{ height: Metrics.screenHeight * 0.10, width: Metrics.screenWidth * 0.17, borderRadius: 100, backgroundColor: '#59ea4a', justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ height: Metrics.screenHeight * 0.04, width: Metrics.screenWidth * 0.08, resizeMode: 'contain' }} source={images.contactBook} />
                        </View>
                    </View>
                    <View style={styles.textView}>
                        <Text style={{ fontSize: 16, color: '#676f9f', marginVertical: 1 }}>Share Invite Link</Text>
                        <Text style={{ fontSize: 14, color: 'gray', marginVertical: 1 }}>Share via messenger,email or sms.</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {this.state.loading ? <ActivityIndicator size='large' /> : null}
                </View> */}

                {/* <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start',marginVertical: 10}}>
                    <Text style={{fontSize: totalSize(1.8) , color:'black' ,fontWeight:'600'}}>Some of Coming soon feature:</Text>
                    <Text style={{fontSize: totalSize(1.8) , color:'black' }}>- Intelligent task management system</Text>
                    <Text style={{fontSize: totalSize(1.8) , color:'black' }}>- Assign Task to any team member</Text>
                    <Text style={{fontSize: totalSize(1.8) , color:'black' }}>- Follow progress</Text>
                    <Text style={{fontSize: totalSize(1.8) , color:'black' }}>- QR Scan to make make sure tasks are being done on time</Text>
                </View> */}
                <View style={[Styles.shopContainer,{elevation:0}]}>
                    <View style={{ width: width(66), height: height(6), justifyContent: 'center' }}>
                        <Text style={[Styles.shopName, { fontSize: totalSize(2.5), color: '#3c5abc', opacity: 0.6 }]}>Notes</Text>
                    </View>
                    {/* <View style={Styles.imgContainer}>
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Member</Text>
                    </View>
                    <View style={[Styles.taskField, { width: width(13) }]}>
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Priority</Text>
                    </View>
                    <View style={[Styles.taskField, { width: width(16) }]}>
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Status</Text>
                    </View> */}
                    <View style={[Styles.taskField,{width:width(30)}]}>
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Date</Text>
                    </View>
                </View>
                {

                    this.state.note_list.map((items, key) => {
                        return (
                            <TouchableOpacity key={key} style={Styles.shopContainer} onPress={()=>this.note_detail(items)}>
                                <View style={{ backgroundColor: '#3c5abc', width: width(1), height: height(6) }}></View>
                                <View style={[Styles.shopTxtContainer,{}]}>
                                    <Text style={Styles.shopName}>This is the Note</Text>
                                </View>
                                {/* <View style={Styles.imgContainer}>
                                    <Image source={items.image} style={Styles.shopImage} />
                                </View> */}
                                {/* {
                                    items.priority==='High'?
                                    <View style={[Styles.taskField, { width: width(13), backgroundColor: 'rgb(218,21,30)', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                    <Text style={Styles.shopDetail}>{items.priority}</Text>
                                </View>
                                :
                                <View style={[Styles.taskField, { width: width(13), backgroundColor: '#3c9abc', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                    <Text style={Styles.shopDetail}>{items.priority}</Text>
                                </View>
                                }
                                {
                                    items.Status === true ?
                                        <View style={[Styles.taskField, { width: width(16), backgroundColor: '#59ea4a', borderRightWidth: 0.5, borderColor: 'white' }]}>
                                            <Text style={Styles.shopDetail}>Done</Text>
                                        </View>
                                        :
                                        <View style={[Styles.taskField, { width: width(16), backgroundColor: '#f8be12', borderRightWidth: 0.5, borderColor: 'white' }]}>
                                            <Text style={Styles.shopDetail}>Pending</Text>
                                        </View>
                                } */}
                                <View style={[Styles.taskField,{width:width(30)}]}>
                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.Date}</Text>
                                </View>
                            </TouchableOpacity>
                        );

                    })
                }
                <TouchableOpacity style={{ marginTop:height(1),width: width(95), height: height(6), flexDirection: 'row' ,borderTopWidth:0.25,borderBottomWidth:0.25,borderColor:'rgb(217,217,217)'}} onPress={this._toggleModal}>
                    <View style={{ backgroundColor: '#3c5abc', width: width(1), opacity: 0.4 }}></View>
                    <View style={{width:width(5)}}></View>
                    <View style={{justifyContent:'center'}}>
                        <Icon name='note-add' size={totalSize(2)} type='material-icon' color='gray'/>
                    </View>
                    <View style={{justifyContent:'center'}}>
                        <Text style={[Styles.shopName,{color:'gray',fontSize:totalSize(1.6),left:0}]} > Create a New Note</Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='zoomInDown'
                    animationOut='zoomOutUp'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}>
                    <ScrollView>
                        <View>
                            <View style={Styles.popUpTop}>
                                <Text style={Styles.popUpTopTxt}>Add Note</Text>
                                <View style={{ width: width(30) }}></View>
                                <TouchableOpacity onPress={this._toggleModal} style={{ marginRight: width(1) }} >
                                <Icon name='close' size={20} type='material-icon' color='white'/>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.popUpContainerService}>
                                <View style={Styles.row}>
                                    <Text style={Styles.labelText}>Write Note Here</Text>
                                    <View style={Styles.InputView}>
                                        <TextInput
                                            style={Styles.textInput}
                                            multiline={true}
                                            scrollEnabled={true}
                                            onChangeText={(value) => { this.setState({ Note: value }) }}
                                            underlineColorAndroid='transparent'
                                        />
                                    </View>
                                </View>
                                {/* <View style={Styles.row}>
                                    <Text style={Styles.labelText}>Member</Text>
                                    <View style={Styles.pickerCon} >
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.cateID}
                                            itemStyle={Styles.pickerItem}
                                            enabled={this.state.is_editable}
                                            style={Styles.picker}
                                            onValueChange={(itemValue, itemIndex) => this.setState({ memberID: itemValue })}>
                                            <Picker.Item label="Select Member" />
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
                                    <Text style={Styles.labelText}>Due Date</Text>
                                    <View style={Styles.InputView}>
                                        <TextInput
                                            style={Styles.textInput}
                                            placeholder={this.state.dateTime}
                                            placeholderTextColor="#818cbf"
                                            onFocus={() => this._showDateTimePicker()}
                                        />
                                    </View>
                                </View> */}
                                <TouchableOpacity style={Styles.btnFinish} onPress={()=>this.addNote()}>
                                    {
                                        this.state.loading_addNote === true ?
                                            <ActivityIndicator size='small' color="white" />
                                            :
                                            <Text style={Styles.btnFinishTxt}>Add</Text>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        );
    }
}
