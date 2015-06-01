/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var Content = React.createClass({
  onPressPush() {
    console.log("onPress");
    this.props.navigator.push({
      component: Content
    })
  },
  onPressPop() {
    this.props.navigator.pop();
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text onPress={this.onPressPush}>
          Push
        </Text>
        <Text onPress={this.onPressPop}>
          Pop
        </Text>
      </View>
    );
  }
});

var NaviIOSSample = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        ref="nav"
        initialRoute={{
          component: Content
        }}
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('NaviIOSSample', () => NaviIOSSample);
