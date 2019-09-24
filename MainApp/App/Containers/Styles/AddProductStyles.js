import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles,
  barCoderow:{
    flex:1.8,
    marginTop: 10,
    alignItems:'flex-start',
    justifyContent:'flex-end',
},
pickerCon: {
  height: Metrics.screenHeight * 0.07,
  width: Metrics.screenWidth * 0.83,
  justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',
  // backgroundColor:'red',
  borderColor:'grey',
  borderWidth:0.5,
  borderRadius:5,
  marginVertical:5
},
picker: {
  height: Metrics.screenHeight * 0.04,
  width: Metrics.screenWidth * 0.80,
  justifyContent:'center',
  alignSelf:'center',
  // fontSize: 12,
  color:'#818cbf',
  // backgroundColor:'red',
},
pickerItem:{
  fontSize: 14,
  color:'#818cbf'
},
barCodeImage:{
    width: Metrics.screenWidth * 0.12,
    height: Metrics.screenHeight * 0.07,
    resizeMode:'stretch',
    borderRadius: 10,
    borderColor:'grey',
    borderWidth:0.5,
    marginLeft: 5,
   
  },
  row:{
    flex:1.5,
    alignItems:'flex-start',
    justifyContent:'center',
},
emptyrow:{
    flex:0.8,
    alignItems:'flex-start',
    justifyContent:'center',
    backgroundColor:'red'
},
secondRow:{
    flex:3.5,
    alignItems:'flex-start',
    justifyContent:'flex-start',
},
imageUploadRow:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.17 ,
    height: Metrics.screenHeight * 0.25,
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexDirection:'row',
},
InputView:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 5,
    flexDirection:'row'
},
codeInputWidth:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.3 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 5,
    borderColor:'grey',
    borderWidth:0.5,
    // margin: 10,
   paddingHorizontal:15
},
textInput:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.17 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 5,
    borderColor:'grey',
    borderWidth:0.5,
    // margin: 10,
   paddingHorizontal: 15,
  //  backgroundColor:'red'
  },
  imgUploadButton:{
    width: Metrics.screenWidth * 0.2,
    height: Metrics.screenHeight * 0.03,
    borderRadius: 3,
    backgroundColor:'#3d58c0',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10,
  },
  productImage:{
    width: Metrics.screenWidth * 0.6,
    height: Metrics.screenHeight * 0.22,
    // resizeMode:'contain',
    margin: 10,
    marginBottom: 10
  },
label:{
    fontSize: 14,
  color:'#818cbf'
},
  simpleText: {
    fontSize: size.small,
    color: '#cfcfcf',
    fontWeight:'normal',
  },
  labelText: {
    fontSize: size.small,
    color: '#899ad3',
  },
  buttonLabel: {
    fontSize: 10,
    fontWeight:'normal',
    color: 'white',
  },

  addProductButton:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.17 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3d58c0'
  },
  buttonText:{
    fontSize: 14,
    color:'#dadada'
  },
  button: {
    backgroundColor: colors.button,
    width: Metrics.screenWidth - Metrics.screenWidth * 0.17 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonTextAdd: {
    textAlign: 'center',
    color: colors.snow,
  }
})
