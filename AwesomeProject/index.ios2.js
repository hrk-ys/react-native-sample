'use strict';

var React = require('react-native');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var SearchScreen = require('./SearchScreen');

var MoviesApp = React.createClass({
  render: function() {
    return (
        <NavigatorIOS
          style={styles.container}
          barTintColor="red"
          titleTextColor="red"
          initialRoute={{
            title: 'Movies',
            component: SearchScreen,
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
  itemWrapper: {
    backgroundColor: 'yellow',
  },
});
AppRegistry.registerComponent('AwesomeProject', () => MoviesApp);

module.exports = MoviesApp;
