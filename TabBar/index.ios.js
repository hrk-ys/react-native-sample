/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  TextInput,
  AppRegistry,
} = React;

var _renderingTab = {};
var TabBarExample = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  getInitialState: function() {
    _renderingTab[ 'redTab' ] = true;
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },
  componentWillUpdate: function(nextProps: object, nextState: object) {
    console.log(nextState);
    _renderingTab[ nextState.selectedTab ] = true;
  },

  _renderContent: function(color: string, pageText: string, tag: string) {
    if (!_renderingTab[tag]) {
      return <View />;
    }
    console.log("_renderContent:", pageText);
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{this.state.presses} re-renders of the More tab</Text>
        <View>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({input: text})}
          />
          <Text>{'user input: ' + this.state.input}</Text>
        </View>
      </View>
    );
  },

  render: function() {
    return (
      <TabBarIOS
        tintColor="black"
        barTintColor="#3abeff">
        <TabBarIOS.Item
          title="Blue Tab"
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
          {this._renderContent('#414A8C', 'Blue Tab', 'blueTab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          
          badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            _renderingTab[ 'redTab' ];
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
          {this._renderContent('#783E33', 'Red Tab', 'redTab')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="more"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
          {this._renderContent('#21551C', 'Green Tab', 'greenTab')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});


AppRegistry.registerComponent('TabBar', () => TabBarExample);
