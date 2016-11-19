// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-11-18 16:19:21

import React, { Component } from 'react';
import {AppRegistry, ListView, Text, View, StyleSheet} from 'react-native';

import {styles} from './app.ss';
import Controller from './app.c';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {ds: this.ds};

    this.controller = new Controller(this);
    this.controller.req_data();
  }

  on_data(json) {
    this.setState({ds: this.ds.cloneWithRows(json.list)});
  }

  row(data) {
    return (<View style={styles.row}>
              <Text style={styles.nick}>{data.nick}</Text>
              <Text style={styles.props}>{data.size} | {data.budget}</Text>
              <View style={styles.separ}/>
            </View>);
  }

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView dataSource={this.state.ds} renderRow={this.row} />
      </View>
    );
  }
}

export default function app() {
  AppRegistry.registerComponent('hello', () => Hello);
} 
