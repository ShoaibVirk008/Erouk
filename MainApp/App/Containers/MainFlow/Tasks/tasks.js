
import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, TextInput, View, Picker, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { Icon, ButtonGroup } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Metrics } from '../../../Themes';
import Styles from '../../Styles/InvitationMembersStyle';
import images from '../../../Themes/Images';
import Contacts from 'react-native-contacts';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import TaskMonth from './TaskMonthView'



@observer export default class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDayView: 'DAY',
            task_Date: 'Apr 8',
            isModalVisible: false,
            visible: false,
            loading: false,
            isDateTimePickerVisible: false,
            cateID: '',
            memberID: '',
            dateTime: '',
            task: '',
            loading_addTask: false,
            tasks_list_Day: [],
            tasks_list_Week: [],
            tasks_list_Month: {},
            tasks_list_Month_API: [],
            // task_list: [
            //     { id: 1, task: 'Complete your packing, You can do anything in your task such as network requests, timers and so on, as long as it doesn, You can do anything in your task such as network requests, timers and so on, as long as it doesn', image: require('../../../Images/man.png'), priority: 'High', Status: true, Date: 'Jul 2', user_name: 'Khalid' },
            //     { id: 2, task: 'Collect the Audit recorde You can do anything in your task such as network requests, timers and so on, as long as it doesn You can do anything in your task such as network requests, timers and so on, as long as it doesn', image: require('../../../Images/man.png'), priority: 'Medium', Status: false, Date: 'Jul 25', user_name: 'Majid' },
            //     { id: 3, task: 'Update shop status You can do anything in your task such as network requests, timers and so on, as long as it doesnYou can do anything in your task such as network requests, timers and so on, as long as it doesn', image: require('../../../Images/man.png'), priority: 'High', Status: false, Date: 'mar 10', user_name: 'Amir' },
            //     { id: 4, task: 'Report the status You can do anything in your task such as network requests, timers and so on, as long as it doesn You can do anything in your task such as network requests, timers and so on, as long as it doesn', image: require('../../../Images/man.png'), priority: 'Low', Status: false, Date: 'aug 31', user_name: 'Adnan' },
            // ],
            // task_list_Week: [
            //     { id: 1, task: 'Complete your packing', image: require('../../../Images/man.png'), priority: 'High', Status: true, Date: 'Jul 2', user_name: 'Khalid' },
            //     { id: 2, task: 'Collect the Audit recorde', image: require('../../../Images/man.png'), priority: 'Medium', Status: false, Date: 'Jul 25', user_name: 'Majid' },
            //     { id: 3, task: 'Update shop status', image: require('../../../Images/man.png'), priority: 'High', Status: false, Date: 'mar 10', user_name: 'Amir' },
            //     { id: 4, task: 'Report the status', image: require('../../../Images/man.png'), priority: 'Low', Status: false, Date: 'aug 31', user_name: 'Adnan' },
            //     { id: 5, task: 'Report the status', image: require('../../../Images/man.png'), priority: 'Low', Status: false, Date: 'aug 31', user_name: 'Adnan' },
            //     { id: 6, task: 'Update shop status', image: require('../../../Images/man.png'), priority: 'High', Status: false, Date: 'mar 10', user_name: 'Amir' },
            //     { id: 7, task: 'Complete your packing', image: require('../../../Images/man.png'), priority: 'High', Status: true, Date: 'Jul 2', user_name: 'Khalid' },
            //     { id: 8, task: 'Collect the Audit recorde', image: require('../../../Images/man.png'), priority: 'Medium', Status: false, Date: 'Jul 25', user_name: 'Majid' },
            // ],
            members: [
                { id: 1, user_id: 1, user_name: 'Usama' },
                { id: 2, user_id: 3, user_name: 'Umer' },
                { id: 3, user_id: 5, user_name: 'Saqib' },
                { id: 4, user_id: 6, user_name: 'Amir' },
            ],
            loadingGetTask: false,
            loadingGetTaskByWeek: false,
            loadingGetTaskBymonth: false,
            selected_members: [],
            selected_members_IDs: [],
            loadingSelectedMembers: false,
            buttons: ['High', 'Medium', 'Low'],
            selectedIndex: 0,
            priority: 1,
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            currentDay: ''
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
        this.setState({ priority: selectedIndex + 1 })
        //console.warn('Priority is===>',this.state.priority)
    }
    static navigationOptions = {
        header: null
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
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        // console.log('A date has been picked: ', date);
        this.setState({ dateTime: date })
        this._hideDateTimePicker();
    }
    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });
    onCancel() {
        console.log("CANCEL")
        this.setState({ visible: false });
    }
    onOpen() {
        console.log("OPEN")
        this.setState({ visible: true });
    }
    componentWillMount = async () => {
        this.getCurrentDay()
        if (store.SELECTED_SHOP.memberStatus === 'shopOwner') {
            await this.getTaskByDay()
            await this.getMembers()
            await this.getCategory()
            await this.getTaskByWeek()
            this.getTaskByMonth()
        } else {
            await this.getTaskByDayMember()
            await this.getTaskByWeekMember()
            await this.getTaskByMonthMember()
        }
        //     this.setState({loading: true})
        //     Contacts.getAll((err, contacts) => {
        //         store.CONTACT_LIST = contacts;
        //         this.setState({loading: false})
        //     //   console.warn('contact are=',store.CONTACT_LIST);
        //   });
        //   await this.getContacts();
    }
    getCurrentDay() {
        var d = new Date();
        this.setState({ currentDay: this.state.days[d.getDay()] })
        //document.getElementById("demo").innerHTML = days[d.getDay()];
    }
    getCategory = async () => {
        // console.warn(itemValue);
        this.setState({
            loading: true
        })
        //API for get Category 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            shopId: store.SELECTED_SHOP.id
        }
        let response = await api.post('getCategories', params);
        if (response.status === true) {
            store.CATEGORY_LIST = response.data;
            this.setState({ loading: false })
            console.warn('Categories==>', store.CATEGORY_LIST)
        } else {
            this.setState({ loading: false })
        }
    }
    getMembers = async () => {
        // console.warn(itemValue);
        this.setState({
            loading: true
        })
        //API for get Members 
        let params = {
            shopId: store.SELECTED_SHOP.id,
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        console.warn('Params==>', params)
        let response = await api.post('shopMemberName', params);
        console.warn('member Respons==>', response)
        if (response.status) {
            store.MEMBERS_LIST = response.data;
            this.setState({ loading: false })
            console.warn('True Members==>', store.MEMBERS_LIST)
        } else {
            store.MEMBERS_LIST = response.data;
            this.setState({ loading: false })
            console.warn('False Members==>', store.MEMBERS_LIST)
        }
    }
    getTaskByDay = async () => {
        // console.warn(itemValue);
        // this.setState({
        //     loadingGetTask: true
        // })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        console.warn('Params==>', params)
        let response = await api.post('getCreatedTasksByDay', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({ tasks_list_Day: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTask: false })
            console.warn('Tasks By Day', this.state.task_list)
        } else {
            //await this.setState({ tasks_list_Day: response.data })
            Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTask: false })
        }
    }

    getTaskByWeek = async () => {
        // console.warn(itemValue);
        this.setState({
            loadingGetTaskByWeek: true
        })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        //console.warn('Params==>', params)
        let response = await api.post('getCreatedTasksByWeek', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({
                tasks_list_Week: response.data
            })
            // Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskByWeek: false })
            //console.warn('Tasks By Day', this.state.task_list)
        } else {
            //await this.setState({ tasks_list_Week: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskByWeek: false })
        }
    }
    getTaskByMonth = async () => {
        // console.warn(itemValue);
        this.setState({
            loadingGetTaskBymonth: true
        })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        //console.warn('Params==>', params)
        let response = await api.post('getCreatedTasksByMonth', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({
                tasks_list_Month_API: response.data
            })
            // Toast.show(response.message, Toast.LONG)
            console.log('API Response Tasks By Month', this.state.tasks_list_Month_API)
            await this.manageTaskListMonth()
            console.log(' Managed Tasks By Month', this.state.tasks_list_Month)
            this.setState({ getCreatedTasksByMonth: false })
        } else {
            //await this.setState({ tasks_list_Week: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskBymonth: false })
        }
    }

    getTaskByDayMember = async () => {
        // console.warn(itemValue);
        // this.setState({
        //     loadingGetTask: true
        // })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        console.warn('Params==>', params)
        let response = await api.post('getTasksByDay', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({ tasks_list_Day: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTask: false })
            console.warn('Tasks By Day', this.state.task_list)
        } else {
            //await this.setState({ tasks_list_Day: response.data })
            Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTask: false })
        }
    }

    getTaskByWeekMember = async () => {
        // console.warn(itemValue);
        this.setState({
            loadingGetTaskByWeek: true
        })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        //console.warn('Params==>', params)
        let response = await api.post('getTasksByWeek', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({
                tasks_list_Week: response.data
            })
            // Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskByWeek: false })
            //console.warn('Tasks By Day', this.state.task_list)
        } else {
            //await this.setState({ tasks_list_Week: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskByWeek: false })
        }
    }
    getTaskByMonthMember = async () => {
        // console.warn(itemValue);
        this.setState({
            loadingGetTaskBymonth: true
        })
        //API for get Members 
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
        }
        //console.warn('Params==>', params)
        let response = await api.post('getTasksByMonth', params);
        //console.warn('Tasks By Day', response)
        if (response.status) {
            await this.setState({
                tasks_list_Month_API: response.data
            })
            // Toast.show(response.message, Toast.LONG)
            console.log('API Response Tasks By Month', this.state.tasks_list_Month_API)
            await this.manageTaskListMonth()
            console.log(' Managed Tasks By Month', this.state.tasks_list_Month)
            this.setState({ getCreatedTasksByMonth: false })
        } else {
            //await this.setState({ tasks_list_Week: response.data })
            //Toast.show(response.message, Toast.LONG)
            this.setState({ loadingGetTaskBymonth: false })
        }
    }

    manageTaskListMonth = async () => {
        for (var index = 0; index < this.state.tasks_list_Month_API.length; index++) {
            this.setState({ tasks_list_Month: this.state.tasks_list_Month_API[index] })
        }
    }
    selectMember = async (id) => {
        this.setState({ loadingSelectedMembers: true })
        for (let i = 0; i < this.state.members.length; i++) {
            if (id === this.state.members[i].user_id) {
                await this.setState({ memberID: this.state.members[i].user_id })
                await this.state.selected_members.push(this.state.members[i])
                await this.state.selected_members_IDs.push(this.state.members[i].user_id)
            }
        }
        //console.warn('selected Members==>', this.state.selected_members)
        //.warn('selected Members ID==>', this.state.selected_members_IDs)
        await this.setState({ loadingSelectedMembers: false })

    }

    UnselectMember = async (itemIndex) => {
        this.setState({ loadingSelectedMembers: true })
        await this.state.selected_members.splice(itemIndex, 1)
        await this.state.selected_members_IDs.splice(itemIndex, 1)
        //console.warn('selected Members==>', this.state.selected_members)
        //console.warn('selected Members ID==>', this.state.selected_members_IDs)
        await this.setState({ loadingSelectedMembers: false })

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
    validations() {
        if (this.state.task !== '' & this.state.cateID !== '' & this.state.memberID !== '' & this.state.dateTime !== '') {
            this.addTask()
        } else {
            Toast.show('Please fill up all fields')
        }
    }
    addTask = async () => {
        this.setState({ loading_addTask: true })
        var date = await this.formatDate(this.state.dateTime)
        let params = {
            userId: store.LOGIN_RESPONSE.userDetail.id,
            taskName: this.state.task,
            dueDate: date,
            categoryId: this.state.cateID,
            members: this.state.selected_members_IDs,
            priority: this.state.priority,

        }
        console.warn('Params==>', params)
        let response = await api.post('createTask', params)
        // console.log('Productresponse==', response);
        //this.setState({ loading: false })
        if (response.status) {
            this.getTaskByDay()
            this.getTaskByWeek()
            Toast.show(response.Message, Toast.LONG);
            this._toggleModal()
            this.setState({
                loading_addTask: false,
                task: '',
                dueDate: '',
                cateID: '',
                memberID: '',
                selected_members: [],
                selected_members_IDs: [],
                priority: 1,
                dateTime: ''
            })
        } else {
            Toast.show(response.Message, Toast.LONG);
            this.setState({ loading_addTask: false })
        }

    }

    task_detail = async (task) => {
        store.TASK_DETAIL = task
        this.props.navigation.navigate('TaskDetail')
        console.warn('Task detail ===>', store.TASK_DETAIL)
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
                        <Text style={{ fontSize: 14, color: 'gray', marginVertical: 1 }}>Share via messenger,email or sms.</Text> rgb(218,21,30)
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
                <View style={[Styles.shopContainer, { height: height(10), backgroundColor: 'transparent', elevation: 0 }]}>
                    <View style={{ flexDirection: 'row', height: height(4), width: width(40), borderRadius: 20, borderWidth: 1, borderColor: 'rgb(214,214,207)', alignItems: 'center', justifyContent: 'center' }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor='rgb(214,214,207)'
                            underlineColorAndroid='transparent'
                            style={{ backgroundColor: 'transparent', height: height(6), width: width(35), fontSize: totalSize(1.5), color: 'gray' }}
                        />
                        <Icon name='search' size={totalSize(2)} color='rgb(214,214,207)' />
                    </View>
                    <View style={{ height: height(5), width: width(25), alignItems: 'center', justifyContent: 'center', marginHorizontal: width(2.5), flexDirection: 'row' }}>
                        <View style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Icon name='arrow-left' size={totalSize(1.5)} type='simple-line-icon' color='gray' />
                        </View>
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>{this.state.isDayView === 'DAY' ? this.state.task_Date : this.state.task_Date}</Text>
                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Icon name='arrow-right' size={totalSize(1.5)} type='simple-line-icon' color='gray' />
                        </View>
                    </View>

                    <View style={{ height: height(3), width: width(25), borderRadius: 20, borderWidth: 1, borderColor: 'rgb(214,214,207)', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
                        <TouchableOpacity style={this.state.isDayView === 'DAY' ? { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: '#3c5abc', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 } : { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomLeftRadius: 20, borderTopLeftRadius: 20 }} onPress={() => { this.setState({ isDayView: 'DAY', task_Date: 'Apr 8' }) }}>
                            <Text style={[Styles.shopDetail, { color: 'gray' }]}>Day</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.isDayView === 'WEEK' ? { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: '#3c5abc', } : { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }} onPress={() => { this.setState({ isDayView: 'WEEK', task_Date: 'Apr 8 - Apr 15' }) }}>
                            <Text style={[Styles.shopDetail, { color: 'gray' }]}>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={this.state.isDayView === 'MONTH' ? { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: '#3c5abc', borderBottomRightRadius: 20, borderTopRightRadius: 20 } : { width: width(8), height: height(2.5), alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomRightRadius: 20, borderTopRightRadius: 20 }} onPress={() => { this.setState({ isDayView: 'MONTH', task_Date: 'April' }) }}>
                            <Text style={[Styles.shopDetail, { color: 'gray' }]}>Month</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.isDayView === 'DAY' ?
                        <View>
                            <View style={[Styles.shopContainer, { backgroundColor: 'transparent', elevation: 0 }]}>

                                <View style={[Styles.shopTxtContainer, { justifyContent: 'center', alignItems: 'flex-start', width: width(42.5) }]}>
                                    <Text style={[Styles.shopName, { fontSize: totalSize(1.5), color: '#3c5abc', opacity: 0.5, left: 0 }]}>{this.state.currentDay}(08-04-2019)</Text>
                                </View>
                                <View style={[Styles.taskField, { flexDirection: 'row' }]}>
                                    <Icon name='sitemap' size={totalSize(1)} type='font-awesome' color='gray' />
                                    <Text style={[Styles.shopDetail, { color: 'gray', left: 1 }]}>Category</Text>
                                </View>
                                <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row', backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, }]}>
                                    <Icon name='tasklist' size={totalSize(1)} type='octicon' color='gray' />
                                    <Text style={[Styles.shopDetail, { color: 'gray', left: 1 }]}>Priority</Text>
                                </View>
                                {/* <View style={[Styles.taskField, { backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, flexDirection: 'row', width: width(10) }]}>
                        <Icon name='today' size={totalSize(1)} type='material-icon' color='gray' />
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Date</Text>
                    </View> */}
                                <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row' }]}>
                                    <Icon name='person' size={totalSize(1)} type='material-icon' color='gray' />
                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>Member</Text>
                                </View>
                                <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row', backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, }]}>
                                    <Icon name='done' size={totalSize(1)} type='material-icon' color='gray' />
                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>Status</Text>
                                </View>

                            </View>
                            {
                                this.state.loadingGetTask === true ?
                                    <ActivityIndicator />
                                    :
                                    this.state.tasks_list_Day.map((items, key) => {
                                        var trimmedString = items.name.length > 30 ?
                                            items.name.substring(0, 30 - 3) + "..." :
                                            items.name
                                        return (
                                            <TouchableOpacity key={key} style={[Styles.shopContainer, {}]} onPress={() => this.task_detail(items)}>
                                                <View style={{ backgroundColor: '#3c5abc', width: width(1), height: height(6) }}></View>
                                                <View style={[Styles.shopTxtContainer, { borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                    <Text style={[Styles.shopName, {}]}>{items.name.length > 30 ? trimmedString : items.name}</Text>
                                                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Icon name='bubble' size={totalSize(2)} type='simple-line-icon' color='gray' />
                                        </View>
                                    </View> */}
                                                </View>

                                                <View style={[Styles.taskField, {}]}>
                                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.category_name}</Text>
                                                </View>

                                                {
                                                    items.priority === 1 ?
                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(226,68,91)', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                            <Text style={Styles.shopDetail}>High</Text>
                                                        </View>
                                                        :
                                                        <View style={items.priority === 2 ? [Styles.taskField, { width: width(12.5), backgroundColor: '#A25DDC', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }] : [Styles.taskField, { width: width(12.5), backgroundColor: 'gray', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                            <Text style={Styles.shopDetail}>{items.priority === 2 ? 'Medium' : 'Low'}</Text>
                                                        </View>
                                                }

                                                {/* <View style={[Styles.taskField, { width: width(10) }]}>
                                              <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.Date}</Text>
                                                </View> */}
                                                <View style={[Styles.taskField, { borderColor: 'white', backgroundColor: 'transparent', width: width(12.5) }]}>
                                                    {/* <Image source={items.image} style={Styles.shopImage} /> */}
                                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.task_members[0].name}</Text>
                                                </View>
                                                {
                                                    items.Status === true ?
                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(1,200,117)', borderLeftWidth: 0.5, borderColor: 'white' }]}>
                                                            <Text style={Styles.shopDetail}>Done</Text>
                                                        </View>
                                                        :
                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(226,68,91)', borderLeftWidth: 0.5, borderColor: 'white' }]}>
                                                            <Text style={[Styles.shopDetail, { fontSize: totalSize(1) }]}>Not Done</Text>
                                                        </View>
                                                }
                                            </TouchableOpacity>
                                        );

                                    })
                            }
                            {
                                store.SELECTED_SHOP.memberStatus === 'shopOwner' ?
                                    <TouchableOpacity style={{ marginTop: height(1), width: width(95), height: height(6), flexDirection: 'row', borderTopWidth: 0.25, borderBottomWidth: 0.25, borderColor: 'rgb(217,217,217)' }} onPress={this._toggleModal}>
                                        <View style={{ backgroundColor: '#3c5abc', width: width(1), opacity: 0.4 }}></View>
                                        <View style={{ width: width(5) }}></View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Icon name='playlist-add' size={totalSize(2)} type='material-icon' color='gray' />
                                        </View>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={[Styles.shopName, { color: 'gray', fontSize: totalSize(1.6), left: 1 }]} >Create a New Task</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                            }

                        </View>
                        :

                        <View>
                            {
                                this.state.isDayView === 'WEEK' ?
                                    <View>
                                        <View style={[Styles.shopContainer, { backgroundColor: 'transparent', elevation: 0 }]}>

                                            <View style={[Styles.shopTxtContainer, { justifyContent: 'center', alignItems: 'flex-start', width: width(42.5) }]}>
                                                <Text style={[Styles.shopName, { fontSize: totalSize(1.5), color: '#3c5abc', opacity: 0.5, left: 0 }]}>Wednesday - Tuesday</Text>
                                            </View>
                                            <View style={[Styles.taskField, { flexDirection: 'row' }]}>
                                                <Icon name='sitemap' size={totalSize(1)} type='font-awesome' color='gray' />
                                                <Text style={[Styles.shopDetail, { color: 'gray', left: 1 }]}>Category</Text>
                                            </View>
                                            <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row', backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, }]}>
                                                <Icon name='tasklist' size={totalSize(1)} type='octicon' color='gray' />
                                                <Text style={[Styles.shopDetail, { color: 'gray', left: 1 }]}>Priority</Text>
                                            </View>
                                            {/* <View style={[Styles.taskField, { backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, flexDirection: 'row', width: width(10) }]}>
                        <Icon name='today' size={totalSize(1)} type='material-icon' color='gray' />
                        <Text style={[Styles.shopDetail, { color: 'gray' }]}>Date</Text>
                    </View> */}
                                            <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row', }]}>
                                                <Icon name='person' size={totalSize(1)} type='material-icon' color='gray' />
                                                <Text style={[Styles.shopDetail, { color: 'gray' }]}>Member</Text>
                                            </View>
                                            <View style={[Styles.taskField, { width: width(12.5), flexDirection: 'row', backgroundColor: '#f1f1f1', borderTopLeftRadius: 5, borderTopRightRadius: 5, }]}>
                                                <Icon name='done' size={totalSize(1)} type='material-icon' color='gray' />
                                                <Text style={[Styles.shopDetail, { color: 'gray' }]}>Status</Text>
                                            </View>

                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <ScrollView>
                                                {

                                                    this.state.tasks_list_Week.map((items, key) => {
                                                        var trimmedString = items.name.length > 30 ?
                                                            items.name.substring(0, 30 - 3) + "..." :
                                                            items.name
                                                        return (

                                                            <TouchableOpacity key={key} style={[Styles.shopContainer, {}]} onPress={() => this.task_detail(items)}>
                                                                <View style={{ backgroundColor: '#3c5abc', width: width(1), height: height(6) }}></View>
                                                                <View style={[Styles.shopTxtContainer, { borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                                    <Text style={[Styles.shopName, {}]}>{items.name.length > 30 ? trimmedString : items.name}</Text>
                                                                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                        <View style={{ marginHorizontal: 5 }}>
                                            <Icon name='bubble' size={totalSize(2)} type='simple-line-icon' color='gray' />
                                        </View>
                                    </View> */}
                                                                </View>

                                                                <View style={[Styles.taskField, {}]}>
                                                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.category_name}</Text>
                                                                </View>

                                                                {
                                                                    items.priority === 1 ?
                                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(226,68,91)', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                                            <Text style={Styles.shopDetail}>High</Text>
                                                                        </View>
                                                                        :
                                                                        <View style={items.priority === 2 ? [Styles.taskField, { width: width(12.5), backgroundColor: '#A25DDC', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }] : [Styles.taskField, { width: width(12.5), backgroundColor: 'gray', borderLeftWidth: 0.5, borderRightWidth: 0.5, borderColor: 'white' }]}>
                                                                            <Text style={Styles.shopDetail}>{items.priority === 2 ? 'Medium' : 'Low'}</Text>
                                                                        </View>
                                                                }

                                                                {/* <View style={[Styles.taskField, { width: width(10) }]}>
                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.Date}</Text>
                                </View> */}
                                                                <View style={[Styles.taskField, { borderColor: 'white', backgroundColor: 'transparent', width: width(12.5) }]}>
                                                                    {/* <Image source={require('../../../Images/man.png')} style={Styles.shopImage} /> */}
                                                                    <Text style={[Styles.shopDetail, { color: 'gray' }]}>{items.task_members[0].name}</Text>
                                                                </View>
                                                                {
                                                                    items.Status === true ?
                                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(1,200,117)', borderLeftWidth: 0.5, borderColor: 'white' }]}>
                                                                            <Text style={Styles.shopDetail}>Done</Text>
                                                                        </View>
                                                                        :
                                                                        <View style={[Styles.taskField, { width: width(12.5), backgroundColor: 'rgb(226,68,91)', borderLeftWidth: 0.5, borderColor: 'white' }]}>
                                                                            <Text style={[Styles.shopDetail, { fontSize: totalSize(1) }]}>Not Done</Text>
                                                                        </View>
                                                                }
                                                            </TouchableOpacity>
                                                        );

                                                    })
                                                }
                                                {
                                                    store.SELECTED_SHOP.memberStatus === 'shopOwner' ?
                                                        <TouchableOpacity style={{ marginTop: height(1), width: width(95), height: height(6), flexDirection: 'row', borderTopWidth: 0.25, borderBottomWidth: 0.25, borderColor: 'rgb(217,217,217)' }} onPress={this._toggleModal}>
                                                            <View style={{ backgroundColor: '#3c5abc', width: width(1), opacity: 0.4 }}></View>
                                                            <View style={{ width: width(5) }}></View>
                                                            <View style={{ justifyContent: 'center' }}>
                                                                <Icon name='playlist-add' size={totalSize(2)} type='material-icon' color='gray' />
                                                            </View>
                                                            <View style={{ justifyContent: 'center' }}>
                                                                <Text style={[Styles.shopName, { color: 'gray', fontSize: totalSize(1.6), left: 1 }]} >Create a New Task</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        null
                                                }
                                            </ScrollView>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ flex: 1, width: width(95), }}>
                                        <TaskMonth />
                                    </View>
                            }
                        </View>

                }
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
                                <Text style={Styles.popUpTopTxt}>Add Task</Text>
                                <View style={{ width: width(30) }}></View>
                                <TouchableOpacity onPress={this._toggleModal} style={{ marginRight: width(1) }} >
                                    <Icon name='close' size={20} type='material-icon' color='white' />
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.popUpContainerService}>
                                <View style={Styles.row}>
                                    <Text style={Styles.labelText}>Task</Text>
                                    <View style={Styles.InputView}>
                                        <TextInput
                                            style={Styles.textInputTask}
                                            placeholder='Enter Task Detail'
                                            placeholderTextColor='rgb(217,217,217)'
                                            multiline={true}
                                            scrollEnabled={true}
                                            onChangeText={(value) => { this.setState({ task: value }) }}
                                            underlineColorAndroid='transparent'
                                        />
                                    </View>
                                </View>
                                <View style={Styles.row}>
                                    <Text style={Styles.labelText}>Member</Text>
                                    <View style={Styles.pickerCon} >
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.memberID}
                                            itemStyle={Styles.pickerItem}
                                            enabled={this.state.is_editable}
                                            style={Styles.picker}
                                            onValueChange={(itemValue, itemIndex) => this.selectMember(itemValue)}>
                                            <Picker.Item label="Select Member" value='' />
                                            {
                                                this.state.members.map((item, key) => {
                                                    return (
                                                        <Picker.Item key={key} label={item.user_name} value={item.user_id} />
                                                    );
                                                })
                                            }
                                        </Picker>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: width(80) }}>
                                    {
                                        this.state.loadingSelectedMembers === true ?
                                            <ActivityIndicator size='small' color="rgb(217,217,217)" />
                                            :
                                            this.state.selected_members.map((item, key) => {
                                                return (
                                                    <View key={key} style={{ flexDirection: 'row', borderRadius: 5, marginHorizontal: width(1), marginVertical: height(1), backgroundColor: 'white', elevation: 3, shadowOpacity: 2, shadowColor: 'gray' }}>
                                                        <Text style={{ fontSize: totalSize(1.5), marginHorizontal: width(2), marginVertical: height(1) }}>{item.user_name}</Text>
                                                        <Icon name='ios-close-circle' size={totalSize(3)} type='ionicon' color='gray' onPress={() => this.UnselectMember(key)} />
                                                        <View style={{ width: 2 }}></View>
                                                    </View>
                                                )
                                            })
                                    }
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
                                            <Picker.Item label="Select Category" value='' />
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
                                </View>
                                <View style={Styles.row}>
                                    <Text style={[Styles.labelText, { marginLeft: width(4) }]}>Priority</Text>
                                    <ButtonGroup
                                        onPress={this.updateIndex}
                                        selectedIndex={this.state.selectedIndex}
                                        buttons={this.state.buttons}
                                        containerStyle={{ height: height(6) }}
                                    />
                                </View>

                                <TouchableOpacity style={Styles.btnFinish} onPress={() => this.validations()} >
                                    {
                                        this.state.loading_addTask === true ?
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
