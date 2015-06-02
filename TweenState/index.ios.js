/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var tweenState = require('react-tween-state');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

var TweenState = React.createClass({
  mixins: [tweenState.Mixin],

  getInitialState: function() {
    return {left: 0};
  },

  handleClick: function() {
    this.tweenState('left', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 500,
      endValue: this.state.left === 0 ? 300 : 0
    });
  },

  render: function() {
    var style = {
      position: 'absolute',
      width:    50,
      height:   50,
      backgroundColor: 'lightblue',
      left: this.getTweeningValue('left')
    };

    return (
      <View style={styles.container}>
        <View style={style} />
        <Text style={styles.button} onPress={this.handleClick}>Click</Text>
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
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('TweenState', () => TweenState);
