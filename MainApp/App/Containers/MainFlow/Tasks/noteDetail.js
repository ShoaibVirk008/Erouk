import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { totalSize, width, height } from 'react-native-dimension';
import { Icon } from 'react-native-elements';
import store from '../../../Stores/orderStore'
class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static navigationOptions = {

    //header:null,
    headerTitle: 'Note Detail',
    headerRight: (
      <TouchableOpacity style={{ marginHorizontal: width(2) }}>
        <Icon name='delete' color='white' size={totalSize(3)} />
      </TouchableOpacity>
    ),
  }
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.TopContainer}>
          <Text style={styles.dateTxt}>{store.NOTE_DETAIL.Date} 2019 at 8:38 AM</Text>
        </View>
        <View style={styles.BottomContainer}>
          <View style={styles.noteContainer}>
            <Text style={styles.noteTxt}>{store.NOTE_DETAIL.note}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default NoteDetail;

const styles = StyleSheet.create({
  Container: {
    flex: 1,

  },
  TopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  BottomContainer: {
    flex: 9,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue'

  },
  noteContainer: {
    width: width(90),

    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: 'green'

  },
  dateTxt: {
    fontSize: totalSize(1.5),
    color: 'gray'
  },
  noteTxt: {
    fontSize: totalSize(2),
    //color:'gray'
  }
})