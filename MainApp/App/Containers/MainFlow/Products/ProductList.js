
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { navigation } from 'react-navigation';
import Styles from '../../Styles/ShopsListStyle';
import image from '../../../Themes/Images'

export default class ProductList extends Component<Props> {
  goToProduct = () => {
    this.props.navigation.push('Category')
  }
  render() {
    const { item } = this.props.item;
    return (
      <TouchableOpacity style={Styles.container} onPress={this.props.onPress} >
        <View style={Styles.statusView}>
          <View style={[Styles.textVie, { flexDirection: 'row', alignItems: 'center' }]}>
            <View style={[Styles.boldRed,{backgroundColor: item.expire?'red':'green'}]}></View>
            <Text style={Styles.simpleText}>{!item.expire? item.daysToExpire + ' days left':"Expired"}</Text>
          </View>
          <TouchableOpacity onPress={()=>this.props._toggleModal(item.id)} >
             <Image source={image.crossIcon} style={Styles.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.mainListView}>
          {
             item.image === null?
              <Text style={Styles.no_img}>No Image</Text>
              :
              <Image source={{uri: item.image}} style={Styles.image} />
          }
          <View style={Styles.textView}>
            <Text style={Styles.labelText}>{item.product_name}</Text>
            <Text style={Styles.simpleText}>{item.quantity}</Text>
          </View>
          <View style={[Styles.textView, { alignItems: 'flex-end' }]}>
            <Text style={Styles.simpleText}>{item.category_name}</Text>
            <Text style={Styles.labelText}>{item.expiry_date}</Text>
          </View>
          <Image source={image.rigthArrowIcon} style={Styles.crossIcon} />
          {/* <View style = { Styles.crossIcon }>
              <Text></Text>
            </View> */}
        </View>
      </TouchableOpacity>
    );
  }
}