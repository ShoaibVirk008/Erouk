
import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Dimensions, Image, ImageBackground} from 'react-native';
import { navigation } from 'react-navigation';
import Styles from '../../Styles/CategoryListStyles';
import ApplicationStyles from '../../../Themes/ApplicationStyles'
import Metrics from '../../../Themes/Metrics';
import size from '../../../Themes/Fonts';
import colors from '../../../Themes/Colors';
import images from '../../../Themes/Images';
import Toast from 'react-native-simple-toast';

// import size from '../../../Themes/Fonts';
// import colors from '../../../Themes/Colors';
var scrnHeight = Metrics.screenHeight;
var scrWidth = Metrics.screenWidth;
export default class CategoryList extends Component<Props> {
  goToProduct = () => {
    var PRODUCTS = this.props.item.categories.products.sort((a,b) => (a.daysToExpire > b.daysToExpire) ? 1 : ((b.daysToExpire > a.daysToExpire) ? -1 : 0));  
    if (this.props.item.categories.products.length > 0) {
      this.props.navigation.push('Products',{products: PRODUCTS});
    }else{
      Toast.show('There is no product in this category')
    }
  }
  render() {
    return (
      <TouchableOpacity style={{ backgroundColor:'#ffffff' }} 
        delayLongPress={1000}
        onPress = { this.goToProduct } 
        onLongPress={()=>{
          if (this.props.item.categories.products.length === 0) {
            this.props._deleteCategory(this.props.item.categories.id)
          } else {
            Toast.show('Please press the category to move forward')
          }
        }}
         >

        <View style = {{ borderBottomColor:'#f6f6f6', borderBottomWidth:0.5, width: scrWidth * 0.8 , height: scrnHeight * 0.08,flexDirection:'row', alignItems:'center', justifyContent:'space-between',  }}>
          <Text style = {{ fontSize: size.small, color: colors.labeltext }}>{this.props.item.categories.category_name}</Text>
          <View style = {{ flexDirection:'row', alignItems:'center',justifyContent:'center' }}>
            <Text style = {{ fontSize: size.tiny, color: colors.labeltext }}>{this.props.item.categories.products.length} items</Text>
            <Image style = {{ height: scrnHeight * 0.02, width: scrWidth * 0.05, resizeMode:'contain', margin:0,marginHorizontal:3,marginTop:0 }} source = { images.rightArrowIcon } />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}