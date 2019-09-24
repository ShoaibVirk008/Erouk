import { StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../Themes/'
import Metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  button: {
    marginVertical: 10,
    backgroundColor: Colors.button,
    width: Metrics.screenWidth * 0.3,
    height: 45,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.snow,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.bold
  }
})
