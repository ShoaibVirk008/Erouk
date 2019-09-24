import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
import { totalSize } from 'react-native-dimension';

export default StyleSheet.create({
  ...ApplicationStyles,
barCodeImage:{
    width: Metrics.screenWidth * 0.04,
    height: Metrics.screenHeight * 0.06,
    resizeMode:'contain',
    margin:6
   
  },
InputView:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.10 ,
    height: Metrics.screenHeight * 0.05,
    alignItems:'center',
    justifyContent:'space-between',
    marginTop: 15,
    flexDirection:'row',
    borderRadius: 5,
    borderColor:'#3c5abc',
    // borderWidth:0.5,
    marginBottom:17,
},
codeInputWidth:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.3 ,
    height: Metrics.screenHeight * 0.05,
    fontSize: 14,
    color:'#e7e7e7',
    // margin: 10,
   padding:10,
},
  addProductButton:{
    width: Metrics.screenWidth - Metrics.screenWidth * 0.09 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 8,
    borderBottomEndRadius:0,
    borderBottomLeftRadius:0,
    borderBottomRightRadius:0,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3c5abc',
  },
  buttonText:{
    fontSize: 14,
    color:'#dadada'
  },
  //new 
  modelCon: {
    height: Metrics.screenHeight * 0.35,
    width: Metrics.screenWidth * 0.90,
    backgroundColor:'#f9f9f9',
    alignSelf:'center',
    borderRadius: 5,
    elevation:10,
  },
  header: {
    height: Metrics.screenHeight * 0.06,
    // width: Metrics.screenWidth * 0.8,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#3c5abc',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  headerText:{
    fontSize: 17,
    color:'white',
  },
  shop: {
    height: Metrics.screenHeight * 0.10,
    width: Metrics.screenWidth * 0.80,
    // backgroundColor:'red',
    alignSelf:'center'
  },
  text:{
    fontSize: 12,
    color: '#3c5abc'
  },
  pickerCon: {
    height: Metrics.screenHeight * 0.055,
    width: Metrics.screenWidth * 0.80,
    justifyContent:'center',
    // alignItems:'center',
    alignSelf:'center',
    // backgroundColor:'red',
    borderColor:'#3c5abc',
    borderWidth:0.5,
    borderRadius:5,
    marginVertical:5
  },
  picker: {
    height: Metrics.screenHeight * 0.04,
    width: Metrics.screenWidth * 0.79,
    justifyContent:'center',
    alignSelf:'center',
    // fontSize: 12,
    color:'#3c5abc',
    // backgroundColor:'red',
  },
  pickerItem:{
    fontSize: 12,
    color:'#3c5abc',
    padding:10
  },
  category:{
    flex:1,
    fontSize:totalSize(1.5),
    color:'#3c5abc',
    alignSelf:'stretch',
    height: Metrics.screenHeight * 0.06,
  },
  btnCon: {
    height: Metrics.screenHeight * 0.05,
    width: Metrics.screenWidth * 0.80,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    marginVertical: 8,
    backgroundColor:'#3c5abc'
  },
  btnText:{
    fontSize: 15,
    color:'white',
  },
  modelConDel: {
    height: Metrics.screenHeight * 0.25,
    width: Metrics.screenWidth * 0.8,
    backgroundColor:'#f9f9f9',
    alignSelf:'center',
    borderRadius: 10,
    elevation:10,
    justifyContent:'center',
    alignItems:'center'
  },
  msgCon: {
    height: Metrics.screenHeight * 0.17,
    width: Metrics.screenWidth * 0.8,
    alignItems:'center',
    justifyContent:'center'
  },
  btnConDel: {
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.8,
    flexDirection:'row',
    borderTopWidth:0.5,
    borderColor:'gray'
  },
  btn:{
    height: Metrics.screenHeight * 0.08,
    width: Metrics.screenWidth * 0.4,
    
    justifyContent:'center',
    alignItems:'center'
  },
})
