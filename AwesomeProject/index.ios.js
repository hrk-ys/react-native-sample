'use strict';

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var ComponentList = require('./ReactComponent/ComponentList');

var ReactComponent = React.createClass({
  getInitialState: function() {
    return {
      openExternalExample: (null: ?React.Component),
    };
  },

  render: function() {
    console.log( this.state.openExternalExample );
    if (this.state.openExternalExample) {
      var Example = this.state.openExternalExample;
      return (
        <Example
          onExampleExit={() => {
            this.setState({ openExternalExample: null, });
          }}
        />
      );
    }

    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Component',
            component: ComponentList,
            passProps: {
              onExternalExampleRequested: (example) => {
                this.setState({ openExternalExample: example, });
              },
            },
          }}
        />
        );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
AppRegistry.registerComponent('AwesomeProject', () => ReactComponent);

module.exports = ReactComponent;
