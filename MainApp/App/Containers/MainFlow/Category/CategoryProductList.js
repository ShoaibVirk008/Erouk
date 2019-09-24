
import React, { Component } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProductList from './ProductList';
import Styles from '../../Styles/ShopsStyle';
import images from '../../../Themes/Images';
import Metrics from '../../../Themes/Metrics';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
@observer
export default class CategoryProductList extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            productList: [1, 2, 3, 4, 5, , 6, 7, 8, 9, 10]
        }
    }
    static navigationOptions = {
        title: 'Product List',
        headerRight: (<View style={{ width: Metrics.screenWidth - Metrics.screenWidth * 0.75, flexDirection: 'row', justifyContent: 'center' }}>
            <Image source={images.addMemberIcon} style={[Styles.icons, { marginRight: 20 }]} />
            <Image source={images.searchIcon} style={Styles.icons} />
        </View>),
        // headerLeft: (<View style = { Styles.headerLeft }><Image source = { images.profileIcon } style = { Styles.icons } /></View>),
        headerBackTitle: null,
    }
    goTo = (reute, params) => {
        this.props.navigation.navigate(reute, params);
    }
    render() {
        return (
            <View style={Styles.container}>
                <TouchableOpacity style={styles.addProductButton} onPress={() => this.goTo('AddProduct', null)} >
                    <Text style={styles.buttonText}>Add</Text >
                </TouchableOpacity>
                <FlatList
                    data={store.PRODUCT_DETAIL}
                    renderItem={(item) => <ProductList item={item} onPress={() => this.goTo('ProductDetail', { detail: item })} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addProductButton: {
        width: Metrics.screenWidth * 0.93,
        height: Metrics.screenHeight * 0.065,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3c5abc',
    },
    buttonText: {
        fontSize: 14,
        color: '#dadada'
    }
})