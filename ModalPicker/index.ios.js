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
  PickerIOS,
} = React;

var PickerItemIOS = PickerIOS.Item;

var Modal = require('react-native-modal');


var ModalPicker = React.createClass({
  getInitialState() {
    return {
      isModalOpen: false,
      label: 'foo',
      labels: ['bar', 'foo', 'hoge'],
    };
  },
  openModal() {
    this.setState({isModalOpen: true});
  },
  closeModal() {
    this.setState({isModalOpen: false});
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
        <Text onPress={this.openModal}>
          Modal
        </Text>

        <Modal isVisible={this.state.isModalOpen} onPressBackdrop={this.closeModal} onClose={() => this.closeModal()}>
          <Text>Hello world!</Text>
            <View style={{width: 200}}>

            <PickerIOS
              style={{width: 200}}
              selectedValue={this.state.label}
              onValueChange={(label) => this.setState({label: label})}>
              {this.state.labels.map(
                (label) => (
                  <PickerItemIOS
                    style={{width: 100}}
                    value={label}
                    label={label}
                  />
                ))
              }
            </PickerIOS>
            </View>

        </Modal>
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

AppRegistry.registerComponent('ModalPicker', () => ModalPicker);
