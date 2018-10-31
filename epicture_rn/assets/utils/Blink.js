import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';

class Blinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isShowingText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState(previousState => {
        return { isShowingText: !previousState.isShowingText };
      });
    }, 1000);
  }
  render() {
    let display = this.state.isShowingText ? this.props.text : ' ';
    return (
      <Text style={this.props.style}>{display}</Text>
    );
  }
}

export default Blinks;