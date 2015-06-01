/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Router = require('react-native-router');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var RouterSample = React.createClass({
  onPress() {
    console.log('onPress');
    console.log(this.props);
  },
  nextPage: function() {
    this.props.toRoute({
      name: "A new screen",
      component: RouterSample,
      headerStyle: {
        backgroundColor: 'red',
      }
    });
  },
  backPage: function() {
    this.props.toBack();
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
        <Text onPress={this.onPress}>
          onPress
        </Text>
        <Text onPress={this.nextPage}>
          Next
        </Text>
        <Text onPress={this.backPage}>
          Back
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'blue',
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

var Main = React.createClass({
  render() {
    return (
      <Router firstRoute={{
          name: 'Welcome!',
          component: RouterSample,
        }}
        headerStyle={{
        }} />
    );
  }
});
AppRegistry.registerComponent('RouterSample', () => Main);
