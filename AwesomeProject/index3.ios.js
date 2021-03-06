'use strict';

var React = require('react-native');
var {
  Text,
  View,
  TouchableHighlight,
  DeviceEventEmitter,
  requireNativeComponent,
} = React;

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
});

var CustomView = require('./CustomView');

var subscription;
var SimpleApp = React.createClass({
  getInitialState: function() {
    return {name: 'foo'};
  },

  callFromNative: function(params) {
    console.log(params);
    this.setState({ name: params.name });
  },

  componentDidMount: function() {
    subscription = DeviceEventEmitter.addListener('callFuncName', this.callFromNative);
  },
  componentWillUnmount: function() {
    subscription.remove();
  },

  callFunc: function() {
    var SampleManager = require('NativeModules').SampleManager;

    console.log("callFunc()");
    SampleManager.callFunc(
      'action',
      'string_param1',
      { foo: 'bar'},
      (error, ret) => {
        if (error) {
          console.error(error);
        } else {
          console.log(ret);
          this.setState({ name: ret.name });
        }
      }
    );
  },
  render: function() {
    return (
        <View style={styles.container}>
          <Text>This is a simple application.</Text>

          <TouchableHighlight
            onPress={this.callFunc}
            underlayColor="transparent"
            activeOpacity={0.5}>
            <Text style={styles.button}>
              Call Func1
            </Text>
          </TouchableHighlight>
          <Text style={styles.button}>name={this.state.name}</Text>
          <CustomView />

        </View>
    );
  },
});

React.AppRegistry.registerComponent('AwesomeProject', () => SimpleApp);

module.exports = SimpleApp;
