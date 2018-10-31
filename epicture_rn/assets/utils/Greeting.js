import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';

class Greeting extends React.Component {
  render() {
    return (
		<Text style={this.props.style}>Hello {this.props.name}!</Text>
    );
  }
}

export default Greeting;