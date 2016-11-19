// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-11-18 16:19:21

import React, { Component } from 'react';
import {AppRegistry, ListView, Text, View, StyleSheet} from 'react-native';
import api from './api/api';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.req_j();
    this.req_demand_list();
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
  }

  req_j() {
    api.get('j', {});
  }

  req_demand_list() {
    var _this = this;
    api.get('demand/b37', {city_id: '151'}, {
      succ: function(json) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        _this.setState({
          dataSource: ds.cloneWithRows(json.list)
        });
      },
      fail: function(json) {
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={styles.row}>{rowData.nick} {rowData.size}</Text>}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  row: {
    fontSize: 20,
    margin: 10,
    backgroundColor: '#656565',
    color: '#fff'
  },
});

export default function app() {
  AppRegistry.registerComponent('hello', () => Hello);
} 
