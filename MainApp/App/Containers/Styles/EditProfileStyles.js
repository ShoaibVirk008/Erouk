import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
export default StyleSheet.create({
  ...ApplicationStyles,
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
    height: Metrics.screenHeight * 0.05,
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
    height: Metrics.screenHeight * 0.05,
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
  }
})
