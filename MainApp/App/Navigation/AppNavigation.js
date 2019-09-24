import { StackNavigator } from 'react-navigation';
import React from 'react';
import { View } from 'react-native';
import Splash from '../Containers/Splash';
import Login from '../Containers/LoginFlow/LoginScreen';
import Products from '../Containers/MainFlow/Products/Products';

import Drawer from '../Containers/MainFlow/Drawer/CreateDrawerNavigator'
import CustomDrawer from '../Containers/MainFlow/Drawer/CustomDrawer';

import AddProduct from '../Containers/MainFlow/Products/AddProduct';
import ProductDetail from '../Containers/MainFlow/Products/ProductDetail';
import EditProduct from '../Containers/MainFlow/Products/EditProduct'
import BarCodeScanner from '../Containers/MainFlow/Products/BarCodeScanner'

import EditProfile from '../Containers/MainFlow/Profile/EditProfile';
import ViewProfile from '../Containers/MainFlow/Profile/ViewProfile';

import NotificationList from '../Containers/MainFlow/InvitationNotification/NotificationList'

import Settings from '../Containers/MainFlow/Settings/Settings';
import NotificationSetting from '../Containers/MainFlow/Settings/NotificationSetting';
import DeletedProductList from '../Containers/MainFlow/Settings/DeletedProductList';
import DeletedProductDetail from '../Containers/MainFlow/Settings/DeletedProductDetail';
import TeamMembers from '../Containers/MainFlow/Settings/TeamMembers';

import inviteMembers from '../Containers/MainFlow/Tasks/tasks'
import ContactList from '../Containers/MainFlow/Tasks/ContactList'

import Shops from '../Containers/MainFlow/Shops/Shops';
import Category from '../Containers/MainFlow/Category/Category';
import Metrics from '../Themes/Metrics';

import Tabs from '../Containers/MainFlow/Tabs/TabNavigation'

import style from '../Themes/Fonts';
import TaskTopTab from '../Containers/MainFlow/Tabs/TaskTopTab';
import TaskDetail from '../Containers/MainFlow/Tasks/taskDetail';
import NoteDetail from '../Containers/MainFlow/Tasks/noteDetail';

var headerWidth = Metrics.screenWidth * 0.1;
const PrimaryNav = StackNavigator({
  TaskTabs: {
    screen: TaskTopTab,
    navigationOptions: {
      header: null
    }
  },
  Tabs: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  Splash: { screen: Splash },
  Login: { screen: Login },
  AddProduct: { screen: AddProduct },
  ProductDetail: { screen: ProductDetail },
  Shops: { screen: Shops },
  Category: { screen: Category },
  Products: { screen: Products },
  EditProduct: EditProduct,
  EditProfile: EditProfile,
  ViewProfile: ViewProfile,
  inviteMembers: inviteMembers,
  DeletedProductList: DeletedProductList,
  DeletedProductDetail: DeletedProductDetail,
  TeamMembers: TeamMembers,
  ContactList :ContactList,
  Settings: Settings,
  CustomDrawer: CustomDrawer,
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      header: null
    }
  },
  BarCodeScanner: BarCodeScanner,
  NotificationSetting: NotificationSetting,
  NotificationList: NotificationList,
  TaskDetail:TaskDetail,
  NoteDetail:NoteDetail
},
  {
    // Default config for all screens
    // headerMode: 'none',
    initialRouteName: 'Splash',
    headerLayoutPreset: 'center',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#3c5abc',
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'normal',
        alignSelf: 'center',
        textAlign: 'center',
        width: Metrics.screenWidth - Metrics.screenWidth * 0.35,
      },
      headerTintColor: 'white'
    }
  }
)

export default PrimaryNav;