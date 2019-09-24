import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import Metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.button,
    width: Metrics.screenWidth - Metrics.screenWidth * 0.17 ,
    height: Metrics.screenHeight * 0.07,
    borderRadius: 5,
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.snow,
 
  
  }
})
