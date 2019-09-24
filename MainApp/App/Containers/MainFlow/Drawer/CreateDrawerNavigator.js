
import React, { Component } from 'react';
import { createDrawerNavigator,DrawerNavigator } from 'react-navigation';
import { Metrics } from '../../../Themes';
import { width } from 'react-native-dimension';
import Tabs from '../Tabs/TabNavigation';
import CustomDrawer from './CustomDrawer';
const Drawer = createDrawerNavigator({  
    Tabs: Tabs
},{ 
    initialRouteName: 'Tabs',
    drawerWidth: width(70),
    drawerPosition:'left',
    contentComponent: props => <CustomDrawer {...props} />,
    useNativeAnimations: true,
    // drawerType:'slide', // front , back , slide
    backBehavior: true
});

export default Drawer;