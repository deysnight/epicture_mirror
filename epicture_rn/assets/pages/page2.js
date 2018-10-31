import styles from '../styles/styles';
import Blink from '../utils/Blink';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

class SecondScreen extends React.Component {   
	
   render() {
    return (
      <View style={styles.container}>
		<View style={[{flex: 1, backgroundColor: 'powderblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='Rexxar' />
		</View>
        <View style={[{flex: 2, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='Rexxar' />
			<Greeting style={[styles.bigblue, styles.red]} name='Jaina' />
		</View>        
      </View>
    );
  }
}

export default SecondScreen;