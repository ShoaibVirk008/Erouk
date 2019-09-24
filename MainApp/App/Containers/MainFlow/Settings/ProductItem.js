
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import { navigation } from 'react-navigation';
import Styles from '../../Styles/ShopsListStyle';
import image from '../../../Themes/Images'
import Metrics from '../../../Themes/Metrics';

export default class ProductItem extends Component<Props> {
  
  render() {
    const { item } = this.props.item;
    return (
      <TouchableOpacity style={Styles.container} onPress={this.props.onPress} >
          <View style = { Styles.statusView }>
            <View style = {[ Styles.textVie, { flexDirection:'row',alignItems:'center' }]}>
              <View style = { Styles.boldRed }></View>
              {/* <Text style = { Styles.simpleText }> {!item.expire? "Not Expired":"Expired"}</Text> */}
              <Text style = { [Styles.simpleText,{marginHorizontal: 5}] }>Deleted on {item.created_at} by {item.user_name}</Text>
            </View>
            {/* <TouchableOpacity onPress={()=>this.props._toggleModal(item.id)}>
              <Image source = {  image.crossIcon } style = { Styles.crossIcon } />
            </TouchableOpacity> */}
          </View>
          <View style = { Styles.mainListView }>
            <Image source = { item.image===null?image.productImage:{uri: item.image} } style ={ Styles.image } />
            <View style = { Styles.textView }>
              <Text style = { [Styles.labelText,{fontSize: 15}] }>{ item.product_name }</Text>
              <Text style = { Styles.simpleText }>{ item.barcode }</Text>
            </View>
            <View style = {[ Styles.textView, { alignItems:'flex-end' } ]}>
              <Text style = { Styles.simpleText }>{ item.category_name }</Text>
              <Text style = { Styles.labelText }>{ item.expiry_date }</Text>
            </View>
            <Image source = {  image.rightArrowIcon } style = {[Styles.crossIcon,{height: Metrics.screenHeight * 0.02}]} />
            {/* <View style = { Styles.crossIcon }>
              <Text></Text>
            </View> */}
        </View>
          
        
      </TouchableOpacity>
    );
  }
}