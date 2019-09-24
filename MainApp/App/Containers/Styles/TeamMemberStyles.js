import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
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
    alignItems:'center',
    backgroundColor: '#f9f9f9',
  },
  shopName:{
    fontSize: 16,
    color:'#3c5abc',
    fontWeight:'bold',
    marginVertical:0,
    marginTop:15
  },
  description:{
      fontSize: 14,
      color:'gray',
      marginHorizontal:5,
      width:Metrics.screenHeight * 0.5,
      textAlign:'center'  
  },
  linkView:{
      height: Metrics.screenHeight * 0.13,
      width: Metrics.screenWidth * 0.9,
      alignSelf:'center',
      backgroundColor:'#ffffff',
      elevation: 10,
      marginTop:0,
      marginVertical:10,
      borderRadius:5,
      flexDirection:'row',
      borderWidth:0.5,
      borderColor:'#676f9f',
      borderStyle:'dashed',
  },
  memberView:{
      height: Metrics.screenHeight * 0.13,
      width: Metrics.screenWidth * 0.9,
      alignSelf:'center',
      backgroundColor:'#ffffff',
      elevation: 10,
      marginVertical:10,
      borderRadius:5,
      flexDirection:'row',
      borderWidth:0.5,
      borderColor:'#676f9f',
      borderStyle:'dashed',
  },
  logoView: {
      height: Metrics.screenHeight * 0.13,
      width: Metrics.screenWidth * 0.28,
      justifyContent:'center',
      alignItems:'center',
  },
  textView:{
      height: Metrics.screenHeight * 0.13,
      width: Metrics.screenWidth * 0.62,
      justifyContent:'center',
  },
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
    height: Metrics.screenHeight * 0.06,
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
    fontSize:12,
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
})
