import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';

export default StyleSheet.create({
  ...ApplicationStyles,
  journeyLabel: {
    fontSize: 14,
    color: 'white',
    width:Metrics.screenWidth * 0.45,
    // fontWeight:'bold',
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 12,
  },
  buttonsRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 15,
    width:Metrics.screenWidth * 0.90,    
  }
  
})
