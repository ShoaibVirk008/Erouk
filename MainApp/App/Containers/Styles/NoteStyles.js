import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { width, height, totalSize } from 'react-native-dimension'

export default StyleSheet.create({
    ...ApplicationStyles,
    //   shopName:{
    //     fontSize: size.medium,
    //     color: colors.labeltext,
    //     width: Metrics.screenWidth * 0.92,
    //     height: Metrics.screenHeight * 0.06,
    //     textAlignVertical:'center',
    //   },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    shopName: {
        fontSize: 16,
        color: '#3c5abc',
        fontWeight: 'bold',
        marginVertical: 0,
        marginTop: 15
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginHorizontal: 5,
        width: Metrics.screenHeight * 0.5,
        textAlign: 'center'
    },
    linkView: {
        height: Metrics.screenHeight * 0.13,
        width: Metrics.screenWidth * 0.9,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        elevation: 10,
        marginTop: 70,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#676f9f',
        borderStyle: 'dashed'
    },
    memberView: {
        height: Metrics.screenHeight * 0.13,
        width: Metrics.screenWidth * 0.9,
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        elevation: 10,
        marginVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: '#676f9f',
        borderStyle: 'dashed',
    },
    logoView: {
        height: Metrics.screenHeight * 0.13,
        width: Metrics.screenWidth * 0.28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textView: {
        height: Metrics.screenHeight * 0.13,
        width: Metrics.screenWidth * 0.62,
        justifyContent: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor:'red'

    },
    searchInputContainer: {
        width: width(70),
        height: height(6),
        backgroundColor: 'rgb(255,255,255)',
        elevation: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: height(1),


    },
    searchInput: {
        width: width(60),
        height: height(6),
        fontSize: totalSize(1.9),
        //backgroundColor:'red'


    },
    btnSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:'blue'

    },
    searchIcon: {
        width: totalSize(3),
        height: totalSize(3)
    },
    topDistance: {
        width: width(2)
    },
    btnAddTxt: {
        color: 'white',
        fontSize: totalSize(1.5)
    },
    btnAdd: {
        width: width(20),
        height: height(5),
        borderRadius: 5,
        backgroundColor: 'rgb(0,41,132)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    shopContainer: {
        width: width(95),
        height: height(6),
        //borderRadius: 5,
        elevation: 2,
        //backgroundColor: 'white',
        backgroundColor: '#f9f9f9',
        marginTop: height(1),
        //marginHorizontal: width(2),
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgContainer: {
        height: height(6),
        width: width(10),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'rgb(217,217,217)'



    },
    shopImage: {
        width: totalSize(3),
        height: totalSize(3),
        borderRadius: 100
    },

    shopTxtContainer: {
        height: height(6),
        width: width(65),
        justifyContent: 'center',
        //backgroundColor:'rgb(217,217,217)',
        borderRightWidth: 0.5,
        borderColor: 'white'

    },
    shopName: {

        fontSize: totalSize(1.5),
        left: width(2),
        color: '#3c5abc'
        //fontWeight: 'bold',


    },
    shopDetail: {
        fontSize: totalSize(1.2),
        color: 'white',

    },
    taskField: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width(15),
        height: height(6)
    },
    AdminIconContainer: {
        height: height(12),
        width: width(20),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'

    },
    EmployeeBtnContainer: {
        height: height(12),
        width: width(20),
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor:'red'

    },
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
        elevation: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
       // backgroundColor:'red'
    },

    popUpTop: {
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        height: height(7),
        width: width(90),
        backgroundColor: '#3c5abc',
        alignItems: 'center',
        justifyContent: 'flex-end',
        //alignSelf: 'center'
        flexDirection: 'row'
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
        fontSize: totalSize(1.3),
        color: 'rgb(0,41,132)',
        fontWeight: '200',
        left: width(2)
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
    btnUpload: {
        height: height(3),
        width: width(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: 'rgb(0,41,132)',
        marginRight: width(2)
    },
    btnUploadTxt: {
        color: 'white',
        fontSize: totalSize(1.2)
    },
    filesTxt: {
        color: 'gray',
        fontSize: totalSize(1.2)
    },

    btnFinish: {
        width: Metrics.screenWidth - Metrics.screenWidth * 0.17,
        height: Metrics.screenHeight * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3c5abc',
        borderRadius: 5,
        marginVertical: height(3)
    },
    btnFinishTxt: {
        color: 'white',
        fontSize: totalSize(2)
    },
    barCoderow: {
        flex: 1.8,
        marginTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
    },
    pickerCon: {
        height: Metrics.screenHeight * 0.07,
        width: Metrics.screenWidth * 0.83,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        // backgroundColor:'red',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5,
        marginVertical: 5
    },
    picker: {
        height: Metrics.screenHeight * 0.04,
        width: Metrics.screenWidth * 0.80,
        justifyContent: 'center',
        alignSelf: 'center',
        // fontSize: 12,
        color: '#818cbf',
        // backgroundColor:'red',
    },
    pickerItem: {
        fontSize: 14,
        color: '#818cbf'
    },
    barCodeImage: {
        width: Metrics.screenWidth * 0.12,
        height: Metrics.screenHeight * 0.07,
        resizeMode: 'stretch',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 0.5,
        marginLeft: 5,

    },
    row: {
        //flex:1.5,
        marginVertical:height(1.5),
        alignItems: 'flex-start',
        justifyContent: 'center',
        //backgroundColor:'green'
    },
    emptyrow: {
        flex: 0.8,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    secondRow: {
        flex: 3.5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    imageUploadRow: {
        width: Metrics.screenWidth - Metrics.screenWidth * 0.17,
        height: Metrics.screenHeight * 0.25,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    InputView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row'
    },
    codeInputWidth: {
        width: Metrics.screenWidth - Metrics.screenWidth * 0.3,
        height: Metrics.screenHeight * 0.07,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
        // margin: 10,
        paddingHorizontal: 15
    },
    textInput: {
        width: Metrics.screenWidth - Metrics.screenWidth * 0.17,
        height: Metrics.screenHeight * 0.4,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
        // margin: 10,
        paddingLeft: 15,
        //paddingBottom:180,
        //backgroundColor:'red'
    },
    imgUploadButton: {
        width: Metrics.screenWidth * 0.2,
        height: Metrics.screenHeight * 0.03,
        borderRadius: 3,
        backgroundColor: '#3d58c0',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    productImage: {
        width: Metrics.screenWidth * 0.6,
        height: Metrics.screenHeight * 0.22,
        // resizeMode:'contain',
        margin: 10,
        marginBottom: 10
    },
    label: {
        fontSize: 14,
        color: '#818cbf'
    },
    simpleText: {
        fontSize: size.small,
        color: '#cfcfcf',
        fontWeight: 'normal',
    },
    labelText: {
        fontSize: size.small,
        color: '#899ad3',
    },
    buttonLabel: {
        fontSize: 10,
        fontWeight: 'normal',
        color: 'white',
    },

    addProductButton: {
        width: Metrics.screenWidth - Metrics.screenWidth * 0.17,
        height: Metrics.screenHeight * 0.07,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3d58c0'
    },
    buttonText: {
        fontSize: 14,
        color: '#dadada'
    },
    button: {
        backgroundColor: colors.button,
        width: Metrics.screenWidth - Metrics.screenWidth * 0.17,
        height: Metrics.screenHeight * 0.07,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextAdd: {
        textAlign: 'center',
        color: colors.snow,
    }
})
