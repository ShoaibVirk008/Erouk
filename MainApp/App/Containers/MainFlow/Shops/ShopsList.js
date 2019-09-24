
import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { navigation } from 'react-navigation';
import Styles from '../../Styles/ShopsListStyle';
import image from '../../../Themes/Images';
import { Icon } from 'react-native-elements';
import Metrics from '../../../Themes/Metrics';
import { totalSize } from 'react-native-dimension';

export default class ShopsList extends Component<Props> {

  render() {
    const { item } = this.props.item;
    return (
      <TouchableOpacity style={Styles.container} onPress={this.props.onPress} >
        <View style={Styles.statusView}>
          <View style={[Styles.textVie, { flexDirection: 'row', alignItems: 'center' }]}>
            <View style={[Styles.boldRed, { backgroundColor: item.expire ? 'red' : 'green' }]}></View>
            <Text style={Styles.simpleText}> {!item.expire ? item.daysToExpire + ' days left' : "Expired"}</Text>
          </View>
          <TouchableOpacity onPress={() => this.props._toggleModal(item.id)}>
            <Icon name='close-o' type='evilicon' color='#DE131E' size={totalSize(3)} />
            {/* <Image source = {  image.crossIcon } style = { Styles.crossIcon } /> */}
          </TouchableOpacity>
        </View>
        <View style={Styles.mainListView}>
          {
            item.image ?
              <Image source={{ uri: item.image }} style={Styles.image} />
              :
              <Text style={Styles.no_img}>No image</Text>
          }
          <View style={Styles.textView}>
            <Text style={Styles.labelText}>{item.product_name}</Text>
            <Text style={Styles.simpleText}>{item.barcode}</Text>
          </View>
          <View style={[Styles.textView, { alignItems: 'flex-end' }]}>
            <Text style={Styles.simpleText}>{item.category_name}</Text>
            <Text style={Styles.labelText}>{item.expiry_date}</Text>
          </View>
          <Image source={image.rightArrowIcon} style={[Styles.crossIcon, { height: Metrics.screenHeight * 0.02 }]} />
          {/* <View style = { Styles.crossIcon }>
              <Text></Text>
            </View> */}
        </View>


      </TouchableOpacity>
    );
  }
}