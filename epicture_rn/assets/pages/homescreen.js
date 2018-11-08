import styles from '../styles/styles';
import Blink from '../utils/Blink';
import Greeting from '../utils/Greeting';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import SyncStorage from 'sync-storage';
import API from './api';


class HomeScreen extends React.Component {
	navigationOptions: {
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    };

   render() {
    return (
      <View style={styles.container}>
		<View style={[{flex: 1, backgroundColor: 'powderblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='Rexxar' />
		</View>
        <View style={[{flex: 2, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name={ API.functionTwo("https://api.imgur.com/3/account/me/") } /> 
			<Greeting style={[styles.bigblue, styles.red]} name={ "lol" } />
		</View>
        <View style={[{flex: 3, backgroundColor: 'steelblue'}, styles.view]}>
			<Greeting name={ SyncStorage.get('account_username') } />
			<Blink style={styles.red} text={ SyncStorage.get('access_token') } />
			<View style={styles.buttonContainer}>
				<Button
				onPress={() => this.props.navigation.navigate('SecondScreen')}
				title="Press Me"
				color="#841584"/>
			</View>
		</View>
		
        
        
      </View>
    );
  }
}

export default HomeScreen;