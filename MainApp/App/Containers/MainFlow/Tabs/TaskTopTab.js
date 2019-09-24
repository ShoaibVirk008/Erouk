import React from 'react';
import { Icon } from 'react-native-elements';

import { createMaterialTopTabNavigator } from 'react-navigation';

import Member from '../Tasks/tasks';
import { width, height, totalSize } from 'react-native-dimension';
import Note from '../Tasks/Notes';
// import Icon from 'react-native-vector-icons/Ionicons';

// Main Tabs by createBottomTabNavigator
export default createMaterialTopTabNavigator({
  Tasks: {
    screen: Member,
    navigationOptions: {
      header: null,
      tabBarIcon:({tintColor})=> (<Icon name='tasks' size={totalSize(2)} type='font-awesome' color={tintColor} />)
    }
  },
  Notes: {
    screen: Note,
    navigationOptions: {
      header: null,
      tabBarIcon:({tintColor})=> (<Icon name='note' size={totalSize(2)} type='material-icon' color={tintColor}/>)
    }
  },
}, {
    //initialRouteName : 'Tasks',
    //order:['Tasks','Notes'],
    //backBehavior: true,
    //lazy: true,
    //swipeEnabled: true,
    tabBarOptions: {
      header: null,
      activeTintColor: 'white',
      // activeBackgroundColor: '#3c5abc',
      inactiveTintColor: '#ffffff',
      //showLabel: true,
      //showIcon: true,
      // allowFontScaling: true, 
      // style: {
      //   backgroundColor:'#ffffff',
      //   justifyContent:'center',
      // },
      // labelStyle: {
      //   fontWeight:'bold'
      // },
      // tabStyle: {
      //   justifyContent:'center',
      //   alignItems:'center'
      // },
      // safeAreaInset: {bottom: 'always', top: 'never'}
      navigationOptions: {
        header: null
      }
    }
  });

//export default createStackNavigator(TaskTopTabs);
