'use strict';

var React = require('react-native');
var Modal = require('react-native-modal');
var { AppRegistry, StyleSheet, View, Text } = React;

var App = React.createClass({
  mixins: [Modal.Mixin],

  render() {
    return (
      <View style={styles.page}>
        <Text onPress={() => this.openModal()}>
          Open Modal.
        </Text>
        <Modal
          isVisible={this.state.isModalOpen}
          onClose={() => this.closeModal()}
          onPressBackdrop={() => this.closeModal()}
        >
          <View>
            <Text >Hello world!</Text>
          </View>
        </Modal>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('Modal', () => App);
