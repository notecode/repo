/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, ListView, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import extend from 'extend';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.api = 'http://api.xxtao.com/index.php'
    //this.fetch_j();
    this.axios_j();
    this.axios_demand_list();
    this.state = {dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})};
  }

  axios_demand_list() {
    var _this = this;
    this.axios_get('demand/b37', {city_id: '151'}, {
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

  axios_j() {
    this.axios_get('j', {});
  }

  axios_get(r, q, cb) {
    function tlog(text) {
      console.log(text);
    }
    function olog(pre, obj) {
      var t = pre + JSON.stringify(obj);
      var max = 500;
      if (t.length < max) {
        tlog(t)
      } else {
        tlog(t.substring(0, max) + ' ... [total: ' + t.length + ']')
      }
    }

    axios.get(this.api, {
      params: extend({
        'r': r
      }, q) 
    })
    .then(function (response) { 
      var resp = response.data;
      olog('axios resp:', resp);

      cb && cb.always && cb.always(resp);
      if (1 == resp.succ) {
        cb && cb.succ && cb.succ(resp);
      } else {
        cb && cb.fail && cb.fail(resp);
      }
    })
    .catch(function (error) {
      tlog(error);
      cb && cb.always && cb.always(resp);
      cb && cb.fail && cb.fail({});
    });
  }

  fetch_j() {
    fetch(this.api + '?r=j')
    .then((response) => response.text())
    .then((responseText) => {
      console.log('fetch resp: ' + responseText);
    })
    .catch((error) => {
      console.warn(error);
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

AppRegistry.registerComponent('Demo', () => Demo);
