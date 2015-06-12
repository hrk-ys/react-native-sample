'use strict'

var React = require('react-native');
var { requireNativeComponent } = React;

class TextView extends React.Component {
  render() {
    return <NTTextView {...this.props} />;
  }
}

TextView.propTypes = {
  /**
   * When this property is set to `true` and a valid camera is associated
   * with the map, the camera’s pitch angle is used to tilt the plane
   * of the map. When this property is set to `false`, the camera’s pitch
   * angle is ignored and the map is always displayed as if the user
   * is looking straight down onto it.
   */
  text: React.PropTypes.string,
};

var NTTextView = requireNativeComponent('TextView', TextView);

module.exports = TextView;
