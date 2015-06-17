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
  LayoutAnimation,
} = React;

var Sample = React.createClass({
  getInitialState() {
    return {
      isVisible: false,
    };
  },

  toggleView(animation) {
    if (animation) {
      LayoutAnimation.configureNext({
        duration: 1000,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.scaleXY,
          // property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          // type: LayoutAnimation.Types.easeInEaseOut,
        },
      });
    }
    this.setState({ isVisible: !this.state.isVisible });
  },
  animationFinish() {
    console.log("finish!!");
  },

  render: function() {
    // var visibleView = this.state.isVisible ? (
    //   <View>
    //     <Text>VisibleView</Text>
    //   </View>
    //
    // ) : <View />;

    var visibleView =  this.state.isVisible ?
    (
      <View style={{
          // position: 'absolute',
          // top: 0,
          // left: 0,
          width: 320,
          // height: 750,
          // backgroundColor: 'red',
        }}>
        <Text>Modal</Text>
        <Text onPress={() => this.toggleView(true)}>
          Toggle View
        </Text>
      </View>
    ) :
    (
      <View style={{
          // position: 'absolute',
          // top: 750,
          // left: 0,
          width: 320,
          // backgroundColor: 'red',
          }}>
      </View>
    );

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
        <Text onPress={() => this.toggleView(true)}>
          Toggle View
        </Text>
        <Text onPress={() => this.toggleView(false)}>
          Toggle No Animation View
        </Text>
        { visibleView }
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

var animations = {
  layout: {
    easeInEaseOut: {
    },
  },
};


AppRegistry.registerComponent('LayoutAnimation', () => Sample);
