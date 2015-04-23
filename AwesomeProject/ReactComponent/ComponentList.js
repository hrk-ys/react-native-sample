'use strict';

var React = require('react-native');

var {
  ListView,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} = React;


var NavigatorExample = require('./UIExplorer/Navigator/NavigatorExample');

var createExamplePage = require('./UIExplorer/createExamplePage');

var items = [
 require('./UIExplorer/ActionSheetIOSExample'),
 require('./UIExplorer/ActivityIndicatorIOSExample'),
 require('./UIExplorer/AdSupportIOSExample'),
 require('./UIExplorer/AlertIOSExample'),
 require('./UIExplorer/AppStateIOSExample'),
 require('./UIExplorer/AsyncStorageExample'),

 NavigatorExample,
 require('./UIExplorer/NavigatorIOSExample'),

];

var ComponentList = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(items),
    };
  },

  selectItem: function(item: Object) {
    if (item === NavigatorExample) {
      this.props.onExternalExampleRequested(
        NavigatorExample
      );
      return;
    }
    this.props.navigator.push({
      title: item.title,
      component: createExamplePage(item.title, item),
    });
  },

  renderRow: function(item: Object) {
    return (
      <ComponentCell
        component={item}
        onSelect={() => this.selectItem(item)}
       />
    );
  },
  render: function() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  },
});


var ComponentCell = React.createClass({
  render: function() {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect} underlayColor="lightgray">
          <View>
            <Text style={styles.cellTitle}>{this.props.component.title}</Text>
            <View style={styles.separator} />
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});


var styles = StyleSheet.create({
  cellTitle: {
    padding: 15,
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});


module.exports = ComponentList;
