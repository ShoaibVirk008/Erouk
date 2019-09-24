import { StyleSheet,I18nManager } from 'react-native'
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
    width: Metrics.screenWidth * 0.02,
    height: Metrics.screenHeight * 0.012,
    borderRadius:20,
    marginHorizontal: 5
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
      marginLeft: 5,
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
  },
  textView:{
    width: Metrics.screenWidth * 0.35,
    justifyContent:'center',
    alignItems: 'flex-start'
  },
  mainListView:{
    flexDirection:'row',
    borderRadius:10,
    elevation   : 3,
    marginVertical: 5,
    marginHorizontal: 5,
    shadowColor:'pink',
    width: Metrics.screenWidth - 20,
    marginBottom: 5,
    backgroundColor:'white'
  },
image:{
    width:   Metrics.screenWidth * 0.12,
    height: Metrics.screenHeight * 0.10,
    resizeMode:'contain',
    margin:10
},
no_img:{
  width:   Metrics.screenWidth * 0.12,
  height: Metrics.screenHeight * 0.10,
  margin:10,
  textAlignVertical:'center'
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
