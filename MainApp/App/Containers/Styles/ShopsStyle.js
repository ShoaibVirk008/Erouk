import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
export default StyleSheet.create({
  ...ApplicationStyles,
  shopName:{
    fontSize: size.medium,
    color: colors.labeltext,
    width: Metrics.screenWidth * 0.92,
    height: Metrics.screenHeight * 0.06,
    textAlignVertical:'center',
    marginLeft: 25
  },
  modelCon: {
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
  btnCon: {
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
  btnText: {
    fontSize: 15,
    color:'black'
  },
  msgText:{
    fontSize: 17,
    color:'black',
    marginVertical:2
  },
})
