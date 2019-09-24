import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, ImageBackground, TextInput, Image, ScrollView, TouchableOpacity, PermissionsAndroid,ToastAndroid
} from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';
import { observer } from 'mobx-react';
import store from '../../../Stores/orderStore';
import api from '../../../lib/api';
import Toast from 'react-native-simple-toast';
import SendSMS from 'react-native-sms';
@observer export default class ContactList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      contacts: [],
      searchText: '',
      searchContacts: []
    };
  }
  static navigationOptions = {
    headerTitle: 'Contact List',
    headerStyle: {
      backgroundColor: '#3c5abc',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontSize: totalSize(2),
      fontWeight: 'normal'
    }
  }
  search() {
    if (this.state.searchText.length !== 0) {
        this.setState({
          loading: true
        })
        console.warn('length:',store.CONTACT_LIST);
        
        for (let i = 0; i < store.CONTACT_LIST.length; i++) {
          if (store.CONTACT_LIST[i].givenName.includes(this.state.searchText)) {
              this.state.searchContacts.push(store.CONTACT_LIST[i])
              this.setState({loading: false})
          }
        }
    } else {
      Toast.show('Please enter any name');
    }
    console.warn('search=',this.state.searchContacts);
  }
  sendInvitation(number) {
    SendSMS.send({
      body: 'Download Erouk App and see new Products that are uploaded by the shoop keeper',
      recipients: [number],
      successTypes: ['sent', 'inbox'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

    });
  }
  render() {
    if (this.state.searchContacts.length > 0) {
        var contacts = this.state.searchContacts;
    } else {
      var contacts = store.CONTACT_LIST;
    }
    return (
      <View style={styles.container}>
        <View style={{ height: height(10), width: width(100), backgroundColor: 'rgba(0,0,0,0.8)', justifyContent:'center', alignItems:'center' }}>
          <View style={{height:height(7),width:width(90), borderRadius:5, backgroundColor:'white', justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
            <TextInput
              onChange={(value) => this.setState({searchText: value}) }
              placeholder='Search'
              placeholderTextColor='gray'
              underlineColorAndroid='transparent'
              keyboardType='default'
              style={{ alignSelf: 'stretch', width: width(80), fontSize: totalSize(1.6), color: '#1c1c4e' }}
            />
            <TouchableOpacity onPress={()=>{
                this.search()
            }}>
              <Image source={require('../../../Images/search-icon.png')} style={{height:height(2.3),width:width(5),resizeMode:'contain',marginHorizontal:5}} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {
            contacts.map((item, key) => {
              return (
                <TouchableOpacity key={key} style={{ height: height(8), width: width(92), alignSelf: 'center', marginVertical: 5 ,elevation: 5 , backgroundColor: '#ffffff', flexDirection: 'row' }}
                  onPress={() => { 
                      this.sendInvitation(item.phoneNumbers[0].number) 
                    }}
                >
                  <View style={{ width: width(20), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    {
                      item.hasThumbnail === false ?
                        <Image source={require('../../../Images/boy.png')} style={{ height: height(6), width: width(12) }} />
                        :
                        <Image source={{ uri: item.thumbnailPath }} style={{ height: height(7), width: width(12), borderRadius: 100 }} />
                    }
                  </View>
                  <View style={{ width: width(70), flexDirection: 'row' }}>
                    <View style={{ width: width(53), justifyContent: 'center' }}>
                      <View style={{ height: height(3), justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: totalSize(1.8), color: 'black' }}>{item.givenName}</Text>
                      </View>
                      <View style={{ height: height(3), justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: totalSize(1.5), color: 'gray' }}>{item.phoneNumbers.length > 0? item.phoneNumbers[0].number : null}</Text>
                      </View>
                    </View>
                    <View style={{ width: width(15), justifyContent: 'center', alignItems: 'flex-end' }}>
                      <Image source={require('../../../Images/close-envelope.png')} style={{ height: height(4), width: width(12),alignSelf:'center',resizeMode:'contain' }} />   
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },

});
