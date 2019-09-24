import { StyleSheet } from 'react-native'
import ApplicationStyles from '../../Themes/ApplicationStyles'
import Metrics from '../../Themes/Metrics';
import size from '../../Themes/Fonts';
import colors from '../../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyles,
  simpleText: {
    fontSize: size.small,
    color: colors.simpletext,
  },
  labelText: {
    fontSize: size.small,
    color: colors.labeltext,
  },
  
  boldRed:{
    backgroundColor:'red',
    width: Metrics.screenWidth * 0.01,
    height: Metrics.screenHeight * 0.007,
    borderRadius:20,
  },
  statusView:{
    flexDirection:'row',
    justifyContent:'space-between',
    width: Metrics.screenWidth - 20,
    alignItems:'center',
  },
  crossIcon:{
      width: Metrics.screenWidth * 0.04,
      height: Metrics.screenHeight * 0.04,
      resizeMode:'contain',
      alignSelf:'center',
      marginLeft: 5
  },
  textView:{
    width: Metrics.screenWidth * 0.35,
    justifyContent:'center',
  },
  mainListView:{
    flexDirection:'row',
    borderRadius:10,
    elevation   : 3,
    shadowColor:'pink',
    width: Metrics.screenWidth - 20,
    marginBottom: 5,
    // backgroundColor:'white'
  },
image:{
    width:   Metrics.screenWidth * 0.12,
    height: Metrics.screenHeight * 0.10,
    resizeMode:'contain',
    margin:10
},
  settingsRow:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 5,
  },
  settingsInput:{
    width:Metrics.screenWidth * 0.18,
    height: 25,
    backgroundColor:'white',
    borderRadius: 8,
    margin: 10,
   padding:5
  },
  labelContainer:{
    width: Metrics.screenWidth * 0.4,
  },
  dividerSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  hr: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: Metrics.screenWidth * 0.3
  },
  rectangularButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 45,
    width: Metrics.screenWidth * 0.8,
    backgroundColor: '#1daecd',
    marginBottom: 10,
    padding: 5
  },
  buttonIcon: {
    height: 25,
    width: 25,
    margin: 10,
    borderRightWidth: 1,
    borderColor: 'white'
  },
  inputText: {
    height: 40,
    width: Metrics.screenWidth * 0.8,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#1daecd',
    textAlign: 'center'
  }
})
