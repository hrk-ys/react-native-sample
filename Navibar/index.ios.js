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
  ScrollView,
} = React;

var NavigationBar = require('react-native-navbar');

var ExampleProject = React.createClass({

  renderScene: function(route, navigator) {
    var Component = route.component;
    var navBar = route.navigationBar;

    if (navBar) {
      navBar = React.addons.cloneWithProps(navBar, {
        navigator: navigator,
        route: route
      });
    }

    return (
      <View style={styles.navigator}>
        <Component navigator={navigator} route={route} />
        {navBar}
      </View>
    );
  },

  render: function() {
    return (
      <Navigator
        style={styles.navigator}
        renderScene={this.renderScene}
        initialRoute={{
          component: InitialView,
          navigationBar: <NavigationBar title={'Home'} style={{
            backgroundColor: 'rgba(200,100,50,0.5)',
            position: 'absolute',
            top: 0, left: 0, width: 375, height: 64,
            borderBottomWidth: 0,
          }}/>
        }}
      />
    );
  }
});

var InitialView = React.createClass({
  render() {
    return (
      <ScrollView style={{flex: 1, paddingTop: 64, }}>
        <Text onPress={() => {
          this.props.navigator.push({
            component: InitialView,
            navigationBar: <NavigationBar title={'Next'} style={{
                backgroundColor: 'rgba(0,0,100,0)',
                position: 'absolute',
                top: 0, left: 0, width: 375, height: 64,
                borderBottomWidth: 0,
            }}/>
          });
        }}>hoge</Text>
      </ScrollView>);
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    backgroundColor: 'white',
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

AppRegistry.registerComponent('Navibar', () => ExampleProject);
