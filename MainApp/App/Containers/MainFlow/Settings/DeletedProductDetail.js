import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image,ScrollView } from 'react-native';
import Styles from '../../Styles/ShopsStyle';
import ApplicationStyles from '../../../Themes/ApplicationStyles'
import Metrics from '../../../Themes/Metrics';
import size from '../../../Themes/Fonts';
import colors from '../../../Themes/Colors';
import images from '../../../Themes/Images';
let _this = null;
export default class ProductDetail extends Component{
    constructor(props){
        super(props);
        this.state = { 
            product_detail: {}
        };
    }
    static navigationOptions = ({navigation}) => ({ 
        title: 'Product Detail',
      })
   
  render() {
    const { item } = this.props.navigation.state.params.detail;
    return (
        <View style = {[ Styles.container, { justifyContent:'flex-start' } ]}>
             <View style = {{ marginTop:10, borderRadius:5, backgroundColor:'#ffffff',elevation: 5,width: Metrics.screenWidth * 0.9,  alignItems:'center', justifyContent:'center' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Product</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.product_name }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>BarCode</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.barcode }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Expiry Date</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.expiry_date }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Deleted by</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.user_name }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Created by</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.user_name }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Created at</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.created_at }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Shop</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.shop_name }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.08, alignItems:'center', justifyContent:'space-between' }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Category</Text>
                    <Text style = {{ color: 'gray', fontSize: size.small }}>{ item.category_name }</Text>
                </View>
                <View style = {{ borderBottomColor:'#f6f6f6',flexDirection:'row', borderBottomWidth:1, width: Metrics.screenWidth * 0.8,height: Metrics.screenHeight * 0.38, alignItems:'center',  }}>
                    <Text style = {{ color: '#8091d0', fontSize: size.small }}>Image</Text>
                    <Image style = {{ height: Metrics.screenHeight * 0.36, width: Metrics.screenWidth * 0.62, resizeMode:'contain',margin: 10 }} source = { item.image===null?images.productImage:{uri: item.image} }></Image>
                </View>
                </ScrollView>
            </View>
        </View>
    );
  }
}




