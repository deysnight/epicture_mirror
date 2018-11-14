import styles from '../styles/styles';
import Blink from '../utils/Blink';
import Greeting from '../utils/Greeting';
import PopulairePic from './populaire_pic';
import React from 'react';
import {Alert, StyleSheet, Text, View, Button } from 'react-native';
import SyncStorage from 'sync-storage';


class HomeScreen extends React.Component {
   render() {		
		return (
			<View style={styles.container}>        
        <PopulairePic img_mode={this.props.img_mode} navigation={this.props.navigation}/>
      </View>
		)
  }
}

export default HomeScreen;