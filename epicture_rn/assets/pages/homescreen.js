import styles from '../styles/styles';
import Blink from '../utils/Blink';
import Greeting from '../utils/Greeting';
import PopulairePic from './populaire_pic';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import SyncStorage from 'sync-storage';


class HomeScreen extends React.Component {
   render() {
    /*return (
      <View style={styles.container}>
		<View style={[{flex: 1, backgroundColor: 'powderblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name='Rexxar' />
		</View>
        <View style={[{flex: 2, backgroundColor: 'skyblue'}, styles.view]}>
			<Greeting style={[styles.red, styles.bigblue]} name={ "lol" } /> 
			<Greeting style={[styles.bigblue, styles.red]} name={ "lol" } />
		</View>
        <View style={[{flex: 3, backgroundColor: 'steelblue'}, styles.view]}>
			<Greeting name={ SyncStorage.get('account_username') } />
			<Blink style={styles.red} text={ SyncStorage.get('access_token') } />
			<View style={styles.buttonContainer}>
				<Button
				onPress={() => this.props.navigation.navigate('Profil')}
				title="Press Me"
				color="#841584"/>
			</View>
		</View>
		
        
        
      </View>
		);*/
		
		return (
			<View style={styles.container}>        
        <PopulairePic navigation={this.props.navigation}/>
      </View>
		)
  }
}

export default HomeScreen;