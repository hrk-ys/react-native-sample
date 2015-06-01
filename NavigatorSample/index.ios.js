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
  Navigator,
} = React;

var Content = React.createClass({
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
        <Text onPress={() => {
          this.props.onForward();
        }}>Push</Text>
        <Text onPress={() => {
          this.props.onBack();
        }}>Back</Text>
      </View>
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

var NavigatorSample = React.createClass({
  getInitialState() {
    return {
      headerColor: 'red',
    };
  },

  render() {
    var naviStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 20,
      height:64,
      backgroundColor: this.state.headerColor,
      flex: 1,
    };

    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={(route, navigator) =>
          <Content
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              this.setState({
                headerColor: 'green',
              });
              navigator.push({
                name: 'Scene ' + nextIndex,
                index: nextIndex,
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                this.setState({
                  headerColor: 'red',
                });
                navigator.pop();
              }
            }}
          />
        }
        navigationBar={
          <View style={naviStyle}>
            <Text style={{

            }}>Header</Text>
          </View>
        }
      />
    );
  },
});

AppRegistry.registerComponent('NavigatorSample', () => NavigatorSample);
