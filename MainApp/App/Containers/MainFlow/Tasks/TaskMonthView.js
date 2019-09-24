import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { height, width, totalSize } from 'react-native-dimension'

export default class TaskMonth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      task_list: [
        { id: 1, task: 'Complete your packing', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: 'Jul 2', user_name: 'Khalid' },
        { id: 2, task: 'Collect the Audit recorde', image: require('../../../Images/man.png'), priority: 'Medium', Status: 'done', Date: 'Jul 25', user_name: 'Majid' },
        { id: 3, task: 'Update shop status', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: 'mar 10', user_name: 'Amir' },
        { id: 4, task: 'Report the status', image: require('../../../Images/man.png'), priority: 'Low', Status: 'pending', Date: 'aug 31', user_name: 'Adnan' },
      ],
      item:
      {
        '2019-04-21': [{ task: 'Check and Audit recorde of the todays sale', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-22': [{ task: 'Complete your packing for the new order placed', Category: 'Milk', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-23': [{ task: 'Collect the Audit recorde of the todays sale', Category: 'Dry', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-24': [],
        '2019-04-25': [{ task: 'gentelly call the rescue and tell them the current contdition', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-26': [{ task: 'Check and Audit recorde of the todays sale', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-27': [{ task: 'Complete your packing for the new order placed', Category: 'Milk', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-28': [{ task: 'Collect the Audit recorde of the todays sale', Category: 'Dry', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-04-29': [],
        '2019-04-30': [{ task: 'gentelly call the rescue and tell them the current contdition', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-21': [{ task: 'Check and Audit recorde of the todays sale', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-22': [{ task: 'Complete your packing for the new order placed', Category: 'Milk', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-23': [{ task: 'Collect the Audit recorde of the todays sale', Category: 'Dry', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-24': [],
        '2019-03-25': [{ task: 'gentelly call the rescue and tell them the current contdition', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-26': [{ task: 'Check and Audit recorde of the todays sale', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-27': [{ task: 'Complete your packing for the new order placed', Category: 'Milk', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-28': [{ task: 'Collect the Audit recorde of the todays sale', Category: 'Dry', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],
        '2019-03-29': [],
        '2019-03-30': [{ task: 'gentelly call the rescue and tell them the current contdition', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'pending', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'done', Date: '2019-04-22', user_name: 'Khalid' }, { task: 'Complete your packing', Category: 'hardware', image: require('../../../Images/man.png'), priority: 'High', Status: 'notDone', Date: '2019-04-22', user_name: 'Khalid' }],

      },
      tasks_by_month: { 
        '2019-04-22': [
          {
            task: 'Complete your packing for the new order placed',
            Category: 'Milk',
            image: require('../../../Images/man.png'),
            priority: 'High',
            Status: 'pending',
            Date: '2019-04-22',
            user_name: 'Khalid'
          }
        ],
        '2019-04-23': [
          {
            task: 'Complete your packing for the new order placed',
            Category: 'Milk',
            priority: 'High',
            Status: 'pending',
            Date: '2019-04-22',
            user_name: 'Khalid'
          },
          {
            task: 'Complete your packing for the new order placed',
            Category: 'Milk',
            priority: 'High',
            Status: 'pending',
            Date: '2019-04-22',
            user_name: 'Khalid'
          }
        ],
        '2019-04-24': [],
      }

    };
  }

  render() {
    return (
      <Agenda
        items={this.state.item}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2019-04-21'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#666'},
      //    '2017-05-09': {textColor: '#666'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      console.warn(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      this.setState({
        items: newItems
      });
    }, 1000);
    console.warn(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {}]}>
        <View style={[styles.taskSubContainer, { flex: 4, backgroundColor: 'transparent', flexWrap: 'wrap', alignItems: 'flex-start' }]}>
          <Text style={[styles.taskTxt, { paddingLeft: width(3), color: 'gray' }]}>{item.task}</Text>
        </View>
        <View style={[styles.taskSubContainer, { flex: 2, backgroundColor: 'transparent', borderRightWidth: 0.25, borderLeftWidth: 0.25, borderColor: 'gray', }]}>
          <Text style={[styles.taskTxt, {}]}>{item.Category}</Text>
        </View>
        <View style={[styles.taskSubContainer, { backgroundColor: 'transparent' }]}>
          {
            item.Status === 'done' ?
              <View style={[styles.statusDot, { backgroundColor: 'rgb(1,200,117)' }]}>

              </View>

              :
              <View style={item.Status === 'pending' ? [styles.statusDot, { backgroundColor: 'gray' }] : [styles.statusDot, { backgroundColor: 'rgb(226,68,91)' }]}></View>
          }

        </View>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No task for this date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    //padding: 10,
    //marginRight: 10,
    marginTop: height(2),
    height: height(10),
    width: width(70),
    //backgroundColor: 'red',
    flexDirection: 'row',
    //flexDirection:''
  },
  taskSubContainer: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statusDot: {
    height: totalSize(2.5),
    width: totalSize(2.5),
    borderRadius: 100,
    backgroundColor: 'red'
  },
  emptyDate: {
    height: height(5),
    // width:width(50),
    flex: 1,
    paddingTop: height(6),
    //borderWidth:0.25
  },
  taskTxt: {
    fontSize: totalSize(1.5),
  }
});
