/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

var React = require('react-native');
var {
  Navigator,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
} = React;
var BreadcrumbNavSample = require('./BreadcrumbNavSample');
var NavigationBarSample = require('./NavigationBarSample');
var JumpingNavSample = require('./JumpingNavSample');

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

class NavMenu extends React.Component {
  render() {
    return (
      <ScrollView style={styles.scene} automaticallyAdjustContentInsets={false}>
        <Text style={styles.messageText}>{this.props.message}</Text>
        <NavButton
          onPress={() => {
            this.props.navigator.push({
              message: 'Swipe right to dismiss',
              sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            });
          }}
          text="Float in from right"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({
              message: 'Swipe down to dismiss',
              sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            });
          }}
          text="Float in from bottom"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.pop();
          }}
          text="Pop"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.popToTop();
          }}
          text="Pop to top"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'navbar' });
          }}
          text="Navbar Example"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'jumping' });
          }}
          text="Jumping Example"
        />
        <NavButton
          onPress={() => {
            this.props.navigator.push({ id: 'breadcrumbs' });
          }}
          text="Breadcrumbs Example"
        />
        <NavButton
          onPress={() => {
            this.props.onExampleExit();
          }}
          text="Exit <Navigator> Example"
        />
      </ScrollView>
    );
  }
}

var TabBarExample = React.createClass({

  statics: {
    title: '<Navigator>',
    description: 'JS-implemented navigation',
  },

  renderScene: function(route, nav) {
    switch (route.id) {
      case 'navbar':
        return <NavigationBarSample navigator={nav} />;
      case 'breadcrumbs':
        return <BreadcrumbNavSample navigator={nav} />;
      case 'jumping':
        return <JumpingNavSample navigator={nav} />;
      default:
        return (
          <NavMenu
            message={route.message}
            navigator={nav}
            onExampleExit={this.props.onExampleExit}
          />
        );
    }
  },

  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ message: "First Scene", }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
      />
    );
  },

});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  }
});

module.exports = TabBarExample;
