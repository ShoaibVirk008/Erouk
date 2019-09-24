import React from 'react';
import { Text, View,Button } from 'react-native';
import {Icon } from 'react-native-elements';

import { createBottomTabNavigator,createStackNavigator } from 'react-navigation';

import Shops from '../Shops/Shops';
import Category from '../Category/Category';
import AddProduct from '../Products/AddProduct';
import Settings from '../Settings/Settings';
import TaskTopTab from './TaskTopTab';

// stack of Shops
const ShopStack =  createStackNavigator ({
  Shops: Shops,
},{headerLayoutPreset:'center'});
 
// stack of Category
const CategoryStack =  createStackNavigator ({
  Category: Category,
},{headerLayoutPreset:'center'});

// stack of AddProduct
const AddProductStack =  createStackNavigator ({
  AddProduct: AddProduct,
},{headerLayoutPreset:'center'});

// stack of Members
const taskTopTab =  createStackNavigator ({
  Member: TaskTopTab,
});

// stack of Settings
const SettingStack =  createStackNavigator ({
  Settings: Settings,
},{headerLayoutPreset:'center'});

// Main Tabs by createBottomTabNavigator
const Tabs = createBottomTabNavigator({
  Store: {
    screen: ShopStack,
    navigationOptions: {
      tabBarIcon:({tintColor})=> (<Icon name='home' size={24} type='font-awesome'color={tintColor} />),
    }
  },
  Category: {
    screen: CategoryStack,
    navigationOptions: {
      tabBarIcon:({tintColor})=> (<Icon name='sitemap' size={24} type='font-awesome'color={tintColor} />),
    }
  },
  AddProduct: {
    screen: AddProductStack,
    navigationOptions: {
      tabBarIcon:({tintColor})=>(<Icon name= 'ios-add-circle-outline' size={25} type='ionicon' color={tintColor} />)
    }
  },
  Tasks: {
    screen: taskTopTab,
    navigationOptions: {
     
      tabBarIcon:({tintColor})=> (<Icon name= 'tasks' size={20} type='font-awesome'color={tintColor}/>)
    }
  },
  Setting: {
    screen: SettingStack,
    navigationOptions: {
      tabBarIcon:({tintColor})=> (<Icon name= 'cog' size={20} type='font-awesome'color={tintColor}/>)
    }
  },
}, {
  initialRouteName : 'Store',
  order:['Store','Category','AddProduct','Tasks','Setting'],
  backBehavior: true,
  lazy: true,
  swipeEnabled: true,
  tabBarOptions: {
    //activeTintColor: 'black',
    activeTintColor: '#3c5abc',
    inactiveTintColor: 'gray',
    showLabel: true,
    showIcon: true,
    allowFontScaling: true, 
    header:null,
    style: {
      backgroundColor:'#ffffff',
      justifyContent:'center',
    },
    labelStyle: {
      fontWeight:'bold'
    },
    tabStyle: {
      justifyContent:'center',
      alignItems:'center'
    },
    safeAreaInset: {bottom: 'always', top: 'never'}

  }
});

export default Tabs;
