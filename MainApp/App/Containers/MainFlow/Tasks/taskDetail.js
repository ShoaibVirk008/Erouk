import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, Picker, ImageBackground, Image, ScrollView, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
let _this = null;
class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            visible: false,
            loading: false,
            isDateTimePickerVisible: false,
            cateID: '',
            memberID: '',
            dateTime: '',
            task: '',
            loading_aditTask: false,
        };
    }
    componentDidMount() {
        _this = this
        this.setState({
            task: store.TASK_DETAIL.name,
            dateTime:store.TASK_DETAIL.due_date
        })
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
    static navigationOptions = {
        headerTitle: 'Task Detail',
        headerRight: (
            <TouchableOpacity style={{marginHorizontal:width(5)}} onPress={() => _this._toggleModal()}>
                <Icon name='edit' color='white' size={totalSize(3)} type='entypo' />
            </TouchableOpacity>
        ),
    }

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
            this.editTask()
        } else {
            Toast.show('Please fill up all fields')
        }
    }
    editTask = async () => {
        Toast.show('Task has been updated successfully')
        this._toggleModal()
    }
    render() {
        return (
            <View style={Styles.Container}>
                <View style={Styles.taskContainer}>
                    <Text style={{ fontWeight: 'normal' }}>{store.TASK_DETAIL.name}</Text>
                </View>
                <View style={Styles.detailContainer}>
                    <Text style={Styles.Heading}>Due Date</Text>
                    <Text style={Styles.detail}>{store.TASK_DETAIL.due_date}</Text>
                </View>
                <View style={Styles.detailContainer}>
                    <Text style={Styles.Heading}>User Name</Text>
                    <Text style={Styles.detail}>{store.TASK_DETAIL.task_members[0].name}</Text>
                </View>
                <View style={Styles.detailContainer}>
                    <Text style={Styles.Heading}>Category</Text>
                    <Text style={Styles.detail}>{store.TASK_DETAIL.category_name}</Text>
                </View>

                <Modal
                    isVisible={this.state.isModalVisible}
                    animationIn='slideInUp'
                    animationOut='slideOutDown'
                    backdropColor='black'
                    animationInTiming={500}
                    animationOutTiming={500}
                    backdropOpacity={0.50}
                    onBackdropPress={() => this._toggleModal()}>

                    <ScrollView>
                        <View>
                            <View style={Styles.popUpTop}>
                                <Text style={[Styles.Heading, { color: 'white' }]}>Edit Task</Text>
                                {/* <View style={{ width: width(30) }}></View>
                                <TouchableOpacity onPress={this._toggleModal} style={{ marginRight: width(1) }} >
                                    <Icon name='close' size={20} type='material-icon' color='white' />
                                </TouchableOpacity> */}
                            </View>
                            <View style={Styles.popUpContainerService}>
                                <View style={Styles.popUpField}>
                                    <Text style={Styles.popUpText}>Task</Text>
                                    <View>
                                        <TextInput
                                            style={Styles.textInputTask}
                                            value={this.state.task}
                                            multiline={true}
                                            scrollEnabled={true}
                                            //editable={this.state.is_editable}
                                            onChangeText={(value) => { this.setState({ task: value }) }}
                                            underlineColorAndroid='transparent'
                                        />
                                    </View>
                                </View>
                                <View style={Styles.popUpField}>
                                    <Text style={Styles.popUpText}>Member</Text>
                                    <View style={Styles.pickerCon} >
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.memberID}
                                            //itemStyle={Styles.pickerItem}
                                            //enabled={this.state.is_editable}
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
                                <View style={Styles.popUpField}>
                                    <Text style={Styles.popUpText}>Category</Text>
                                    <View style={Styles.pickerCon} >
                                        <Picker
                                            mode='dropdown'
                                            selectedValue={this.state.cateID}
                                            //itemStyle={Styles.pickerItem}
                                            //enabled={this.state.is_editable}
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
                                <View style={Styles.popUpField}>
                                    <Text style={Styles.popUpText}>Due Date</Text>
                                    <TextInput
                                        style={Styles.textInput}
                                        value={this.state.dateTime}
                                        //placeholderTextColor="#818cbf"
                                        onFocus={() => this._showDateTimePicker()}
                                    />
                                </View>
                                <TouchableOpacity style={Styles.btnFinish} onPress={() => this.editTask()} >
                                    {
                                        this.state.loading_aditTask === true ?
                                            <ActivityIndicator size='small' color="white" />
                                            :
                                            <Text style={[Styles.Heading, { color: 'white' }]}>Update</Text>
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

export default TaskDetail;

const Styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center'
    },
    taskContainer: {
        //flex:2,
        width: width(90),
        //backgroundColor: 'red',
        marginVertical: height(3),
        flexWrap: 'wrap'
    },
    detailContainer: {
        width: width(90),
        // backgroundColor: 'red',
        marginVertical: height(1)
    },
    Heading: {
        fontSize: totalSize(2),
        color: '#3c5abc',
        //fontWeight: 'bold'
    },
    detail: {
        fontSize: totalSize(1.5),
        color: 'gray',
        fontWeight: 'normal'
    }
    ,
    popUpContainer: {
        height: height(60),
        width: width(90),
        elevation: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    popUpContainerService: {
        //height: height(60),
        width: width(90),
        // elevation: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    popUpTop: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: height(7),
        width: width(90),
        backgroundColor: '#3c5abc',
        alignItems: 'center',
        justifyContent: 'center',
        //alignSelf: 'center'
        //flexDirection: 'row'
    },
    popUpTopTxt: {
        fontSize: totalSize(2),
        fontWeight: '300',
        color: 'white',
        //marginVertical:height(2)
    },
    inputTxtContainer: {
        width: width(80),
        marginTop: height(1.5)
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width(80),
        height: height(6),
        elevation: 5,
        borderRadius: 5,
        marginTop: height(1),
        backgroundColor: 'white'
    },
    pickerStyle: {
        color: 'rgb(217,217,217)',
        height: height(6),
        width: width(78),

    },
    popUpText: {
        fontSize: totalSize(1.75),
        color: '#899ad3',
        //fontWeight: '200',
        //left: width(2)
        marginBottom: 5,
    },
    popUpInput: {
        width: width(80),
        height: height(6),
        fontSize: totalSize(1.5),
        paddingLeft: 10,
        //elevation: 1,
        //borderRadius: 5,
        //marginTop: height(1)
    },
    uploadContainer: {
        flexDirection: 'row',
        width: width(80),
        marginTop: height(2),
        alignItems: 'center'
    },
    btnFinish: {
        height: height(6),
        width: width(80),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#3c5abc',
        marginVertical: height(3)
    },
    editBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginRight: width(2)
    },
    btnUploadTxt: {
        color: 'white',
        fontSize: totalSize(1.2)
    },
    filesTxt: {
        color: 'gray',
        fontSize: totalSize(1.2)
    },
    popUpField: {
        width: width(80),
        marginVertical:height(1)

    },
    textInput: {
        width: width(80),
        height: height(6),
        paddingLeft: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius:5

    },
    textInputTask: {
        width: width(80),
        height: height(15),
        paddingLeft: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius:5,
        fontSize:totalSize(1.8),
        color:'gray'
        //paddingBottom: 10,
    },
    pickerCon: {
        width: width(80),
        height: height(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.25,
        borderColor: 'gray',
        borderRadius:5
    },
    picker: {
        width: width(75),
        height: height(6),
        color:'#3c5abc'
    },

})