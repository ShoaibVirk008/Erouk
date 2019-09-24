import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';
export default StyleSheet.create({
  ...ApplicationStyles,
  mainContainer:{
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
      resizeMode:'contain',
      alignItems:'center',
      justifyContent:'flex-end'
  },
    appLogo:{
        width: Metrics.screenWidth * 0.45,
        height: Metrics.screenHeight * 0.45,
        resizeMode:'contain'
    },
    buttonView:{
        width: Metrics.screenWidth * 0.8,
        height: Metrics.screenHeight * 0.07,
        resizeMode:'contain',
        marginBottom:10
    },
    registerText:{
        fontSize: size.medium,
        alignSelf:'center',
        textAlign:'center',
        color:'#d9c2fc'
    },
    registerTextView:{
        width: Metrics.screenWidth * 0.8,
        height: Metrics.screenHeight * 0.22,
        alignItems:'center',
        justifyContent:'center',
        marginTop:15
    }
})
