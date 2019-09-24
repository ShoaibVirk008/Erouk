import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Styles from '../../Styles/ShopsStyle';
import FullButton from '../../Components/FullButton';

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
    }
    goTo = (args) => {
        this.props.navigation.push(args);
    }
    goToHome = () => {

    }
  render() {
    return (
        <View style = { Styles.container }>
           <FullButton text = { 'Start Journey' } onPress = { () => this.goTo('StartJourney') }/>
           <FullButton text = { 'View Journey' } onPress = { () => this.goTo('ViewJourney') }/>
           <FullButton text = { 'Total Score' } onPress = { this.goToHome }/>
           <FullButton text = { 'Settings' } onPress = { () => this.goTo('Settings') } />
        </View>
    );
  }
}




