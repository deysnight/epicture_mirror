import styles from '../styles/styles';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import {
  createStackNavigator,
  DrawerNavigator,
} from 'react-navigation';

class UploadScreen extends React.Component {   
	
   render() {
    return (
      <View style={styles.container}>
		<View style={[{flex: 1, backgroundColor: 'powderblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='TEST' />
		</View>
        <View style={[{flex: 2, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='TEST' />
			<Greeting style={[styles.bigblue, styles.red]} name='TEST' />
		</View>        
      </View>
    );
  }
}

export default UploadScreen;